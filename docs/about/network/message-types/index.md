# Message Types

In the Aleph Cloud network, messages are the fundamental units of communication and data transfer. Similar to transactions in a blockchain, messages are propagated throughout the peer-to-peer network and processed by nodes. This page explains the different types of messages supported by Aleph Cloud.

## Message Structure

All Aleph Cloud messages share a common structure that includes:

- **Sender**: The address or decentralized identity of the message creator
- **Type**: The message type that determines how it will be processed
- **Time**: Timestamp of message creation
- **Content**: The actual data or instructions contained in the message
- **Chain**: The blockchain network associated with the sender's address
- **Signature**: Cryptographic proof that the message was created by the sender

## Core Message Types

### Store Messages

Store messages are used to persist data on the network. They come in several varieties:

- **Post**: General-purpose data storage, similar to a document in a NoSQL database
- **Aggregate**: Updates to a mutable key-value store
- **Store**: Used for file storage (both IPFS and direct)

### Program Messages

Program messages are used to execute code on the network:

- **Program**: Defines a function or program to be executed on the network
- **Instance**: Creates a persistent virtual machine instance
- **Exec**: Triggers execution of a previously defined program

### Indexing Messages

Indexing messages are used to process and index data from external blockchains:

- **Indexer**: Defines an indexing job to process blockchain data
- **Indexer Status**: Updates the status of an indexing job

### Forget Messages

Forget messages are used to mark other messages as obsolete:

- **Forget**: Indicates that a specific message should no longer be considered valid

## Using Messages

Messages can be created and sent using:

- [Python SDK](/devhub/sdks/python/)
- [TypeScript SDK](/devhub/sdks/typescript/)
- [Aleph Client CLI](/tools/aleph-client/)
- [Web Console](/tools/webconsole/)

## Example Message Flow

1. A user creates a message using one of the SDKs or tools
2. The message is signed with the user's private key
3. The signed message is sent to a Core Channel Node (CCN)
4. The CCN validates the message and broadcasts it to the network
5. Other CCNs receive and process the message
6. If the message requires computation, it is assigned to a Compute Resource Node (CRN)
7. The result of the computation is made available through the network API

For more detailed information about using messages in your applications, see the [Developer Hub](/devhub/) section of the documentation.
