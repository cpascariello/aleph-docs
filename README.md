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

> **Note:** The build process includes a broken links checker that will prompt you to continue or halt the build if any broken internal links are found. A report will be generated at `/docs/tools/broken-links.md` with details about the broken links.

### Preview Production Build

To preview the production build locally:

```bash
npm run docs:preview
```

> **Note:** Like the build process, the preview command also runs the broken links checker with a prompt before starting the preview server.

### Finding Broken Links

You can run the broken links checker separately with:

```bash
npm run find-broken-links
```

This will scan all markdown files for broken internal links and generate a report at `/docs/tools/broken-links.md`. The report includes:

- A table of all broken links with their locations and URLs
- Links to the files containing broken links
- Instructions for fixing the broken links

#### Options for Handling Broken Links

You can pass additional flags to control how broken links are handled:

```bash
# Prompt to continue or halt if broken links are found (default in build/preview)
npm run find-broken-links -- --prompt

# Always continue despite broken links
npm run find-broken-links -- --force
```

The `--prompt` flag is already included in the build and preview commands, allowing you to decide whether to proceed with broken links on a case-by-case basis.

#### Broken Links Options

The broken links checker offers different modes to accommodate your workflow:

| Command | Description |
|---------|-------------|
| `npm run find-broken-links` | Default mode - exits with error if broken links are found |
| `npm run find-broken-links:continue` | Reports broken links but continues regardless |
| `npm run find-broken-links:interactive` | Asks whether to continue when broken links are found |

These options are also available for the build and preview commands:

```bash
# Build with different broken links modes
npm run docs:build               # Strict mode (default)
npm run docs:build:continue      # Always continue despite broken links
npm run docs:build:interactive   # Ask whether to continue

# Preview with different broken links modes
npm run docs:preview             # Strict mode (default)
npm run docs:preview:continue    # Always continue despite broken links
npm run docs:preview:interactive # Ask whether to continue
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
    - `/docs/tools/broken-links.md` - Report of broken internal links
- `/scripts/` - Utility scripts
  - `/scripts/find-broken-links.js` - Script to find broken internal links

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