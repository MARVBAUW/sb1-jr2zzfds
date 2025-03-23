import cron from 'node-cron';
import Parser from 'rss-parser';
import { OpenAI } from 'openai';
import axios from 'axios';
import * as cheerio from 'cheerio';
import * as dotenv from 'dotenv';
import { supabase } from './supabase.js';
import { OAuth2Client } from 'google-auth-library';

// Load environment variables
dotenv.config();

const parser = new Parser();

// Set up Google OAuth client
const oauth2Client = new OAuth2Client();
oauth2Client.setCredentials({
  access_token: process.env.GOOGLE_ACCESS_TOKEN,
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const sources = {
  construction: [
    'https://www.batiactu.com/rss/actualites.rss',
    'https://www.lemoniteur.fr/rss/actualites',
  ],
  legal: [
    'https://www.legifrance.gouv.fr/rss/feed/codes',
    'https://www.journal-officiel.gouv.fr/rss/feed/construction',
  ],
  environmental: [
    'https://www.ademe.fr/rss/actualites',
    'https://www.ecologie.gouv.fr/rss/feed/construction',
  ],
};

// Retry configuration
const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 1000; // 1 second
const MAX_RETRY_DELAY = 60000; // 1 minute

// Rate limiting configuration
const API_CALLS_PER_MINUTE = 3;
let apiCallsCount = 0;
let lastResetTime = Date.now();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function resetApiCallsCount() {
  const now = Date.now();
  if (now - lastResetTime >= 60000) {
    apiCallsCount = 0;
    lastResetTime = now;
  }
}

async function checkRateLimit() {
  await resetApiCallsCount();
  if (apiCallsCount >= API_CALLS_PER_MINUTE) {
    const waitTime = 60000 - (Date.now() - lastResetTime);
    await sleep(waitTime);
    await resetApiCallsCount();
  }
  apiCallsCount++;
}

async function fetchArticles(url) {
  try {
    const feed = await parser.parseURL(url);
    return feed.items;
  } catch (error) {
    console.error(`Error fetching from ${url}:`, error);
    return [];
  }
}

async function scrapeContent(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    $('script, style, nav, footer, header, aside').remove();
    const content = $('main, article, .content, .article-content').text();
    return content.trim();
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
    return '';
  }
}

async function generateArticle(category, retryCount = 0) {
  try {
    await checkRateLimit();

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an expert AI specialized in the construction industry. Create a new, 
          realistic article about recent or upcoming regulatory changes in the ${category} sector. 
          The article should be relevant to the French construction industry in 2025.`
        },
        {
          role: "user",
          content: "Generate a detailed article with real-world impact and specific details."
        }
      ],
      functions: [
        {
          name: "create_article",
          parameters: {
            type: "object",
            properties: {
              title: {
                type: "string",
                description: "A clear, concise title for the article"
              },
              description: {
                type: "string",
                description: "A detailed summary of the regulatory impact"
              },
              importance: {
                type: "string",
                enum: ["high", "medium", "low"],
                description: "The importance level based on impact"
              },
              category: {
                type: "string",
                enum: ["security", "construction", "standards", "thermal", "environmental", "legal", "technical"],
                description: "The main category this article belongs to"
              }
            },
            required: ["title", "description", "importance", "category"]
          }
        }
      ]
    });

    const result = JSON.parse(response.choices[0].message.function_call.arguments);
    return result;
  } catch (error) {
    if (error.status === 429 && retryCount < MAX_RETRIES) {
      const delay = Math.min(INITIAL_RETRY_DELAY * Math.pow(2, retryCount), MAX_RETRY_DELAY);
      console.log(`Rate limited, retrying in ${delay/1000} seconds...`);
      await sleep(delay);
      return generateArticle(category, retryCount + 1);
    }
    console.error('Error generating article:', error);
    return null;
  }
}

async function saveArticle(article) {
  try {
    const { data, error } = await supabase
      .from('articles')
      .insert([{
        ...article,
        date: new Date().toISOString(),
        icon: article.category
      }]);

    if (error) throw error;
    console.log('Article saved:', article.title);
    return data;
  } catch (error) {
    console.error('Error saving article:', error);
    return null;
  }
}

async function generateDailyArticles() {
  console.log('Starting daily article generation...');
  
  const categories = [
    'security', 'construction', 'standards', 'thermal', 
    'environmental', 'legal', 'technical'
  ];
  
  // Randomly select 2 categories instead of 3 to reduce API calls
  const selectedCategories = categories
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);
  
  for (const category of selectedCategories) {
    const article = await generateArticle(category);
    if (article) {
      await saveArticle(article);
      // Add delay between articles to respect rate limits
      await sleep(20000); // 20 seconds between articles
    }
  }
  
  console.log('Daily article generation completed');
}

// Run once per day at 00:00
cron.schedule('0 0 * * *', generateDailyArticles);

// Process RSS feeds every other day at 06:00
cron.schedule('0 6 */2 * *', async () => {
  console.log('Starting RSS feed processing...');
  
  for (const [category, urls] of Object.entries(sources)) {
    for (const url of urls) {
      const articles = await fetchArticles(url);
      
      for (const article of articles) {
        const { data: existing } = await supabase
          .from('articles')
          .select('id')
          .eq('title', article.title)
          .single();

        if (existing) continue;

        const content = await scrapeContent(article.link);
        if (!content) continue;

        const analysis = await generateArticle(category);
        if (!analysis) continue;

        await saveArticle(analysis);
        // Add delay between articles to respect rate limits
        await sleep(20000); // 20 seconds between articles
      }
    }
  }
  
  console.log('RSS feed processing completed');
});

// Initial run with reduced scope
async function initialRun() {
  const category = 'construction';
  const article = await generateArticle(category);
  if (article) {
    await saveArticle(article);
  }
}

initialRun();