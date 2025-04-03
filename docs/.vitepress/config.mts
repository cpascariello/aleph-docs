import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Aleph Cloud",
  description: "Aleph Cloud Main Documentation",
  ignoreDeadLinks: true,
  markdown: {
    math: true
  },
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
          items: [
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
          text: 'Staking',
          items: [
            { text: 'How-to', link: '/nodes/staking/' }
          ]
        },
        {
          text: 'Core Channel Nodes',
          items: [
            { text: 'Introduction', link: '/nodes/core/introduction/' },
            { text: 'Installation', link: '/nodes/core/installation/' }
          ]
        },
        {
          text: 'Compute Resource Nodes',
          items: [
            { text: 'Introduction', link: '/nodes/compute/introduction/' },
            { text: 'Installation', 
              collapsed: true,
              items: [
                {text: 'Debian 12', link: '/nodes/compute/installation/debian-12/'},
                {text: 'Ubuntu 22.04', link: '/nodes/compute/installation/ubuntu-24.04/'}
              ]
             },
            { text: 'Advanced Features',
              collapsed: false,
              items: [
                { text: 'Enable Confidential', link: '/nodes/compute/advanced/confidential/' },
                { text: 'Enable GPU', link: '/nodes/compute/advanced/gpu/' },
                { text: 'Enable Pay-as-you-go', link: '/nodes/compute/advanced/pay-as-you-go/' },
                { text: 'Local Testing', link: '/nodes/compute/advanced/local-testing/' }
              ]
            }
          ]
        },
        {
          text: 'Resources',
          items: [
            {
              text: 'Node Management',
              collapsed: true,
              items: [
                { text: 'Backups', link: '/nodes/resources/management/backups/' },
                { text: 'Monitoring', link: '/nodes/resources/management/monitoring/' },
                { text: 'Troubleshooting', link: '/nodes/resources/management/troubleshooting/' }
              ]
            },
            { text: 'Metrics', link: '/nodes/resources/metrics/' },
            { text: 'Scoring', link: '/nodes/resources/scoring/' },
            { text: 'Rewards', link: '/nodes/resources/rewards/' },
            { text: 'Releases', link: '/nodes/resources/releases/' }
          ]
        }
      ],
      

      
      // Tools section sidebar
      '/tools/': [
        {
          text: 'Tools',
          items: [
            { text: 'Aleph Cloud CLI', link: '/tools/aleph-cli/' },
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
            { text: 'TypeScript', link: '/devhub/sdks/typescript/' },
            { text: 'Python', link: '/devhub/sdks/python/' },
            { text: 'Other Languages', link: '/devhub/sdks/other-languages/' }
          ]
        },
        {
          text: 'Computing',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/devhub/computing/' },
            { text: 'Functions (Programs)',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/devhub/computing/functions/' },
                { text: 'Getting Started', link: '/devhub/computing/functions/getting-started' },
                { text: 'Advanced',
                  collapsed: true,
                  items: [
                    { text: 'Test Programs', link: '/devhub/computing/functions/advanced/test-programs' },
                    { text: 'Update Programs', link: '/devhub/computing/functions/advanced/update-programs' },
                    { text: 'Custom Builds', 
                      collapsed: true,
                      items: [
                        { text: 'Python', link: '/devhub/computing/functions/advanced/custom-builds/python' },
                        { text: 'Rust', link: '/devhub/computing/functions/advanced/custom-builds/rust' }
                      ]
                    }
                  ]
                }
              ]
            },
            { text: 'Instances (VMs)',
              collapsed: true,
              items: [
                { text: 'General Instances', link:'/devhub/computing/instances'},
                { text: 'GPU Instances', link:'/devhub/computing/gpu'},
                {
                  text: 'Confidential Instances',
                  collapsed: true,
                  items: [
                    { text: 'Overview', link: '/devhub/computing/confidential/' },
                    { text: 'Requirements', link: '/devhub/computing/confidential/requirements' },
                    { text: 'Encrypted Disk Image', link: '/devhub/computing/confidential/encrypted-disk' },
                    { text: 'Instance Creation', link: '/devhub/computing/confidential/instance' },
                    { text: 'Troubleshooting', link: '/devhub/computing/confidential/troubleshooting' }
                  ]
                },
              ]
            },
            { text: 'Runtimes',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/devhub/guides/runtimes/' },
                { text: 'Custom Runtimes', link: '/devhub/guides/runtimes/custom' },
              ]
            },
            { text: 'On-demand Execution', link: '/devhub/computing/on-demand/' },
            { text: 'Persistent Execution', link: '/devhub/computing/persistent/' },
          ]
        },
        {
          text: 'Guides',
          collapsed: false,
          items: [
            { text: 'Messages', 
              collapsed: false,
              items:[
                { text: 'Overview', link: '/devhub/guides/messages/' },
                { text: 'Aggregates', link: '/devhub/guides/messages/object-types/aggregates/' },
                { text: 'Posts', link: '/devhub/guides/messages/object-types/posts/'},
                {text: 'Store', link: '/devhub/guides/messages/object-types/store/'},
                {text: 'Programs', link: '/devhub/guides/messages/object-types/programs/'}
              ]
            },
            { text: 'Storage', 
              collapsed: false,
              items: [
                { text: 'Overview', link: '/devhub/guides/storage/' },
                { text: 'Immutable Volume', link: '/devhub/guides/storage/immutable-volume' },
                { text: 'Persistent Storage', link: '/devhub/guides/storage/persistent-storage' }
              ]
            },
            { text: 'Custom Domains', link: '/devhub/guides/custom-domains/' },
            { text: 'Indexing', link: '/devhub/guides/indexing/' },
            { text: 'Authentication', link: '/devhub/guides/authentication/' }
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
