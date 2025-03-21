# Compute Resource Nodes Introduction

## What are Compute Resource Nodes?

Aleph Cloud Compute Resource Nodes (CRNs) are decentralized computing infrastructure components that form a vital part of the Aleph Cloud network. These nodes work collectively to provide distributed and secure computing power, storage, and other resources to users and applications on the platform.

Compute Resource Nodes are designed to support a wide range of tasks, including:
- Off-chain smart contract execution
- Decentralized application (dApp) hosting
- Decentralized file storage
- Function execution
- Virtual machine provisioning

These nodes enable users to access and utilize decentralized computing resources without relying on centralized servers or cloud providers, ensuring better privacy, security, and control over their data and applications.

## Network Architecture

CRNs are connected to Core Channel Nodes (CCNs) in the Aleph Cloud network. Each CCN can connect to up to three CRNs, and the CCNs distribute workloads to their connected CRNs. This architecture ensures that the network remains resilient against single points of failure, as the removal of one node does not impact the overall functioning of the system.

In return for their contributions, node operators are rewarded with ALEPH tokens, creating an incentive system for maintaining a healthy and robust ecosystem.

## Node Security

Aleph Cloud employs advanced cryptographic techniques and consensus algorithms to ensure that the Compute Resource Nodes operate securely and reliably. The network uses microVMs (micro virtual machines) to isolate workloads and ensure that one user's application cannot interfere with another's.

## Hardware Requirements

To run a Compute Resource Node effectively, you'll need:

- **Platform**: A bare metal server is required since virtual servers are often too slow and unable to run nested virtualization.
- **Processor** using x86_64 (alias amd64) architecture (2 options):
    - Min. 8 cores / 16 threads, 3.0ghz+ CPU (gaming CPU for fast boot-up of microVMs)
    - Min. 12 core / 24 threads, 2.4ghz+ CPU (datacenter CPU for multiple concurrent loads)
- **Memory**: Min. 64GB of RAM
- **Storage**: 1TB (NVME SSD preferred, datacenter fast HDD possible under conditions, you'll want a big and fast cache)
- **Connectivity**: Minimum of 500 Mbit/s, both IPv4 and IPv6 configured

## Next Steps

If you're interested in running a Compute Resource Node:

1. Check the detailed [Requirements](/nodes/compute/requirements/) for running a CRN
2. Follow the [Setup Guide](/nodes/compute/setup/) to install and configure your node
3. Learn about [Advanced Features](/nodes/compute/advanced/enable-confidential/) such as confidential computing

Running a Compute Resource Node is a significant contribution to the Aleph.im ecosystem and helps provide the computing power needed for decentralized applications.
