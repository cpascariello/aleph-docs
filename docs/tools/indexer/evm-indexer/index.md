# EVM Indexer

Aleph Cloud's EVM Indexer is a powerful tool for indexing, querying, and monitoring events and transactions on EVM-compatible blockchains. It allows developers to efficiently access and analyze on-chain data without running their own indexing infrastructure.

## Overview

The EVM Indexer provides:

- Real-time indexing of blockchain events and transactions
- Historical data access and querying
- Support for multiple EVM-compatible chains (Ethereum, Polygon, Avalanche, etc.)
- Customizable indexing strategies
- WebSocket subscriptions for real-time updates
- GraphQL API for flexible queries

## Supported Networks

The EVM Indexer currently supports the following networks:

- Ethereum Mainnet
- Ethereum Goerli Testnet
- Polygon (Matic)
- Polygon Mumbai Testnet
- Avalanche C-Chain
- Avalanche Fuji Testnet
- Binance Smart Chain
- Arbitrum
- Optimism
- Fantom

## Getting Started

### Accessing the Indexer

You can access the EVM Indexer through:

- **GraphQL API**: `https://api2.aleph.im/api/v0/indexer/graphql`
- **REST API**: `https://api2.aleph.im/api/v0/indexer/evm`
- **WebSocket**: `wss://api2.aleph.im/api/v0/indexer/ws`

### Basic Queries

#### Using GraphQL

```graphql
query {
  transactions(
    network: "ethereum"
    address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"
    limit: 10
  ) {
    hash
    blockNumber
    from
    to
    value
    timestamp
  }
}
```

#### Using REST API

```bash
curl "https://api2.aleph.im/api/v0/indexer/evm/ethereum/transactions?address=0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984&limit=10"
```

### Event Queries

#### Using GraphQL

```graphql
query {
  events(
    network: "ethereum"
    contract: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"
    eventName: "Transfer"
    limit: 10
  ) {
    transactionHash
    blockNumber
    logIndex
    args
    timestamp
  }
}
```

#### Using REST API

```bash
curl "https://api2.aleph.im/api/v0/indexer/evm/ethereum/events?contract=0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984&eventName=Transfer&limit=10"
```

### WebSocket Subscriptions

```javascript
import WebSocket from 'ws';

const ws = new WebSocket('wss://api2.aleph.im/api/v0/indexer/ws');

ws.on('open', () => {
  // Subscribe to Transfer events from a specific contract
  ws.send(JSON.stringify({
    type: 'subscribe',
    network: 'ethereum',
    channel: 'events',
    contract: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    eventName: 'Transfer'
  }));
});

ws.on('message', (data) => {
  const event = JSON.parse(data);
  console.log('Received event:', event);
});
```

## Advanced Usage

### Custom Indexing

You can create custom indexing strategies for specific contracts:

```typescript
import { AlephHttpClient } from '@aleph-sdk/client';
import { ETHAccount } from '@aleph-sdk/core';

const aleph = new AlephHttpClient();

async function createCustomIndex() {
  const result = await aleph.indexer.create({
    name: 'my-token-index',
    network: 'ethereum',
    contract: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    startBlock: 10000000,
    abi: [...], // Contract ABI
    events: ['Transfer', 'Approval'],
    transforms: [
      {
        eventName: 'Transfer',
        transform: `
          function transform(event, context) {
            return {
              from: event.args.from,
              to: event.args.to,
              value: event.args.value.toString(),
              timestamp: context.block.timestamp
            };
          }
        `
      }
    ]
  });
  
  console.log(`Custom index created: ${result.indexId}`);
  
  return result;
}
```

### Complex Queries

#### Filtering by Event Arguments

```graphql
query {
  events(
    network: "ethereum"
    contract: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"
    eventName: "Transfer"
    args: {
      to: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
    }
    limit: 10
  ) {
    transactionHash
    blockNumber
    args
    timestamp
  }
}
```

#### Time-Based Queries

```graphql
query {
  transactions(
    network: "ethereum"
    address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"
    fromTimestamp: 1640995200 # Jan 1, 2022
    toTimestamp: 1643673600   # Feb 1, 2022
    limit: 100
  ) {
    hash
    blockNumber
    value
    timestamp
  }
}
```

### Aggregation Queries

```graphql
query {
  aggregate(
    network: "ethereum"
    contract: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"
    eventName: "Transfer"
    groupBy: "daily"
    fromTimestamp: 1640995200 # Jan 1, 2022
    toTimestamp: 1643673600   # Feb 1, 2022
    aggregation: {
      count: true,
      sum: "args.value"
    }
  ) {
    timestamp
    count
    sum
  }
}
```

## Integration Examples

### Monitoring Token Transfers

```typescript
import { AlephHttpClient } from '@aleph-sdk/client';
import { ETHAccount } from '@aleph-sdk/core';
import WebSocket from 'ws';

const aleph = new AlephHttpClient();
const tokenAddress = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'; // UNI token
const walletAddress = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';

// Get historical transfers
async function getHistoricalTransfers() {
  const transfers = await aleph.indexer.queryEvents({
    network: 'ethereum',
    contract: tokenAddress,
    eventName: 'Transfer',
    args: {
      $or: [
        { from: walletAddress },
        { to: walletAddress }
      ]
    },
    limit: 100
  });
  
  return transfers;
}

// Monitor new transfers
function monitorTransfers() {
  const ws = new WebSocket('wss://api2.aleph.im/api/v0/indexer/ws');
  
  ws.on('open', () => {
    ws.send(JSON.stringify({
      type: 'subscribe',
      network: 'ethereum',
      channel: 'events',
      contract: tokenAddress,
      eventName: 'Transfer',
      filter: {
        $or: [
          { 'args.from': walletAddress },
          { 'args.to': walletAddress }
        ]
      }
    }));
  });
  
  ws.on('message', (data) => {
    const event = JSON.parse(data);
    console.log('New transfer:', event);
    
    // Process the transfer event
    if (event.args.to === walletAddress) {
      console.log(`Received ${event.args.value} tokens`);
    } else {
      console.log(`Sent ${event.args.value} tokens`);
    }
  });
  
  return ws;
}
```

### NFT Collection Analytics

```typescript
import { AlephHttpClient } from '@aleph-sdk/client';
import { ETHAccount } from '@aleph-sdk/core';

const aleph = new AlephHttpClient();
const nftContract = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D'; // BAYC

async function getNFTAnalytics() {
  // Get total sales volume
  const salesVolume = await aleph.indexer.aggregate({
    network: 'ethereum',
    contract: nftContract,
    eventName: 'Transfer',
    fromTimestamp: 1640995200, // Jan 1, 2022
    toTimestamp: 1643673600,   // Feb 1, 2022
    aggregation: {
      count: true
    },
    groupBy: 'daily'
  });
  
  // Get top holders
  const holders = await aleph.indexer.queryState({
    network: 'ethereum',
    index: 'nft-ownership',
    contract: nftContract,
    query: {},
    sort: { tokenCount: -1 },
    limit: 10
  });
  
  return {
    salesVolume,
    holders
  };
}
```

## Best Practices

1. **Use Specific Queries**: Narrow down your queries as much as possible for better performance
2. **Implement Pagination**: Use `limit` and `offset` parameters for large result sets
3. **Consider Caching**: Cache frequently accessed data to reduce API calls
4. **Use WebSockets for Real-time**: WebSocket subscriptions are more efficient than polling
5. **Batch Requests**: Combine multiple queries when possible to reduce network overhead

## Limitations

- **Historical Data**: Some networks may have limited historical data availability
- **Rate Limits**: API requests may be subject to rate limiting
- **Complex Queries**: Very complex queries may have longer response times
- **Custom Indexing**: Custom indexing jobs may take time to process historical data

## Troubleshooting

### Common Issues

- **Missing Events**: Ensure the contract and event name are correct
- **Connection Issues**: Check your network connection and the API status
- **Rate Limiting**: Implement backoff strategies for rate-limited requests
- **Data Consistency**: Allow for slight delays in real-time data indexing

### Getting Help

If you encounter issues with the EVM Indexer:

1. Check the [Aleph Cloud documentation](/devhub/)
2. Join the [Aleph Cloud Discord](https://discord.gg/alephim) for community support
3. Contact support through the [Aleph Cloud website](https://aleph.im/contact)

## Next Steps

- [Indexing Guide](/devhub/guides/indexing/) - Learn more about Aleph Cloud's indexing capabilities
- [API Reference](/devhub/api/rest/) - Documentation for the Aleph Cloud REST API
- [SDK Documentation](/devhub/sdks/typescript/) - Learn how to use the JavaScript/TypeScript SDK
