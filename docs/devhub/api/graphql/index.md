# GraphQL API

Aleph Cloud provides a powerful GraphQL API that allows developers to query and interact with the network using flexible, client-specified queries. This documentation covers the available schemas, queries, mutations, and best practices.

## Endpoint

The GraphQL API is available at:

```
https://api2.aleph.im/api/v0/graphql
```

You can also access the GraphQL Playground at this URL to interactively explore the API and test queries.

## Authentication

Some GraphQL operations require authentication. Aleph Cloud uses a signature-based authentication system where you sign a message with your private key and include the signature in your request.

Authentication is handled through HTTP headers:

```
X-Aleph-Address: 0x1234567890abcdef1234567890abcdef12345678
X-Aleph-Signature: 0x...
X-Aleph-Timestamp: 1620000000
```

The signature should be created by signing a message containing the GraphQL operation and timestamp.

## Schema Overview

The GraphQL schema includes the following main types:

- **Message**: Represents a message on the Aleph Cloud network
- **Aggregate**: Represents structured data similar to a document database
- **Program**: Represents a serverless function
- **Instance**: Represents a virtual machine
- **Event**: Represents a blockchain event
- **Transaction**: Represents a blockchain transaction

## Queries

### Messages

Query messages on the network.

```graphql
query {
  message(hash: "QmHash123") {
    item_hash
    chain
    sender
    type
    channel
    timestamp
    content
    signature
    confirmations {
      chain
      height
      hash
    }
  }
  
  messages(
    hashes: ["QmHash123", "QmHash456"],
    addresses: ["0x1234..."],
    channels: ["ALEPH"],
    tags: ["example", "test"],
    types: ["STORE", "POST"],
    page: 1,
    limit: 10
  ) {
    item_hash
    chain
    sender
    type
    channel
    timestamp
    content
    signature
  }
}
```

### Aggregates

Query aggregate data.

```graphql
query {
  aggregate(address: "0x1234...", key: "my-aggregate") {
    key
    address
    content
    time
    item_hash
  }
  
  aggregates(
    address: "0x1234...",
    keys: ["key1", "key2"],
    page: 1,
    limit: 10
  ) {
    key
    address
    content
    time
    item_hash
  }
}
```

### Programs

Query serverless functions.

```graphql
query {
  program(hash: "QmProgramHash123") {
    item_hash
    owner
    name
    description
    code
    runtime
    memory
    timeout
    created_at
  }
  
  programs(
    owner: "0x1234...",
    runtime: "nodejs16",
    page: 1,
    limit: 10
  ) {
    item_hash
    owner
    name
    description
    runtime
    created_at
  }
}
```

### Instances

Query virtual machines.

```graphql
query {
  instance(id: "instance-123") {
    instance_id
    owner
    name
    description
    cpu
    memory
    disk
    image
    ipv6
    status
    created_at
    updated_at
  }
  
  instances(
    owner: "0x1234...",
    status: "running",
    page: 1,
    limit: 10
  ) {
    instance_id
    owner
    name
    description
    status
    created_at
  }
}
```

### Blockchain Data

Query indexed blockchain data.

```graphql
query {
  events(
    network: "ethereum",
    contract: "0x1234...",
    eventName: "Transfer",
    fromBlock: 12000000,
    toBlock: 12100000,
    args: {
      from: "0x0000000000000000000000000000000000000000",
      to: "0x1234..."
    },
    page: 1,
    limit: 10
  ) {
    transaction_hash
    block_number
    log_index
    contract
    event_name
    args
    timestamp
  }
  
  transactions(
    network: "ethereum",
    address: "0x1234...",
    fromTimestamp: 1620000000,
    toTimestamp: 1630000000,
    page: 1,
    limit: 10
  ) {
    hash
    block_number
    from
    to
    value
    gas
    gas_price
    timestamp
  }
}
```

### Aggregations and Analytics

Perform aggregations on blockchain data.

```graphql
query {
  aggregate(
    network: "ethereum",
    contract: "0x1234...",
    eventName: "Transfer",
    groupBy: "daily",
    fromTimestamp: 1620000000,
    toTimestamp: 1630000000,
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

## Mutations

### Create Message

Create a new message on the network.

```graphql
mutation {
  createMessage(
    input: {
      chain: "ETH",
      channel: "ALEPH",
      type: "STORE",
      content: {
        key1: "value1",
        key2: "value2"
      }
    }
  ) {
    item_hash
    status
  }
}
```

Note: This mutation requires authentication headers.

### Create/Update Aggregate

Create or update an aggregate.

```graphql
mutation {
  createAggregate(
    input: {
      key: "my-aggregate",
      content: {
        field1: "value1",
        field2: "value2"
      }
    }
  ) {
    item_hash
    key
    status
  }
}
```

Note: This mutation requires authentication headers.

### Deploy Program

Deploy a serverless function.

```graphql
mutation {
  deployProgram(
    input: {
      name: "my-program",
      description: "A simple program",
      code: "export default function(req) { return { message: 'Hello, World!' }; }",
      runtime: "nodejs16",
      memory: 128,
      timeout: 10
    }
  ) {
    item_hash
    status
  }
}
```

Note: This mutation requires authentication headers.

### Execute Program

Execute a serverless function.

```graphql
mutation {
  executeProgram(
    hash: "QmProgramHash123",
    variables: {
      key1: "value1",
      key2: "value2"
    }
  ) {
    result
    execution_time
    status
  }
}
```

### Create Instance

Create a virtual machine.

```graphql
mutation {
  createInstance(
    input: {
      name: "my-vm",
      description: "A simple VM",
      cpu: 2,
      memory: 4,
      disk: 20,
      image: "debian:11",
      ssh_key: "ssh-rsa AAAAB3NzaC1yc2E...",
      firewall: {
        allowedPorts: [22, 80, 443]
      }
    }
  ) {
    item_hash
    instance_id
    ipv6
    status
  }
}
```

Note: This mutation requires authentication headers.

### Control Instance

Control a virtual machine.

```graphql
mutation {
  controlInstance(
    id: "instance-123",
    action: "stop"  # "start", "stop", or "restart"
  ) {
    item_hash
    status
  }
}
```

Note: This mutation requires authentication headers.

## Subscriptions

GraphQL subscriptions allow you to receive real-time updates when data changes.

### Message Subscription

Subscribe to new messages.

```graphql
subscription {
  messageCreated(
    channels: ["ALEPH"],
    types: ["STORE", "POST"],
    tags: ["example", "test"]
  ) {
    item_hash
    chain
    sender
    type
    channel
    timestamp
    content
  }
}
```

### Event Subscription

Subscribe to blockchain events.

```graphql
subscription {
  eventCreated(
    network: "ethereum",
    contract: "0x1234...",
    eventName: "Transfer"
  ) {
    transaction_hash
    block_number
    log_index
    contract
    event_name
    args
    timestamp
  }
}
```

## Fragments

GraphQL fragments can be used to reuse common selections of fields.

```graphql
fragment MessageFields on Message {
  item_hash
  chain
  sender
  type
  channel
  timestamp
  content
}

query {
  message(hash: "QmHash123") {
    ...MessageFields
    signature
    confirmations {
      chain
      height
      hash
    }
  }
  
  messages(tags: ["example"]) {
    ...MessageFields
  }
}
```

## Variables

GraphQL variables allow you to parameterize your queries.

```graphql
query GetMessage($hash: String!) {
  message(hash: $hash) {
    item_hash
    content
  }
}
```

Variables:
```json
{
  "hash": "QmHash123"
}
```

## Directives

GraphQL directives can modify the execution of a query.

```graphql
query GetMessageWithDirectives($includeConfirmations: Boolean!) {
  message(hash: "QmHash123") {
    item_hash
    content
    confirmations @include(if: $includeConfirmations) {
      chain
      height
      hash
    }
  }
}
```

Variables:
```json
{
  "includeConfirmations": true
}
```

## Error Handling

GraphQL errors are returned in the `errors` field of the response.

```json
{
  "data": {
    "message": null
  },
  "errors": [
    {
      "message": "Message not found",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": ["message"]
    }
  ]
}
```

## Pagination

Most list queries support pagination using `page` and `limit` parameters.

```graphql
query {
  messages(
    tags: ["example"],
    page: 2,
    limit: 10
  ) {
    item_hash
    content
  }
}
```

Some queries also support cursor-based pagination:

```graphql
query {
  messagesConnection(
    tags: ["example"],
    first: 10,
    after: "cursor123"
  ) {
    edges {
      node {
        item_hash
        content
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

## Filtering

Many queries support complex filtering options:

```graphql
query {
  messages(
    filter: {
      AND: [
        { tags: { contains: "example" } },
        { timestamp: { gt: 1620000000 } },
        {
          OR: [
            { sender: { eq: "0x1234..." } },
            { sender: { eq: "0x5678..." } }
          ]
        }
      ]
    },
    limit: 10
  ) {
    item_hash
    content
  }
}
```

## Sorting

Many queries support sorting options:

```graphql
query {
  messages(
    tags: ["example"],
    sort: { field: "timestamp", order: DESC },
    limit: 10
  ) {
    item_hash
    timestamp
    content
  }
}
```

## Introspection

GraphQL supports introspection, allowing you to query the schema itself:

```graphql
query {
  __schema {
    types {
      name
      description
      fields {
        name
        description
        type {
          name
          kind
        }
      }
    }
  }
}
```

## Best Practices

### Request Only What You Need

One of the key advantages of GraphQL is the ability to request only the fields you need. This reduces network traffic and improves performance.

```graphql
# Good: Only request needed fields
query {
  messages(tags: ["example"], limit: 10) {
    item_hash
    timestamp
  }
}

# Bad: Request all fields when only a few are needed
query {
  messages(tags: ["example"], limit: 10) {
    item_hash
    chain
    sender
    type
    channel
    timestamp
    content
    signature
    confirmations {
      chain
      height
      hash
    }
  }
}
```

### Use Fragments for Reusable Field Sets

If you need the same set of fields in multiple queries, use fragments to avoid repetition.

```graphql
fragment MessageBasic on Message {
  item_hash
  timestamp
  content
}

query {
  recentMessages: messages(limit: 5, sort: { field: "timestamp", order: DESC }) {
    ...MessageBasic
  }
  
  popularMessages: messages(tags: ["popular"], limit: 5) {
    ...MessageBasic
  }
}
```

### Use Variables for Dynamic Queries

Always use variables for dynamic values rather than string interpolation.

```graphql
# Good: Use variables
query GetMessage($hash: String!) {
  message(hash: $hash) {
    content
  }
}

# Bad: String interpolation
query {
  message(hash: "QmHash123") {
    content
  }
}
```

### Limit Result Size

Always specify a reasonable limit for list queries to avoid performance issues.

```graphql
# Good: Specify a limit
query {
  messages(tags: ["example"], limit: 10) {
    item_hash
  }
}

# Bad: No limit specified
query {
  messages(tags: ["example"]) {
    item_hash
  }
}
```

### Use Aliases for Multiple Instances of the Same Field

If you need to query the same field with different arguments, use aliases.

```graphql
query {
  recentMessages: messages(limit: 5, sort: { field: "timestamp", order: DESC }) {
    item_hash
    content
  }
  
  popularMessages: messages(tags: ["popular"], limit: 5) {
    item_hash
    content
  }
}
```

## Client Libraries

The GraphQL API can be used with any GraphQL client library:

### JavaScript/TypeScript

```javascript
import { gql, request } from 'graphql-request';

const query = gql`
  query {
    message(hash: "QmHash123") {
      item_hash
      content
    }
  }
`;

async function fetchData() {
  const data = await request('https://api2.aleph.im/api/v0/graphql', query);
  console.log(data.message);
}
```

### Python

```python
import requests

query = """
query {
  message(hash: "QmHash123") {
    item_hash
    content
  }
}
"""

def fetch_data():
    response = requests.post(
        'https://api2.aleph.im/api/v0/graphql',
        json={'query': query}
    )
    data = response.json()
    print(data['data']['message'])
```

## Resources

- [GraphQL Official Documentation](https://graphql.org/learn/)
- [Aleph Cloud JavaScript SDK](/devhub/sdks/typescript/)
- [Aleph Cloud Python SDK](/devhub/sdks/python/)
- [REST API Documentation](/devhub/api/rest/)
