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
          text: 'Tooling',
          items: [
            { text: 'Aleph Cloud CLI', link: '/tools/aleph-cli/' },
            { text: 'Web Console', link: '/tools/webconsole/' },
            { text: 'IPFS Pinning', link: '/tools/ipfs-pinning/' },
            { text: 'VRF', link: '/tools/vrf/' },
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
          text: 'Functions & Instances',
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
                    { text: 'Test Functions', link: '/devhub/computing/functions/advanced/test-programs' },
                    { text: 'Update Functions', link: '/devhub/computing/functions/advanced/update-programs' },
                    { text: 'Custom Builds', 
                      collapsed: true,
                      items: [
                        { text: 'Python', 
                          collapsed: true,
                          items: [
                            { text: 'Getting Started', link: '/devhub/computing/functions/advanced/custom-builds/python/getting-started/' },
                            { text: 'Advanced Features', link: '/devhub/computing/functions/advanced/custom-builds/python/advanced/features' },
                            { text: 'Dependency Volumes', link: '/devhub/computing/functions/advanced/custom-builds/python/advanced/dependency-volumes' }
                          ]
                        },
                        { text: 'Rust', link: '/devhub/computing/functions/advanced/custom-builds/rust' }
                      ]
                    }
                  ]
                }
              ]
            },
            { text: 'Instances (VMs)',
              collapsed: false,
              items: [
                { text: 'General Instances', link:'/devhub/computing/instances/general-instances'},
                { text: 'GPU Instances', link:'/devhub/computing/instances/gpu-instances'},
                {
                  text: 'Confidential Instances',
                  collapsed: true,
                  items: [
                    { text: 'Overview', link: '/devhub/computing/instances/confidential/01-confidential-instance-introduction' },
                    { text: 'Requirements', link: '/devhub/computing/instances/confidential/02-confidential-instance-requirements' },
                    { text: 'Encrypted Disk Image', link: '/devhub/computing/instances/confidential/03-confidential-instance-create-encrypted-disk' },
                    { text: 'Instance Creation', link: '/devhub/computing/instances/confidential/04-confidential-instance-deploy' },
                    { text: 'Troubleshooting', link: '/devhub/computing/instances/confidential/05-confidential-instance-troubleshooting' }
                  ]
                },
              ]
            },
            { text: 'Runtimes',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/devhub/computing/runtimes/overview' },
                { text: 'Custom Runtimes', link: '/devhub/computing/runtimes/create-custom-runtimes' },
              ]
            }
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
                { text: 'Aggregates', link: '/devhub/guides/messages/object-types/aggregates' },
                { text: 'Posts', link: '/devhub/guides/messages/object-types/posts' },
                { text: 'Store', link: '/devhub/guides/messages/object-types/store' },
                { text: 'Programs', link: '/devhub/guides/messages/object-types/programs' }
              ]
            },
            { text: 'Storage', 
              collapsed: false,
              items: [
                { text: 'Overview', link: '/devhub/guides/storage/overview' },
                { text: 'Getting Started', link: '/devhub/guides/storage/getting-started' },
                { text: 'Types of Storage',
                  collapsed: true,
                  items: [
                    { text: 'Immutable Volume', link: '/devhub/guides/storage/types-of-storage/immutable-volume' },
                    { text: 'Persistent Storage', link: '/devhub/guides/storage/types-of-storage/persistent-storage' }
                  ]
                }
              ]
            },
            { text: 'Custom Domains', link: '/devhub/guides/custom-domains/setup' },
            {
              text: 'Indexer',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/devhub/guides/indexing/' },
                { text: 'Solana IDL Indexer', link: '/devhub/guides/indexing/solana-idl-indexer' },
                { text: 'EVM Indexer', link: '/devhub/guides/indexing/evm-indexer' }
              ]
            },
            { text: 'Authentication', link: '/devhub/guides/authentication/' }
          ]
        },
        {
          text: 'API Reference',
          collapsed: true,
          items: [
            { text: 'REST API', link: '/devhub/api/rest' }
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
