# Core Channel Node Installation

This guide will walk you through the process of installing and setting up an Aleph Cloud Core Channel Node (CCN).

## Prerequisites

Before you begin, ensure you have:

- A server meeting the [hardware requirements](/nodes/compute/requirements/)
- Ubuntu 20.04 LTS or later (recommended operating system)
- Root or sudo access to your server
- Basic knowledge of Linux command line
- ALEPH tokens for staking (required for node registration)

## Installation Steps

### 1. Update Your System

First, ensure your system is up to date:

```bash
sudo apt update
sudo apt upgrade -y
```

### 2. Install Dependencies

Install the required dependencies:

```bash
sudo apt install -y python3-pip python3-dev build-essential libssl-dev libffi-dev python3-setuptools git
```

### 3. Install the Aleph.im Node Software

Clone the repository and install the software:

```bash
git clone https://github.com/aleph-im/pyaleph.git
cd pyaleph
pip3 install -e .
```

### 4. Configure Your Node

Create a configuration directory and copy the sample configuration:

```bash
mkdir -p ~/.aleph/config
cp pyaleph/config/example_config.yml ~/.aleph/config/config.yml
```

Edit the configuration file to match your setup:

```bash
nano ~/.aleph/config/config.yml
```

For detailed configuration options, see the [Configuration Guide](/nodes/core/configuration/).

### 5. Set Up a Systemd Service

Create a systemd service file to manage your node:

```bash
sudo nano /etc/systemd/system/aleph-node.service
```

Add the following content (adjust paths as needed):

```
[Unit]
Description=Aleph.im Core Channel Node
After=network.target

[Service]
User=YOUR_USERNAME
WorkingDirectory=/home/YOUR_USERNAME/pyaleph
ExecStart=/usr/bin/python3 -m pyaleph
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Enable and start the service:

```bash
sudo systemctl daemon-reload
sudo systemctl enable aleph-node
sudo systemctl start aleph-node
```

### 6. Monitor Your Node

Check the status of your node:

```bash
sudo systemctl status aleph-node
```

View the logs:

```bash
journalctl -u aleph-node -f
```

## Node Registration

After your node is installed and running, you need to register it on the Aleph.im network:

1. Visit the [Node Operator Dashboard](https://account.aleph.im/)
2. Connect your wallet containing ALEPH tokens
3. Follow the registration process, providing your node's details
4. Stake the required amount of ALEPH tokens

For detailed registration instructions, refer to the [Node Registration Guide](https://medium.com/aleph-im/aleph-im-node-registration-guide-ea2badb84e75).

## Next Steps

After successful installation and registration:

1. Learn about [Node Configuration](/nodes/core/configuration/) to optimize your setup
2. Set up [Node Backups](/nodes/resources/backups/) to protect your data
3. Explore [Node Monitoring](/nodes/resources/monitoring/) to keep track of your node's performance

If you encounter any issues during installation, check the [Troubleshooting Guide](/nodes/resources/troubleshooting/) or reach out to the community for support.
