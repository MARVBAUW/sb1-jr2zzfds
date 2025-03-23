import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get current timestamp for backup folder name
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const projectRoot = path.join(__dirname, '..');
const backupDir = path.join(projectRoot, 'backups', `backup-${timestamp}`);

// Files and directories to exclude from backup
const excludeList = [
  'node_modules',
  'dist',
  '.git',
  'backups',
  '.DS_Store',
  'Thumbs.db'
];

// Create backup directory
function createBackupDir() {
  if (!fs.existsSync(path.join(projectRoot, 'backups'))) {
    fs.mkdirSync(path.join(projectRoot, 'backups'));
  }
  fs.mkdirSync(backupDir);
}

// Copy file to backup directory maintaining directory structure
function copyFile(source, target) {
  const targetDir = path.dirname(target);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  fs.copyFileSync(source, target);
}

// Recursively copy directory
function copyDirectory(source, target) {
  if (excludeList.includes(path.basename(source))) {
    return;
  }

  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  const files = fs.readdirSync(source);

  files.forEach(file => {
    if (excludeList.includes(file)) {
      return;
    }

    const sourcePath = path.join(source, file);
    const targetPath = path.join(target, file);
    const stats = fs.statSync(sourcePath);

    if (stats.isDirectory()) {
      copyDirectory(sourcePath, targetPath);
    } else {
      copyFile(sourcePath, targetPath);
    }
  });
}

// Create backup info file
function createBackupInfo() {
  const info = {
    timestamp: new Date().toISOString(),
    projectName: 'Novaesta',
    backupVersion: '1.0.0',
    nodeVersion: process.version,
    dependencies: JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'))).dependencies,
    excludedItems: excludeList
  };

  fs.writeFileSync(
    path.join(backupDir, 'backup-info.json'),
    JSON.stringify(info, null, 2)
  );
}

// Main backup function
function backup() {
  console.log('Starting project backup...');
  
  try {
    // Create backup directory
    createBackupDir();
    console.log(`Created backup directory: ${backupDir}`);

    // Copy project files
    copyDirectory(projectRoot, backupDir);
    console.log('Copied project files');

    // Create backup info file
    createBackupInfo();
    console.log('Created backup info file');

    console.log(`Backup completed successfully at: ${backupDir}`);
  } catch (error) {
    console.error('Backup failed:', error);
    process.exit(1);
  }
}

// Run backup
backup();