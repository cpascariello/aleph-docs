# Aleph Cloud Documentation

<p align="center">
  <img src="./docs/public/aleph-cloud-logo-light-bg.svg" alt="Aleph Cloud Logo" width="300">
</p>

## Overview

This repository contains the official documentation for Aleph Cloud, a decentralized cloud platform that provides storage, computing, and indexing services. The documentation is built using [VitePress](https://vitepress.dev/), a modern static site generator powered by Vue.js.

The Aleph Cloud documentation covers:

- Platform overview and architecture
- Node setup and management
- Developer guides and tutorials
- API references and SDKs
- Tools and resources

## Running Locally

### Prerequisites

- [Node.js](https://nodejs.org/) version 18 or higher
- npm, yarn, or pnpm package manager

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/aleph-im/aleph-docs.git
   cd aleph-docs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the local development server:

```bash
npm run docs:dev
```

This will start a local server at http://localhost:5173. The site will automatically reload as you make changes to the content.

### Build

To build the documentation for production:

```bash
npm run docs:build
```

The built files will be in the `docs/.vitepress/dist` directory.

### Preview Production Build

To preview the production build locally:

```bash
npm run docs:preview
```

## Documentation Structure

- `/docs/` - Main documentation content
  - `/docs/.vitepress/` - VitePress configuration
  - `/docs/public/` - Static assets like images and logos
  - `/docs/index.md` - Homepage
  - `/docs/about/` - About Aleph Cloud
  - `/docs/nodes/` - Node documentation
  - `/docs/devhub/` - Developer Hub
  - `/docs/tools/` - Tools and utilities

## Customization

The documentation uses a custom theme with:

- Purple (#7B3FE4) and yellow/lime (#D4FF00) as primary colors
- Organic, artistic backgrounds with blob shapes and animations
- Custom font styling with Rigid Square font for headers
- Light theme with soft purple backgrounds (#f3ebff, #EDE4FB)
- Dark theme with deep blue-black backgrounds (#08080f, #0f0f1c)
- Responsive design for all devices

## Contributing

Contributions to improve the documentation are welcome! Please feel free to submit pull requests or open issues to suggest improvements.

## License

[MIT License](./LICENSE)