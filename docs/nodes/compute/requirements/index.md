# Compute Resource Node Requirements

This page outlines the detailed requirements for running an Aleph Cloud Compute Resource Node (CRN). Before setting up your node, ensure that your hardware and network meet these specifications.

## Hardware Requirements

### Server Type

- **Bare Metal Server**: Virtual servers are typically not suitable as they often lack the performance and nested virtualization capabilities required for CRNs.

### Processor

Your server should use x86_64 (alias amd64) architecture with one of the following CPU configurations:

- **Gaming/Desktop CPU**: 
  - Minimum 8 cores / 16 threads
  - 3.0GHz+ clock speed
  - Optimized for fast boot-up of microVMs
  - Examples: Intel Core i9, AMD Ryzen 9

- **Datacenter CPU**:
  - Minimum 12 cores / 24 threads
  - 2.4GHz+ clock speed
  - Optimized for handling multiple concurrent workloads
  - Examples: Intel Xeon, AMD EPYC

### Memory

- **Minimum**: 64GB RAM
- **Recommended**: 128GB RAM or more for better performance with multiple concurrent workloads

### Storage

- **Capacity**: Minimum 1TB
- **Type**:
  - NVME SSD preferred for best performance
  - Datacenter-grade fast HDD possible, but requires a large and fast cache
- **Configuration**:
  - Consider RAID for data redundancy
  - Separate system and data drives recommended

### Connectivity

- **Bandwidth**: Minimum 500 Mbit/s (1 Gbit/s recommended)
- **IP Configuration**: Both IPv4 and IPv6 must be configured
- **Stability**: Reliable, low-latency connection required
- **Firewall**: Ability to open necessary ports

## Software Requirements

### Operating System

- **Recommended**: Debian 12 (Bookworm)
- **Alternative**: Ubuntu 22.04 LTS or newer
- **Note**: The installation scripts are optimized for Debian-based distributions

### Virtualization Support

- CPU must support hardware virtualization (Intel VT-x or AMD-V)
- Virtualization must be enabled in BIOS/UEFI

### Docker and Containerd

- Latest stable versions required
- Proper configuration for microVM support

## Network Requirements

### Ports

The following ports must be open and accessible:

- **TCP 4020**: API and messaging
- **TCP 4021**: Supervisor API
- **TCP 14000-14100**: Range for VM services

### DNS

- Proper forward and reverse DNS configuration recommended
- Static IP address preferred

## Financial Requirements

### ALEPH Tokens

- Sufficient ALEPH tokens for staking (check current requirements on the [registration page](https://account.aleph.im/))
- Wallet compatible with Ethereum, BNB Chain, Avalanche, or Solana for holding tokens

## Operational Requirements

### Maintenance

- Regular system updates
- Monitoring of node performance
- Backup procedures
- Disk space management

### Uptime

- 24/7 operation expected
- High availability setup recommended for serious operators

## Next Steps

Once you've confirmed that your system meets these requirements:

1. Follow the [Setup Guide](/nodes/compute/setup/) to install and configure your node
2. Register your node following the [registration process](https://medium.com/aleph-im/step-by-step-on-how-to-create-and-register-your-compute-resource-node-e5308130fbf7)
3. Consider enabling [advanced features](/nodes/compute/advanced/enable-confidential/) like confidential computing

If you encounter any issues or have questions about the requirements, refer to the [Troubleshooting Guide](/nodes/resources/troubleshooting/) or reach out to the community for support.
