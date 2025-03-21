# Web3 Hosting

Aleph Cloud provides a decentralized hosting solution for web applications, enabling truly censorship-resistant and permanent web3 experiences. This guide explains how to use Aleph Cloud's Web3 Hosting capabilities.

## Overview

Traditional web hosting relies on centralized servers that can be taken down, censored, or experience downtime. Aleph Cloud's Web3 Hosting offers:

- **Decentralized Infrastructure**: Content is distributed across multiple nodes
- **Censorship Resistance**: No single point of failure or control
- **Permanent Storage**: Content remains accessible as long as the network exists
- **IPFS Integration**: Content is accessible via IPFS as well as HTTP
- **Custom Domains**: Support for custom domain names with SSL
- **CI/CD Integration**: Automated deployment workflows

## Getting Started

### Deploying a Static Website

#### Using the Aleph Cloud Client

```bash
# Install the client if you haven't already
pip install aleph-client

# Deploy a website from a directory
aleph website deploy ./my-website-folder --name "My Website"

# Deploy a single-page application (SPA)
aleph website deploy ./my-spa --name "My SPA" --spa
```

#### Using the Web Console

1. Log in to the [Aleph Cloud Web Console](https://console.aleph.im)
2. Navigate to the "Web3 Hosting" section
3. Click "Create Website"
4. Upload your website files or provide a Git repository URL
5. Configure your website settings (name, domain, etc.)
6. Click "Deploy"

### Accessing Your Website

Once deployed, your website will be available at:

- **Aleph Cloud Domain**: `https://<website-hash>.aleph.sh`
- **IPFS Gateway**: `https://ipfs.aleph.im/ipfs/<ipfs-hash>`
- **Custom Domain**: If configured, your website will also be available at your custom domain

## Features

### Single-Page Applications (SPAs)

Aleph Cloud Web3 Hosting supports single-page applications built with frameworks like React, Vue, Angular, etc. When deploying an SPA, use the `--spa` flag to ensure proper routing:

```bash
aleph website deploy ./my-react-app --name "My React App" --spa
```

This configuration ensures that all routes are directed to the `index.html` file, allowing client-side routing to work correctly.

### Custom Domains

You can use your own domain name with your Aleph Cloud-hosted website:

1. Deploy your website to Aleph Cloud
2. Add a CNAME record in your domain's DNS settings pointing to `<website-hash>.aleph.sh`
3. Configure the custom domain in the Aleph Cloud Web Console or CLI:

```bash
aleph website set-domain <website-hash> mydomain.com
```

### SSL Certificates

Aleph.im automatically provisions and renews SSL certificates for custom domains, ensuring secure HTTPS connections for your visitors.

### Continuous Deployment

You can set up continuous deployment from Git repositories:

```bash
aleph website deploy-git https://github.com/username/repo.git \
  --name "My Website" \
  --branch main \
  --build-command "npm run build" \
  --output-dir "dist"
```

This will:
1. Clone the repository
2. Check out the specified branch
3. Run the build command
4. Deploy the contents of the output directory

### Content Updates

You can update your website content at any time:

```bash
aleph website update <website-hash> ./updated-content
```

Each update creates a new version while maintaining the same website hash, allowing for easy rollbacks if needed.

## Advanced Usage

### Configuration File

You can use a configuration file (`aleph.json`) in your website directory to specify deployment options:

```json
{
  "name": "My Website",
  "description": "My awesome decentralized website",
  "spa": true,
  "buildCommand": "npm run build",
  "outputDir": "dist",
  "domain": "mydomain.com",
  "ipns": true,
  "pinToIPFS": true
}
```

Then deploy using:

```bash
aleph website deploy ./my-website --config
```

### IPNS Publishing

You can publish your website to IPNS (InterPlanetary Name System) for a consistent address that updates when your content changes:

```bash
aleph website deploy ./my-website --ipns
```

This will create an IPNS name that always points to the latest version of your website.

### Custom 404 Pages

Create a `404.html` file in your website directory to provide a custom error page for missing content.

### Environment Variables

You can specify environment variables for build-time configuration:

```bash
aleph website deploy-git https://github.com/username/repo.git \
  --env "API_URL=https://api.example.com" \
  --env "FEATURE_FLAG=true"
```

### Pinning to Multiple IPFS Gateways

For increased availability, you can pin your content to additional IPFS gateways:

```bash
aleph website deploy ./my-website --pin-to "pinata,infura,web3.storage"
```

## Integration with Other Aleph.im Services

### Dynamic Content with Programs

You can create dynamic websites by combining static hosting with Aleph.im Programs (serverless functions):

1. Deploy your static frontend to Web3 Hosting
2. Deploy backend functions as Aleph.im Programs
3. Configure your frontend to call these functions via API

Example frontend code:

```javascript
// Call an Aleph.im Program from your web application
async function fetchData() {
  const response = await fetch('https://api2.aleph.im/api/v0/run/<program-hash>', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: 'example' })
  });
  
  const data = await response.json();
  return data;
}
```

### Authentication with Aleph.im

You can integrate Aleph.im authentication into your web application:

```typescript
import { AlephHttpClient } from '@aleph-sdk/client';
import { ETHAccount } from '@aleph-sdk/core';

const aleph = new AlephHttpClient();

async function authenticateUser() {
  // Connect with Ethereum wallet (e.g., MetaMask)
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  const address = accounts[0];
  
  // Get authentication message
  const message = await aleph.auth.getMessageToSign(address);
  
  // Sign the message
  const signature = await window.ethereum.request({
    method: 'personal_sign',
    params: [message, address]
  });
  
  // Authenticate with Aleph.im
  const authResult = await aleph.auth.authenticate(address, signature);
  
  return authResult.token;
}
```

## Best Practices

1. **Optimize Assets**: Compress images and minimize JavaScript/CSS for faster loading
2. **Use a Build Process**: Build static assets for production to optimize performance
3. **Implement Caching**: Set appropriate cache headers for static assets
4. **Test Thoroughly**: Test your website on multiple devices and browsers before deployment
5. **Use Relative Paths**: Use relative paths for assets to ensure compatibility with different domains
6. **Consider SEO**: Implement proper meta tags and ensure search engine compatibility

## Troubleshooting

### Common Issues

- **Deployment Fails**: Check build commands and ensure all dependencies are correctly specified
- **SPA Routing Issues**: Ensure you've enabled the SPA option for single-page applications
- **Custom Domain Not Working**: Verify DNS configuration and allow time for DNS propagation
- **Content Not Updating**: Clear your browser cache or use incognito mode to see the latest version

### Getting Help

If you encounter issues with Web3 Hosting:

1. Check the [Aleph.im documentation](/devhub/)
2. Join the [Aleph.im Discord](https://discord.gg/alephim) for community support
3. Contact support through the [Aleph.im website](https://aleph.im/contact)

## Examples

### Static Website

```bash
# Create a simple website
mkdir my-website
echo "<html><body><h1>Hello, Decentralized World!</h1></body></html>" > my-website/index.html

# Deploy to Aleph.im
aleph website deploy ./my-website --name "Hello World"
```

### React Application

```bash
# Create a new React app
npx create-react-app my-react-app
cd my-react-app

# Build the app
npm run build

# Deploy to Aleph.im
aleph website deploy ./build --name "My React App" --spa
```

### Next.js Static Export

```bash
# For Next.js projects, add export to build script in package.json:
# "build": "next build && next export"

# Build the app
npm run build

# Deploy to Aleph.im
aleph website deploy ./out --name "My Next.js Site"
```

## Next Steps

- [IPFS Pinning](/tools/ipfs-pinning/) - Learn more about IPFS pinning on Aleph.im
- [Computing](/devhub/computing/) - Explore Aleph.im's computing capabilities for dynamic backends
- [Storage Guide](/devhub/guides/storage/) - Learn about Aleph.im's storage capabilities
