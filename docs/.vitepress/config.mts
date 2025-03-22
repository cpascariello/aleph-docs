import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Aleph Cloud",
  description: "Aleph Cloud Main Documentation",
  ignoreDeadLinks: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: {
      light: '/aleph-cloud-logo-light-bg.svg',
      dark: '/aleph-cloud-logo-dark-bg.svg'
    },
    siteTitle: false,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about' },
      { text: 'Nodes', link: '/nodes' },
      { text: 'DevHub', link: '/devhub' },
      { text: 'Tools', link: '/tools' }
    ],
    
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: 'Search',
                buttonAriaLabel: 'Search documentation'
              },
              modal: {
                noResultsText: 'No results for',
                resetButtonTitle: 'Clear search query',
                footer: {
                  selectText: 'to select',
                  navigateText: 'to navigate',
                  closeText: 'to close'
                }
              }
            }
          }
        },
        detailedView: true
      }
    },

    // Sidebar configuration with path-based keys
    sidebar: {
      // Default sidebar (shown on the homepage and other pages without specific sidebar)
      '/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Overview', link: '/' },
            { text: 'FAQ', link: '/faq' },
            { text: 'Components Demo', link: '/test-components' }
          ]
        }
      ],
      
      // About section sidebar (previous "What is Aleph.im?")
      '/about/': [
        {
          text: 'About Aleph.im',
          items: [
            { text: 'Overview', link: '/about/' },
            { text: 'How it Works', link: '/about/how-it-works/' },
            { text: 'Use Cases', link: '/about/use-cases/' }
          ]
        },
        {
          text: 'Network',
          items: [
            { text: 'Architecture', link: '/about/network/architecture/' },
            { text: 'Message Types', link: '/about/network/message-types/' },
            { text: 'Consensus', link: '/about/network/consensus/' }
          ]
        },
        {
          text: 'Resources',
          collapsed: false,
          items: [
            { text: 'Roadmap', link: '/about/resources/roadmap/' },
            { text: 'Whitepaper', link: '/about/resources/whitepaper/' },
            { text: 'Community', link: '/about/resources/community/' }
          ]
        }
      ],
      
      // Nodes section sidebar with titles, dividers, and non-clickable headers
      '/nodes/': [
        {
          text: 'Nodes',
          items: [
            { text: 'Overview', link: '/nodes/' }
          ]
        },
        {
          text: 'Core Channel Nodes',
          items: [
            { text: 'Introduction', link: '/nodes/core/introduction/' },
            { text: 'Installation', link: '/nodes/core/installation/' },
            { text: 'Configuration', link: '/nodes/core/configuration/' }
          ]
        },
        {
          text: 'Compute Resource Nodes',
          items: [
            { text: 'Introduction', link: '/nodes/compute/introduction/' },
            { text: 'Requirements', link: '/nodes/compute/requirements/' },
            { text: 'Installation', link: '/nodes/compute/installation/' },
          ]
        },
        {
          text: 'Resources',
          collapsed: false,
          items: [
            {
              text: 'Node Management',
              items: [
                { text: 'Monitoring', link: '/nodes/resources/monitoring/' },
                { text: 'Troubleshooting', link: '/nodes/resources/troubleshooting/' }
              ]
            }
          ]
        }
      ],
      

      
      // Tools section sidebar
      '/tools/': [
        {
          text: 'Tools',
          items: [
            { text: 'Aleph.im Client', link: '/tools/aleph-client/' },
            { text: 'Web Console', link: '/tools/webconsole/' },
            { text: 'IPFS Pinning', link: '/tools/ipfs-pinning/' },
            { text: 'VRF', link: '/tools/vrf/' },
            {
              text: 'Indexer',
              collapsed: true,
              items: [
                { text: 'EVM Indexer', link: '/tools/indexer/evm-indexer/' }
              ]
            },
            { text: 'Web3 Hosting', link: '/tools/web3-hosting/' }
          ]
        }
      ],
      
      // DevHub section sidebar (previous "Development Hub")
      '/devhub/': [
        {
          text: 'Developer Hub',
          items: [
            { text: 'Overview', link: '/devhub/' },
            { text: 'Getting Started', link: '/devhub/getting-started/' }
          ]
        },
        {
          text: 'SDKs',
          items: [
            { text: 'JavaScript/TypeScript', link: '/devhub/sdks/typescript/' },
            { text: 'Python', link: '/devhub/sdks/python/' },
            { text: 'Other Languages', link: '/devhub/sdks/other-languages/' }
          ]
        },
        {
          text: 'Guides',
          collapsed: false,
          items: [
            { text: 'Storage', link: '/devhub/guides/storage/' },
            { text: 'Indexing', link: '/devhub/guides/indexing/' },
            { text: 'Authentication', link: '/devhub/guides/authentication/' }
          ]
        },
        {
          text: 'Computing',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/devhub/computing/' },
            { text: 'On-demand Execution', link: '/devhub/computing/on-demand/' },
            { text: 'Persistent Execution', link: '/devhub/computing/persistent/' },
            {
              text: 'Confidential Computing',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/devhub/computing/confidential/' },
                { text: 'Requirements', link: '/devhub/computing/confidential/requirements' },
                { text: 'Encrypted Disk Image', link: '/devhub/computing/confidential/encrypted-disk' },
                { text: 'Instance Creation', link: '/devhub/computing/confidential/instance' },
                { text: 'Troubleshooting', link: '/devhub/computing/confidential/troubleshooting' }
              ]
            }
          ]
        },
        {
          text: 'API Reference',
          collapsed: true,
          items: [
            { text: 'REST API', link: '/devhub/api/rest/' },
            { text: 'GraphQL API', link: '/devhub/api/graphql/' }
          ]
        },
        {
          text: 'Examples',
          collapsed: true,
          items: [
            { text: 'Web3 Applications', link: '/devhub/examples/web3-apps/' },
            { text: 'DeFi Integration', link: '/devhub/examples/defi/' },
            { text: 'NFT Projects', link: '/devhub/examples/nft/' },
            { text: 'Gaming', link: '/devhub/examples/gaming/' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
