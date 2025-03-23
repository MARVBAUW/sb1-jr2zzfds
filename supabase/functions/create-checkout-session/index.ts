import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { stripe } from '../_shared/stripe.ts';
import { corsHeaders } from '../_shared/cors.ts';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { userId, email, tier } = await req.json();

    // Get tier price from database
    const { data: tierData } = await supabaseAdmin
      .from('subscription_tiers')
      .select('price')
      .eq('id', tier)
      .single();

    if (!tierData) {
      throw new Error('Invalid subscription tier');
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer_email: email,
      client_reference_id: userId,
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `Novaesta ${tier.charAt(0).toUpperCase() + tier.slice(1)}`,
            },
            unit_amount: Math.round(tierData.price * 100),
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${req.headers.get('origin')}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/pricing`,
      metadata: {
        userId,
        tier,
      },
    });

    return new Response(
      JSON.stringify({ id: session.id }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});