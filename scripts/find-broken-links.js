#!/usr/bin/env node

/**
 * Script to find broken internal links in markdown files
 * This script scans all markdown files in the docs directory,
 * extracts all internal links, verifies if they exist,
 * and creates a report page with all broken links.
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const docsDir = path.resolve(__dirname, '../docs');
const outputFile = path.resolve(docsDir, 'tools/broken-links.md');
const excludeDirs = ['node_modules', '.vitepress/cache', '.vitepress/dist'];

// Parse command line arguments
const args = process.argv.slice(2);
const forceFlag = args.includes('--force');
const promptFlag = args.includes('--prompt');

// Helper function to check if a file exists
function fileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (err) {
    return false;
  }
}

// Helper function to resolve a link to a file path
function resolveLink(link, basePath) {
  // Remove hash fragment
  const linkWithoutHash = link.split('#')[0];
  
  // Handle root-relative links (starting with /)
  if (linkWithoutHash.startsWith('/')) {
    // Remove leading slash and convert to file path
    let resolvedPath = path.join(docsDir, linkWithoutHash.substring(1));
    
    // Check for index.md or direct .md file
    if (!resolvedPath.endsWith('.md') && !resolvedPath.endsWith('.html')) {
      if (fileExists(resolvedPath + '.md')) {
        return resolvedPath + '.md';
      } else if (fileExists(path.join(resolvedPath, 'index.md'))) {
        return path.join(resolvedPath, 'index.md');
      }
      // If neither exists, it's likely a broken link
      return resolvedPath;
    }
    
    return resolvedPath;
  }
  
  // Handle relative links
  const dirName = path.dirname(basePath);
  let resolvedPath = path.resolve(dirName, linkWithoutHash);
  
  // Check for index.md or direct .md file
  if (!resolvedPath.endsWith('.md') && !resolvedPath.endsWith('.html')) {
    if (fileExists(resolvedPath + '.md')) {
      return resolvedPath + '.md';
    } else if (fileExists(path.join(resolvedPath, 'index.md'))) {
      return path.join(resolvedPath, 'index.md');
    }
    // If neither exists, it's likely a broken link
    return resolvedPath;
  }
  
  return resolvedPath;
}

// Extract markdown links from content
function extractLinks(content) {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const links = [];
  let match;
  
  while ((match = linkRegex.exec(content)) !== null) {
    const linkText = match[1];
    const linkUrl = match[2];
    
    // Only process internal links (not external URLs, anchor links, or mailto links)
    if (!linkUrl.startsWith('http') && 
        !linkUrl.startsWith('https') && 
        !linkUrl.startsWith('#') && 
        !linkUrl.startsWith('mailto:')) {
      links.push({
        text: linkText,
        url: linkUrl,
        position: match.index
      });
    }
  }
  
  return links;
}

// Check if a link is broken
function isLinkBroken(link, filePath) {
  // Skip external links
  if (link.startsWith('http') || link.startsWith('https')) {
    return false;
  }
  
  // Skip anchor links
  if (link.startsWith('#')) {
    return false;
  }
  
  // Skip mailto links
  if (link.startsWith('mailto:')) {
    return false;
  }
  
  // Handle special cases
  if (link === '' || link === '/') {
    return false;
  }
  
  // Check for image files in public directory
  if (link.match(/\.(png|jpg|jpeg|gif|svg|webp)$/i)) {
    // If it's a root-relative link starting with /
    if (link.startsWith('/')) {
      const publicPath = path.join(docsDir, 'public', link.substring(1));
      return !fileExists(publicPath);
    }
  }
  
  const resolvedPath = resolveLink(link, filePath);
  
  // Check if file exists
  return !fileExists(resolvedPath);
}

// Main function to find broken links
async function findBrokenLinks() {
  console.log('Scanning for broken links...');
  
  const brokenLinks = [];
  
  // Get all markdown files
  const files = glob.sync('**/*.md', {
    cwd: docsDir,
    ignore: excludeDirs.map(dir => `**/${dir}/**`)
  });
  
  // Process each file
  for (const file of files) {
    const filePath = path.join(docsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract links from the file
    const links = extractLinks(content);
    
    // Check each link
    for (const link of links) {
      if (isLinkBroken(link.url, filePath)) {
        brokenLinks.push({
          file: file,
          link: link.url,
          text: link.text,
          position: link.position
        });
        
        console.log(`\x1b[33m⚠️  Broken link:\x1b[0m "\x1b[1m${link.text}\x1b[0m" (\x1b[31m${link.url}\x1b[0m) in \x1b[36m${file}\x1b[0m`);
      }
    }
  }
  
  return brokenLinks;
}

// Generate markdown report
function generateReport(brokenLinks) {
  const reportContent = `---
title: Broken Links Report
description: A list of broken links found in the documentation
---

# Broken Links Report

This page lists all broken internal links found in the documentation. Please update these links to point to valid pages.

${brokenLinks.length === 0 ? 
  '**No broken links found! 🎉**' : 
  `## Found ${brokenLinks.length} broken links

| File | Link Text | Broken URL |
|------|-----------|------------|
${brokenLinks.map(item => `| [${item.file}](/${item.file.replace(/\.md$/, '')}) | ${item.text} | \`${item.link}\` |`).join('\n')}

## How to fix broken links

1. Open the file containing the broken link
2. Find the link text and update the URL to point to a valid page
3. Save the file and run the build again to verify the link is fixed
`}

Last updated: ${new Date().toISOString().split('T')[0]}
`;

  // Create tools directory if it doesn't exist
  const toolsDir = path.join(docsDir, 'tools');
  if (!fs.existsSync(toolsDir)) {
    fs.mkdirSync(toolsDir, { recursive: true });
  }
  
  // Write the report
  fs.writeFileSync(outputFile, reportContent);
  
  console.log(`Report generated at: ${outputFile}`);
  return brokenLinks.length;
}

// Helper function for styled console output
function styledConsole(message, type = 'info') {
  const reset = '\x1b[0m';
  const styles = {
    info: '\x1b[36m', // Cyan
    success: '\x1b[32m', // Green
    warning: '\x1b[33m', // Yellow
    error: '\x1b[31m', // Red
    header: '\x1b[1;35m', // Bold Purple
    subheader: '\x1b[1;36m', // Bold Cyan
    link: '\x1b[34m', // Blue
  };
  
  console.log(`${styles[type]}${message}${reset}`);
}

// Helper function to print a divider line
function printDivider() {
  styledConsole('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'info');
}

// Prompt the user to continue despite broken links
async function promptToContinue() {
  return new Promise((resolve) => {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    readline.question('Do you want to proceed with the build? (Y/n) ', (answer) => {
      readline.close();
      // Default to yes if empty or Y/y
      resolve(answer === '' || answer.toLowerCase() === 'y');
    });
  });
}

// Main execution
async function main() {
  try {
    printDivider();
    styledConsole('🔍 BROKEN LINKS CHECKER', 'header');
    printDivider();
    styledConsole('Scanning documentation for broken internal links...', 'info');
    console.log();
    
    const brokenLinks = await findBrokenLinks();
    const brokenCount = generateReport(brokenLinks);
    
    console.log();
    printDivider();
    
    if (brokenCount > 0) {
      styledConsole(`❌ FOUND ${brokenCount} BROKEN LINKS`, 'error');
      styledConsole(`Report generated at: ${outputFile}`, 'link');
      console.log();
      
      // Check if --force flag is used
      if (forceFlag) {
        styledConsole('⚠️  PROCEEDING WITH BUILD DESPITE BROKEN LINKS (--force flag used)', 'warning');
        printDivider();
        process.exit(0); // Exit with success code to allow build to continue
      }
      
      // Check if --prompt flag is used
      if (promptFlag) {
        const shouldContinue = await promptToContinue();
        if (shouldContinue) {
          styledConsole('⚠️  PROCEEDING WITH BUILD DESPITE BROKEN LINKS (user confirmed)', 'warning');
          printDivider();
          process.exit(0); // Exit with success code to allow build to continue
        } else {
          styledConsole('⚠️  BUILD PROCESS HALTED BY USER', 'warning');
          printDivider();
          process.exit(1); // Exit with error code to stop the build
        }
      }
      
      // Default behavior - halt the build
      styledConsole('⚠️  BUILD PROCESS HALTED', 'warning');
      styledConsole('Please fix the broken links before continuing.', 'warning');
      styledConsole('Run the following command to see the broken links report:', 'info');
      styledConsole('  npm run find-broken-links', 'subheader');
      styledConsole('To proceed despite broken links, use one of these commands:', 'info');
      styledConsole('  npm run find-broken-links -- --force', 'subheader');
      styledConsole('  npm run find-broken-links -- --prompt', 'subheader');
      printDivider();
      // Exit with error code if broken links found
      process.exit(1);
    } else {
      styledConsole('✅ NO BROKEN LINKS FOUND', 'success');
      styledConsole('Documentation links are all valid!', 'success');
      console.log();
      styledConsole('▶️  BUILD PROCESS CONTINUING', 'info');
      printDivider();
      process.exit(0);
    }
  } catch (error) {
    console.log();
    printDivider();
    styledConsole('❌ ERROR CHECKING LINKS', 'error');
    console.error(error);
    styledConsole('⚠️  BUILD PROCESS HALTED DUE TO ERROR', 'warning');
    printDivider();
    process.exit(1);
  }
}

// Run the script
main();
