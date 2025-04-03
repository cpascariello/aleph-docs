# Web Console

The Aleph Cloud Web Console provides a user-friendly graphical interface for managing your Aleph Cloud resources, deploying applications, and monitoring your services. It offers a more accessible alternative to the command-line client for users who prefer a visual approach.

## Accessing the Web Console

The Aleph Cloud Web Console is available at [https://console.aleph.cloud](https://console.aleph.cloud).

## Features

### Dashboard

The dashboard provides an overview of your Aleph Cloud resources, including:

- Active instances (VMs)
- Deployed programs (FaaS)
- Storage usage
- Account balance and resource allocation

### Authentication

The Web Console supports multiple authentication methods:

- Ethereum wallet (MetaMask, WalletConnect)
- Solana wallet (Phantom, Solflare)
- Email and password

### Instance Management

Create and manage virtual machines with an intuitive interface:

- Launch new instances with customizable configurations
- Monitor instance status and performance
- Access instance logs and console
- Configure networking and security settings
- Manage instance lifecycle (start, stop, reboot)

### Program Deployment

Deploy serverless functions with ease:

- Create new programs with a code editor
- Choose from multiple runtime environments
- Test functions directly in the browser
- Monitor execution and performance
- View logs and debug information

### Storage Management

Manage your data on the Aleph Cloud network:

- Upload and organize files
- Create and manage volumes
- Pin IPFS content
- Set access permissions
- Monitor storage usage

### Domain Management

Configure domains for your applications:

- Register custom domains
- Set up DNS records
- Configure SSL certificates
- Map domains to instances or programs

## Getting Started

### Creating an Account

1. Visit [https://console.aleph.im](https://console.aleph.im)
2. Click "Sign Up" or "Connect Wallet"
3. Follow the prompts to create or connect your account
4. Complete your profile information

### Deploying Your First Instance

1. Navigate to the "Instances" section
2. Click "Create Instance"
3. Configure your instance:
   - Name and description
   - CPU, memory, and disk allocation
   - Operating system image
   - SSH key for access
   - Network settings
4. Review and confirm your configuration
5. Wait for the instance to deploy (typically 1-2 minutes)
6. Access your instance via SSH using the provided IP address

### Deploying Your First Program

1. Navigate to the "Programs" section
2. Click "Create Program"
3. Configure your program:
   - Name and description
   - Runtime environment (Node.js, Python, etc.)
   - Function code (write or upload)
   - Memory allocation and timeout settings
4. Test your function using the built-in testing tool
5. Deploy your program
6. Access your function via the provided endpoint URL

## Best Practices

### Resource Management

- Monitor your resource usage to avoid unexpected charges
- Delete unused resources to free up capacity
- Use appropriate instance sizes for your workloads

### Security

- Use strong passwords and enable two-factor authentication
- Regularly rotate SSH keys
- Limit network access to only necessary ports
- Keep your operating systems and applications updated

### Backups

- Regularly back up important data
- Use persistent volumes for critical information
- Test restoration procedures periodically

## Troubleshooting

### Common Issues

- **Instance not accessible**: Check network configuration and security settings
- **Program deployment fails**: Review logs for syntax errors or dependency issues
- **Slow performance**: Consider upgrading resource allocation or optimizing code
- **Authentication problems**: Clear browser cache or try an alternative authentication method

### Getting Help

If you encounter issues with the Web Console:

1. Check the [FAQ section](https://console.aleph.im/faq)
2. Join the [Aleph Cloud Discord](https://discord.gg/alephim) for community support
3. Contact support via the help button in the Web Console
4. Submit a support ticket through the [Aleph Cloud website](https://aleph.im/contact)

## Next Steps

- [Aleph Cloud Client](/tools/aleph-cli/) - Command-line interface for Aleph Cloud
- [API Reference](/devhub/api/rest/) - Documentation for the Aleph Cloud REST API
- [SDK Documentation](/devhub/sdks/typescript/) - Learn how to use the JavaScript/TypeScript SDK
