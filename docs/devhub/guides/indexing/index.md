# Indexing Guide

Aleph.im provides powerful indexing capabilities that allow developers to efficiently index and query blockchain data. This guide explains how to use Aleph.im's indexing features for various blockchain networks.

## Overview

Aleph.im's indexing system offers several key features:

- **Multi-chain Support**: Index data from Ethereum, Solana, and other supported blockchains
- **Real-time Updates**: Get near real-time updates as new blocks are produced
- **Custom Indexing Logic**: Define custom indexing logic for your specific use case
- **GraphQL API**: Query indexed data using a flexible GraphQL API
- **Historical Data**: Access historical blockchain data without running a full node

## Supported Networks

Aleph.im currently supports indexing for the following blockchain networks:

- Ethereum (Mainnet, Goerli, Sepolia)
- Polygon (Mainnet, Mumbai)
- Binance Smart Chain (Mainnet, Testnet)
- Avalanche (C-Chain)
- Solana (Mainnet, Devnet)
- Fantom (Opera)
- Arbitrum (One, Nova)
- Optimism

## Getting Started

### Prerequisites

- An Aleph.im account (can be created through wallet authentication)
- Basic knowledge of the blockchain you want to index
- Understanding of smart contracts (for EVM chains) or programs (for Solana)

### Installation

#### TypeScript

```bash
npm install @aleph-sdk/client
```

#### Python

```bash
pip install aleph-client
```

## Indexing Smart Contracts (EVM)

### Creating an EVM Indexer

To index an EVM-compatible blockchain (Ethereum, Polygon, etc.), you'll need to create an indexer that specifies which contracts and events to track.

#### TypeScript

```typescript
import { AlephHttpClient } from '@aleph-sdk/client';
import { ETHAccount } from '@aleph-sdk/core';

// Create a client instance
const aleph = new AlephHttpClient();

// Connect with Ethereum wallet
const account = await aleph.ethereum.connect();

// Define the indexer configuration
const indexerConfig = {
  name: 'MyTokenIndexer',
  description: 'Indexes ERC-20 token transfers',
  network: 'ethereum',
  startBlock: 14000000, // Start indexing from this block
  contracts: [
    {
      address: '0x1234567890123456789012345678901234567890', // Token contract address
      startBlock: 14000000, // Optional: override the global startBlock
      abi: [...], // Contract ABI (at minimum, the events you want to index)
      events: [
        {
          name: 'Transfer',
          handler: 'handleTransfer' // Name of the handler function
        }
      ]
    }
  ],
  // Handler functions
  handlers: {
    handleTransfer: `
      async function handleTransfer(event, context) {
        const { from, to, value } = event.args;
        
        // Store the transfer in the database
        await context.store.set('transfers', event.transactionHash + '-' + event.logIndex, {
          from,
          to,
          value: value.toString(),
          blockNumber: event.blockNumber,
          timestamp: event.block.timestamp
        });
        
        // Update sender balance
        const fromBalance = await context.store.get('balances', from) || { balance: '0' };
        await context.store.set('balances', from, {
          balance: (BigInt(fromBalance.balance) - BigInt(value.toString())).toString()
        });
        
        // Update recipient balance
        const toBalance = await context.store.get('balances', to) || { balance: '0' };
        await context.store.set('balances', to, {
          balance: (BigInt(toBalance.balance) + BigInt(value.toString())).toString()
        });
      }
    `
  }
};

// Create the indexer
const result = await aleph.indexer.create(indexerConfig, { account });
console.log(`Indexer created with ID: ${result.indexer_id}`);
```

#### Python

```python
from aleph_sdk_python.asynchronous import AsyncClient
from aleph_sdk_python.chains.ethereum import ETHAccount

# Create an account (or connect with existing one)
private_key = "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
account = ETHAccount(private_key)

# Create a client instance
client = AsyncClient(account=account)

# Define the indexer configuration
indexer_config = {
    "name": "MyTokenIndexer",
    "description": "Indexes ERC-20 token transfers",
    "network": "ethereum",
    "startBlock": 14000000,  # Start indexing from this block
    "contracts": [
        {
            "address": "0x1234567890123456789012345678901234567890",  # Token contract address
            "startBlock": 14000000,  # Optional: override the global startBlock
            "abi": [...],  # Contract ABI (at minimum, the events you want to index)
            "events": [
                {
                    "name": "Transfer",
                    "handler": "handleTransfer"  # Name of the handler function
                }
            ]
        }
    ],
    # Handler functions
    "handlers": {
        "handleTransfer": """
        async function handleTransfer(event, context) {
            const { from, to, value } = event.args;
            
            // Store the transfer in the database
            await context.store.set('transfers', event.transactionHash + '-' + event.logIndex, {
                from,
                to,
                value: value.toString(),
                blockNumber: event.blockNumber,
                timestamp: event.block.timestamp
            });
            
            // Update sender balance
            const fromBalance = await context.store.get('balances', from) || { balance: '0' };
            await context.store.set('balances', from, {
                balance: (BigInt(fromBalance.balance) - BigInt(value.toString())).toString()
            });
            
            // Update recipient balance
            const toBalance = await context.store.get('balances', to) || { balance: '0' };
            await context.store.set('balances', to, {
                balance: (BigInt(toBalance.balance) + BigInt(value.toString())).toString()
            });
        }
        """
    }
}

# Create the indexer
result = await client.create_indexer(indexer_config)
print(f"Indexer created with ID: {result['indexer_id']}")
```

### Querying Indexed Data

Once your indexer is running, you can query the indexed data using the GraphQL API.

#### JavaScript/TypeScript

```javascript
// Query transfers
const transfers = await aleph.indexer.query(
  'MyTokenIndexer',
  'transfers',
  {
    where: {
      $or: [
        { from: '0xUserAddress' },
        { to: '0xUserAddress' }
      ]
    },
    sort: { blockNumber: -1 },
    limit: 10
  }
);

console.log(`Found ${transfers.length} transfers`);
transfers.forEach(transfer => {
  console.log(`${transfer.from} -> ${transfer.to}: ${transfer.value}`);
});

// Query balances
const balance = await aleph.indexer.query(
  'MyTokenIndexer',
  'balances',
  {
    where: { _id: '0xUserAddress' },
    limit: 1
  }
);

if (balance.length > 0) {
  console.log(`Balance: ${balance[0].balance}`);
} else {
  console.log('No balance found');
}
```

#### Python

```python
# Query transfers
transfers = await client.query_indexer(
    'MyTokenIndexer',
    'transfers',
    {
        'where': {
            '$or': [
                {'from': '0xUserAddress'},
                {'to': '0xUserAddress'}
            ]
        },
        'sort': {'blockNumber': -1},
        'limit': 10
    }
)

print(f"Found {len(transfers)} transfers")
for transfer in transfers:
    print(f"{transfer['from']} -> {transfer['to']}: {transfer['value']}")

# Query balances
balance = await client.query_indexer(
    'MyTokenIndexer',
    'balances',
    {
        'where': {'_id': '0xUserAddress'},
        'limit': 1
    }
)

if balance:
    print(f"Balance: {balance[0]['balance']}")
else:
    print('No balance found')
```

## Indexing Solana Programs

### Creating a Solana Indexer

To index Solana blockchain data, you'll need to create an indexer that specifies which programs and instruction types to track.

#### JavaScript/TypeScript

```javascript
// Define the Solana indexer configuration
const solanaIndexerConfig = {
  name: 'MySolanaNFTIndexer',
  description: 'Indexes Solana NFT mints and transfers',
  network: 'solana',
  startSlot: 100000000, // Start indexing from this slot
  programs: [
    {
      address: 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s', // Metaplex Metadata program
      instructions: [
        {
          name: 'CreateMetadataAccount',
          handler: 'handleCreateMetadata'
        },
        {
          name: 'UpdateMetadataAccount',
          handler: 'handleUpdateMetadata'
        }
      ]
    },
    {
      address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA', // SPL Token program
      instructions: [
        {
          name: 'Transfer',
          handler: 'handleTransfer'
        }
      ]
    }
  ],
  // Handler functions
  handlers: {
    handleCreateMetadata: `
      async function handleCreateMetadata(instruction, context) {
        const { accounts, data } = instruction;
        
        // Parse metadata from instruction data
        const metadata = parseMetadataData(data);
        
        // Store the metadata in the database
        await context.store.set('nfts', accounts[0], {
          mint: accounts[1],
          metadata: metadata,
          owner: accounts[3],
          createdAt: instruction.blockTime,
          updatedAt: instruction.blockTime
        });
      }
    `,
    handleUpdateMetadata: `
      async function handleUpdateMetadata(instruction, context) {
        const { accounts, data } = instruction;
        
        // Get existing metadata
        const nft = await context.store.get('nfts', accounts[0]);
        if (!nft) return;
        
        // Parse updated metadata
        const updatedMetadata = parseMetadataData(data);
        
        // Update the metadata in the database
        await context.store.set('nfts', accounts[0], {
          ...nft,
          metadata: updatedMetadata,
          updatedAt: instruction.blockTime
        });
      }
    `,
    handleTransfer: `
      async function handleTransfer(instruction, context) {
        const { accounts } = instruction;
        
        // Find NFTs owned by the source account
        const nfts = await context.store.query('nfts', {
          where: { owner: accounts[0] }
        });
        
        // Update ownership for transferred NFTs
        for (const nft of nfts) {
          if (nft.mint === accounts[1]) {
            await context.store.set('nfts', nft._id, {
              ...nft,
              owner: accounts[2],
              updatedAt: instruction.blockTime
            });
            
            // Record the transfer
            await context.store.set('transfers', instruction.signature + '-' + instruction.index, {
              mint: accounts[1],
              from: accounts[0],
              to: accounts[2],
              signature: instruction.signature,
              blockTime: instruction.blockTime
            });
          }
        }
      }
    `
  }
};

// Create the Solana indexer
const solanaResult = await aleph.indexer.create(solanaIndexerConfig, { account });
console.log(`Solana indexer created with ID: ${solanaResult.indexer_id}`);
```

### Querying Solana Indexed Data

```javascript
// Query NFTs by owner
const nfts = await aleph.indexer.query(
  'MySolanaNFTIndexer',
  'nfts',
  {
    where: { owner: 'SolanaWalletAddress' },
    limit: 20
  }
);

console.log(`Found ${nfts.length} NFTs`);
nfts.forEach(nft => {
  console.log(`NFT: ${nft.metadata.name} (${nft.mint})`);
});

// Query NFT transfers
const transfers = await aleph.indexer.query(
  'MySolanaNFTIndexer',
  'transfers',
  {
    where: {
      $or: [
        { from: 'SolanaWalletAddress' },
        { to: 'SolanaWalletAddress' }
      ]
    },
    sort: { blockTime: -1 },
    limit: 10
  }
);

transfers.forEach(transfer => {
  console.log(`${transfer.from} -> ${transfer.to}: ${transfer.mint}`);
});
```

## Advanced Indexing Features

### Custom Data Transformations

You can perform complex data transformations within your handler functions.

```javascript
// Handler with data transformation
const handlerWithTransformation = `
  async function handleSwap(event, context) {
    const { sender, amount0In, amount1In, amount0Out, amount1Out, to } = event.args;
    
    // Determine swap direction
    const token0Address = '0x...'; // Address of token0
    const token1Address = '0x...'; // Address of token1
    
    let fromToken, toToken, fromAmount, toAmount;
    
    if (amount0In > 0 && amount1Out > 0) {
      // Swap token0 for token1
      fromToken = token0Address;
      toToken = token1Address;
      fromAmount = amount0In;
      toAmount = amount1Out;
    } else {
      // Swap token1 for token0
      fromToken = token1Address;
      toToken = token0Address;
      fromAmount = amount1In;
      toAmount = amount0Out;
    }
    
    // Calculate price impact
    const priceImpact = calculatePriceImpact(fromAmount, toAmount);
    
    // Store the transformed swap data
    await context.store.set('swaps', event.transactionHash, {
      user: sender,
      fromToken,
      toToken,
      fromAmount: fromAmount.toString(),
      toAmount: toAmount.toString(),
      priceImpact,
      blockNumber: event.blockNumber,
      timestamp: event.block.timestamp
    });
    
    // Update trading volume statistics
    await updateVolumeStats(context, fromToken, fromAmount);
    await updateVolumeStats(context, toToken, toAmount);
  }
  
  async function updateVolumeStats(context, token, amount) {
    // Get current day timestamp (truncated to day)
    const day = Math.floor(Date.now() / 86400000) * 86400000;
    
    // Get current volume stats
    const volumeStats = await context.store.get('dailyVolume', token + '-' + day) || { volume: '0' };
    
    // Update volume
    await context.store.set('dailyVolume', token + '-' + day, {
      token,
      day,
      volume: (BigInt(volumeStats.volume) + BigInt(amount.toString())).toString()
    });
  }
  
  function calculatePriceImpact(fromAmount, toAmount) {
    // Implement price impact calculation
    // This is a simplified example
    return ((fromAmount / toAmount) * 100).toFixed(2);
  }
`;
```

### Indexing Multiple Contracts Together

You can index multiple related contracts and combine their data.

```javascript
// Define an indexer for a DeFi protocol with multiple contracts
const defiIndexerConfig = {
  name: 'DeFiProtocolIndexer',
  description: 'Indexes a DeFi protocol with multiple contracts',
  network: 'ethereum',
  startBlock: 14000000,
  contracts: [
    {
      // Vault contract
      address: '0xVaultAddress',
      abi: [...],
      events: [
        { name: 'Deposit', handler: 'handleDeposit' },
        { name: 'Withdraw', handler: 'handleWithdraw' }
      ]
    },
    {
      // Strategy contract
      address: '0xStrategyAddress',
      abi: [...],
      events: [
        { name: 'Harvest', handler: 'handleHarvest' },
        { name: 'StrategyReported', handler: 'handleStrategyReport' }
      ]
    },
    {
      // Governance contract
      address: '0xGovernanceAddress',
      abi: [...],
      events: [
        { name: 'ProposalCreated', handler: 'handleProposalCreated' },
        { name: 'VoteCast', handler: 'handleVoteCast' }
      ]
    }
  ],
  handlers: {
    // Handler implementations...
  }
};
```

### Historical Data Analysis

You can perform historical data analysis within your indexer.

```javascript
// Handler for analyzing historical price data
const priceAnalysisHandler = `
  async function handlePriceUpdate(event, context) {
    const { token, price } = event.args;
    
    // Store the current price
    await context.store.set('prices', token, {
      price: price.toString(),
      timestamp: event.block.timestamp,
      blockNumber: event.blockNumber
    });
    
    // Get historical prices for this token
    const historicalPrices = await context.store.query('priceHistory', {
      where: { token },
      sort: { timestamp: -1 },
      limit: 100
    });
    
    // Store this price in history
    await context.store.set('priceHistory', token + '-' + event.blockNumber, {
      token,
      price: price.toString(),
      timestamp: event.block.timestamp,
      blockNumber: event.blockNumber
    });
    
    // Calculate moving averages
    if (historicalPrices.length >= 20) {
      const ma20 = calculateMovingAverage(historicalPrices, 20);
      
      await context.store.set('indicators', token + '-ma20', {
        token,
        indicator: 'ma20',
        value: ma20.toString(),
        timestamp: event.block.timestamp
      });
    }
    
    if (historicalPrices.length >= 50) {
      const ma50 = calculateMovingAverage(historicalPrices, 50);
      
      await context.store.set('indicators', token + '-ma50', {
        token,
        indicator: 'ma50',
        value: ma50.toString(),
        timestamp: event.block.timestamp
      });
    }
  }
  
  function calculateMovingAverage(prices, period) {
    const recentPrices = prices.slice(0, period);
    const sum = recentPrices.reduce((acc, price) => acc + BigInt(price.price), BigInt(0));
    return sum / BigInt(period);
  }
`;
```

## Use Cases

### NFT Marketplace Analytics

Index NFT sales and transfers to build marketplace analytics.

```javascript
// Handler for NFT sales
const nftSaleHandler = `
  async function handleNFTSale(event, context) {
    const { tokenId, seller, buyer, price } = event.args;
    
    // Get the NFT metadata
    const nft = await context.store.get('nfts', tokenId.toString());
    
    // Record the sale
    await context.store.set('sales', event.transactionHash, {
      tokenId: tokenId.toString(),
      collection: event.address,
      seller,
      buyer,
      price: price.toString(),
      metadata: nft ? nft.metadata : null,
      timestamp: event.block.timestamp
    });
    
    // Update ownership
    if (nft) {
      await context.store.set('nfts', tokenId.toString(), {
        ...nft,
        owner: buyer,
        lastSalePrice: price.toString(),
        lastSaleTimestamp: event.block.timestamp
      });
    }
    
    // Update collection stats
    await updateCollectionStats(context, event.address, price);
  }
  
  async function updateCollectionStats(context, collection, price) {
    // Get current stats
    const stats = await context.store.get('collectionStats', collection) || {
      totalSales: 0,
      totalVolume: '0',
      floorPrice: '0',
      highestSale: '0'
    };
    
    // Update stats
    const newStats = {
      totalSales: stats.totalSales + 1,
      totalVolume: (BigInt(stats.totalVolume) + BigInt(price.toString())).toString(),
      highestSale: BigInt(price.toString()) > BigInt(stats.highestSale) ? 
        price.toString() : stats.highestSale
    };
    
    // Update floor price logic would be more complex in a real implementation
    
    await context.store.set('collectionStats', collection, newStats);
  }
`;
```

### DeFi Protocol Monitoring

Monitor DeFi protocols for key metrics and events.

```javascript
// Handler for monitoring liquidity changes
const liquidityHandler = `
  async function handleLiquidityChange(event, context) {
    const { pair, reserve0, reserve1 } = event.args;
    
    // Get token addresses for this pair
    const pairInfo = await context.store.get('pairs', pair);
    if (!pairInfo) return;
    
    const { token0, token1, decimals0, decimals1 } = pairInfo;
    
    // Calculate liquidity in standard units
    const liquidity0 = formatUnits(reserve0, decimals0);
    const liquidity1 = formatUnits(reserve1, decimals1);
    
    // Store current liquidity
    await context.store.set('liquidity', pair, {
      pair,
      token0,
      token1,
      reserve0: reserve0.toString(),
      reserve1: reserve1.toString(),
      liquidity0,
      liquidity1,
      timestamp: event.block.timestamp,
      blockNumber: event.blockNumber
    });
    
    // Store historical liquidity data
    await context.store.set('liquidityHistory', pair + '-' + event.blockNumber, {
      pair,
      reserve0: reserve0.toString(),
      reserve1: reserve1.toString(),
      timestamp: event.block.timestamp,
      blockNumber: event.blockNumber
    });
    
    // Calculate and store derived metrics
    const price = calculatePrice(reserve0, reserve1, decimals0, decimals1);
    await context.store.set('prices', token1 + '-' + token0, {
      pair,
      token0,
      token1,
      price,
      timestamp: event.block.timestamp
    });
  }
  
  function formatUnits(value, decimals) {
    return (Number(value) / (10 ** Number(decimals))).toString();
  }
  
  function calculatePrice(reserve0, reserve1, decimals0, decimals1) {
    const adjusted0 = Number(reserve0) / (10 ** Number(decimals0));
    const adjusted1 = Number(reserve1) / (10 ** Number(decimals1));
    return (adjusted1 / adjusted0).toString();
  }
`;
```

### Governance Tracking

Track on-chain governance proposals and votes.

```javascript
// Handler for governance proposals
const proposalHandler = `
  async function handleProposalCreated(event, context) {
    const { proposalId, proposer, targets, values, signatures, calldatas, description } = event.args;
    
    // Store the proposal
    await context.store.set('proposals', proposalId.toString(), {
      proposalId: proposalId.toString(),
      proposer,
      targets,
      values: values.map(v => v.toString()),
      signatures,
      calldatas,
      description,
      status: 'active',
      forVotes: '0',
      againstVotes: '0',
      abstainVotes: '0',
      createdAt: event.block.timestamp,
      createdBlock: event.blockNumber
    });
  }
  
  async function handleVoteCast(event, context) {
    const { voter, proposalId, support, votes } = event.args;
    
    // Get current proposal
    const proposal = await context.store.get('proposals', proposalId.toString());
    if (!proposal) return;
    
    // Update vote counts
    let updatedProposal = { ...proposal };
    if (support === 0) {
      updatedProposal.againstVotes = (BigInt(proposal.againstVotes) + BigInt(votes.toString())).toString();
    } else if (support === 1) {
      updatedProposal.forVotes = (BigInt(proposal.forVotes) + BigInt(votes.toString())).toString();
    } else if (support === 2) {
      updatedProposal.abstainVotes = (BigInt(proposal.abstainVotes) + BigInt(votes.toString())).toString();
    }
    
    // Store updated proposal
    await context.store.set('proposals', proposalId.toString(), updatedProposal);
    
    // Store the vote
    await context.store.set('votes', voter + '-' + proposalId.toString(), {
      voter,
      proposalId: proposalId.toString(),
      support,
      votes: votes.toString(),
      timestamp: event.block.timestamp
    });
  }
`;
```

## Best Practices

### Efficient Indexing

- **Start from a Recent Block**: Unless you need historical data, start indexing from a recent block
- **Index Only What You Need**: Only track the events and data you actually need
- **Use Efficient Data Structures**: Design your data models for efficient querying
- **Batch Updates**: Combine multiple updates when possible to reduce database operations

### Error Handling

- **Implement Robust Error Handling**: Handle potential errors in your handler functions
- **Validate Input Data**: Always validate event data before processing
- **Implement Retry Logic**: For external API calls or other operations that might fail

### Performance Optimization

- **Keep Handlers Simple**: Complex handler logic can slow down indexing
- **Use Efficient Queries**: Optimize your database queries for performance
- **Consider Data Volume**: Be mindful of the amount of data you're storing

## Troubleshooting

### Common Issues

#### Indexer Not Processing Events

If your indexer isn't processing events, check:

1. The contract address is correct
2. The ABI includes the events you're trying to index
3. The event names match exactly what's in the ABI
4. The start block is correct (events before this block won't be indexed)

#### Handler Function Errors

If your handler functions are throwing errors:

1. Check the handler logs in the indexer dashboard
2. Ensure your handler logic handles all possible event data formats
3. Add try/catch blocks to prevent the handler from crashing

#### Query Performance Issues

If your queries are slow:

1. Add appropriate indexes to your collections
2. Limit the amount of data returned
3. Use more specific query conditions

## Resources

- [JavaScript SDK Documentation](/devhub/sdks/typescript/)
- [Python SDK Documentation](/devhub/sdks/python/)
- [API Reference](/devhub/api/rest/)
- [GraphQL API Documentation](/devhub/api/graphql/)
- [Example Projects](/devhub/examples/web3-apps/)
