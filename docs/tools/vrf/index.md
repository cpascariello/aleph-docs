# Verifiable Random Function (VRF)

Aleph Cloud provides a Verifiable Random Function (VRF) service that enables developers to generate provably fair and verifiable random numbers for their applications. This guide explains how to use Aleph Cloud's VRF capabilities.

## Overview

A Verifiable Random Function (VRF) is a cryptographic primitive that maps inputs to verifiable pseudorandom outputs. The key properties of a VRF are:

- **Pseudorandomness**: The output appears random to anyone who doesn't know the private key
- **Verifiability**: The output can be verified as correct using a public key and proof
- **Uniqueness**: Each input produces exactly one output for a given private key

Aleph Cloud's VRF service offers:

- Decentralized random number generation
- Cryptographic verification of randomness
- Tamper-proof and transparent process
- Easy integration with blockchain applications

## Use Cases

VRFs are particularly useful for:

- **Gaming**: Fair selection of winners, random drops, or game mechanics
- **NFTs**: Random trait assignment or reveal mechanics
- **DeFi**: Random selection for airdrops or lottery systems
- **Governance**: Random selection of participants for committees
- **Load Balancing**: Random but verifiable distribution of resources

## Getting Started

### Using the TypeScript SDK

```typescript
import { AlephHttpClient } from '@aleph-sdk/client';
import { ETHAccount } from '@aleph-sdk/core';

const aleph = new AlephHttpClient();

async function generateRandom() {
  // Generate a random number with a specific seed
  const result = await aleph.vrf.generate({
    seed: 'my-unique-seed-value',
    // Optional parameters
    min: 1,
    max: 100,
    count: 1
  });
  
  console.log(`Random number: ${result.value}`);
  console.log(`Verification proof: ${result.proof}`);
  
  return result;
}

async function verifyRandom(result) {
  // Verify a random number
  const isValid = await aleph.vrf.verify({
    seed: 'my-unique-seed-value',
    value: result.value,
    proof: result.proof
  });
  
  console.log(`Is valid: ${isValid}`);
  
  return isValid;
}
```

### Using the Python SDK

```python
from aleph_sdk_python.asynchronous import AsyncClient
from aleph_sdk_python.vrf import generate_random, verify_random

async def generate_and_verify():
    client = AsyncClient()
    
    # Generate a random number
    result = await generate_random(
        client=client,
        seed="my-unique-seed-value",
        min_value=1,
        max_value=100,
        count=1
    )
    
    print(f"Random number: {result['value']}")
    print(f"Verification proof: {result['proof']}")
    
    # Verify the random number
    is_valid = await verify_random(
        client=client,
        seed="my-unique-seed-value",
        value=result['value'],
        proof=result['proof']
    )
    
    print(f"Is valid: {is_valid}")
    
    return result, is_valid
```

### Using the REST API

#### Generate Random Number

```bash
curl -X POST "https://api2.aleph.im/api/v0/vrf/generate" \
  -H "Content-Type: application/json" \
  -d '{
    "seed": "my-unique-seed-value",
    "min": 1,
    "max": 100,
    "count": 1
  }'
```

#### Verify Random Number

```bash
curl -X POST "https://api2.aleph.im/api/v0/vrf/verify" \
  -H "Content-Type: application/json" \
  -d '{
    "seed": "my-unique-seed-value",
    "value": 42,
    "proof": "0x..."
  }'
```

## Advanced Usage

### Generating Multiple Random Numbers

You can generate multiple random numbers in a single request:

```javascript
const result = await aleph.vrf.generate({
  seed: 'my-unique-seed-value',
  min: 1,
  max: 100,
  count: 5  // Generate 5 random numbers
});

console.log(`Random numbers: ${result.values}`);
```

### Using Custom Entropy Sources

You can combine multiple sources of entropy for stronger randomness:

```javascript
const result = await aleph.vrf.generate({
  seed: 'my-unique-seed-value',
  entropy: [
    'additional-entropy-source-1',
    'additional-entropy-source-2'
  ],
  min: 1,
  max: 100
});
```

### Generating Random Bytes

For applications that need raw random bytes:

```javascript
const result = await aleph.vrf.generateBytes({
  seed: 'my-unique-seed-value',
  length: 32  // Generate 32 random bytes
});

console.log(`Random bytes: ${result.bytes}`);
```

## Integration Examples

### Random NFT Trait Assignment

```javascript
// Example of assigning random traits to NFTs
async function assignNFTTraits(tokenId) {
  const traits = [
    'background', 'body', 'eyes', 'mouth', 'hat', 'accessory'
  ];
  
  const traitOptions = {
    background: ['red', 'blue', 'green', 'yellow', 'purple'],
    body: ['human', 'robot', 'alien', 'animal', 'ghost'],
    eyes: ['normal', 'angry', 'sad', 'surprised', 'sleepy'],
    mouth: ['smile', 'frown', 'open', 'closed', 'tongue'],
    hat: ['none', 'cap', 'crown', 'beanie', 'top hat'],
    accessory: ['none', 'glasses', 'necklace', 'earrings', 'watch']
  };
  
  const assignedTraits = {};
  
  for (const trait of traits) {
    const options = traitOptions[trait];
    const result = await aleph.vrf.generate({
      seed: `nft-${tokenId}-trait-${trait}`,
      min: 0,
      max: options.length - 1
    });
    
    assignedTraits[trait] = options[result.value];
  }
  
  return assignedTraits;
}
```

### Random Winner Selection

```javascript
// Example of selecting a random winner from a list of participants
async function selectWinner(participants, contestId) {
  const result = await aleph.vrf.generate({
    seed: `contest-${contestId}-${Date.now()}`,
    min: 0,
    max: participants.length - 1
  });
  
  const winnerIndex = result.value;
  const winner = participants[winnerIndex];
  
  return {
    winner,
    index: winnerIndex,
    proof: result.proof,
    totalParticipants: participants.length
  };
}
```

## Best Practices

1. **Use Unique Seeds**: Always use unique and specific seed values for each random generation
2. **Include Timestamps**: For time-sensitive applications, include timestamps in your seed
3. **Verify Results**: Always verify important random results, especially for high-value applications
4. **Store Proofs**: Keep proofs for future verification when needed
5. **Combine with On-chain Data**: For blockchain applications, consider including block hashes or other on-chain data in your seed

## Security Considerations

- **Seed Privacy**: Keep seeds private until after the random generation if the seed could be used to predict the outcome
- **Timing**: Be aware of when randomness is generated and revealed to prevent front-running
- **Verification**: Always verify critical random values before taking action based on them
- **Entropy Sources**: Use multiple entropy sources for highly sensitive applications

## Troubleshooting

### Common Issues

- **Verification Fails**: Ensure you're using the exact same seed and parameters for verification
- **Rate Limiting**: The API may have rate limits for VRF generation
- **Proof Format**: Make sure you're storing and passing the complete proof without modification

### Getting Help

If you encounter issues with the VRF service:

1. Check the [Aleph Cloud documentation](/devhub/)
2. Join the [Aleph Cloud Discord](https://discord.gg/alephim) for community support
3. Contact support through the [Aleph Cloud website](https://aleph.im/contact)

## Next Steps

- [API Reference](/devhub/api/rest/) - Documentation for the Aleph Cloud REST API
- [SDK Documentation](/devhub/sdks/typescript/) - Learn how to use the JavaScript/TypeScript SDK
- [Example Projects](/devhub/examples/) - See examples of applications using Aleph Cloud services
