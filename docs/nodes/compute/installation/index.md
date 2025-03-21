# Compute Resource Node Installation

This guide will walk you through the process of setting up an Aleph Cloud Compute Resource Node (CRN). We'll cover installation, configuration, and verification steps.

## Prerequisites

Before beginning, ensure you have:

- A server meeting the [hardware requirements](/nodes/compute/requirements/)
- A public domain name with access to add TXT and wildcard records
- Root access to your server
- ALEPH tokens for staking (required for node registration)

## Installation Process

### Step 1: Choose Your Operating System

The installation process varies slightly depending on your operating system. We recommend using:
- Debian 12 (Bookworm) - Recommended
- Ubuntu 22.04 LTS or newer

### Step 2: Install the VM-Connector

The VM-Connector is responsible for managing communication between the Aleph Cloud network and your node. Install it using Docker:

```bash
apt update
apt upgrade
apt install -y docker.io apparmor-profiles
docker run -d -p 127.0.0.1:4021:4021/tcp --restart=always --name vm-connector alephim/vm-connector:alpha
```

### Step 3: Install the VM-Supervisor

The VM-Supervisor orchestrates the virtual machines on your node. Install it using the official package for your operating system:

#### For Debian 12:

```bash
# Download the latest release
release=$(curl -s https://api.github.com/repos/aleph-im/aleph-vm/releases/latest | awk -F'"' '/"tag_name":/ {print $4}')
sudo wget -P /opt/ https://github.com/aleph-im/aleph-vm/releases/download/${release}/aleph-vm.debian-12.deb
# Install it
apt install /opt/aleph-vm.debian-12.deb
```

#### For Ubuntu 22.04:

```bash
# Download the latest release
release=$(curl -s https://api.github.com/repos/aleph-im/aleph-vm/releases/latest | awk -F'"' '/"tag_name":/ {print $4}')
sudo wget -P /opt/ https://github.com/aleph-im/aleph-vm/releases/download/${release}/aleph-vm.ubuntu-22.04.deb
# Install it
apt install /opt/aleph-vm.ubuntu-22.04.deb
```

Reboot if required (new kernel, etc.).

## Configuration

### Step 1: Update the Configuration File

Edit the configuration file at `/etc/aleph-vm/supervisor.env`:

```bash
nano /etc/aleph-vm/supervisor.env
```

### Step 2: Configure Domain Name

Set your domain name:

```
ALEPH_VM_DOMAIN_NAME=your-domain.com
```

Replace `your-domain.com` with your actual domain name.

### Step 3: Configure IPv6 Address Pool

Specify the IPv6 address range for your virtual machines:

1. Obtain the IPv6 address of your node
2. Remove the trailing number after `::` if present (e.g., `2a01:4f8:171:787::2/64` becomes `2a01:4f8:171:787::/64`)
3. Add the IPv6 range to your configuration:

```
ALEPH_VM_IPV6_ADDRESS_POOL="2a01:4f8:171:787::/64"
```

Replace with your actual IPv6 range.

### Step 4: Configure Network Interface (Optional)

The default network interface is detected automatically, but you can specify it manually:

```
ALEPH_VM_NETWORK_INTERFACE=enp0s1
```

Replace `enp0s1` with your actual network interface name.

### Step 5: Configure DNS Resolution (Optional)

You can configure the DNS resolver:

```
ALEPH_VM_DNS_RESOLUTION=resolvectl
```

Or specify DNS nameservers directly:

```
ALEPH_VM_DNS_NAMESERVERS=["1.1.1.1", "8.8.8.8"]
```

### Step 6: Apply Configuration Changes

Restart the service to apply your changes:

```bash
systemctl restart aleph-vm-supervisor
```

## Setting Up a Reverse Proxy

A reverse proxy is required to handle HTTPS connections to your node. We recommend using Caddy, which automatically manages and renews SSL certificates.

### Step 1: Install Caddy

```bash
apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list
apt update
apt install caddy
```

### Step 2: Configure Caddy

Create a Caddyfile with your domain configuration:

```bash
cat >/etc/caddy/Caddyfile <<EOL
{
    https_port 443
}
your-domain.com:443 {
    reverse_proxy http://127.0.0.1:4020 {
        # Forward Host header to the backend
        header_up Host {host}
    }
}
EOL
```

Replace `your-domain.com` with your actual domain name.

### Step 3: Restart Caddy

```bash
systemctl restart caddy
```

## Testing Your Node

### Step 1: Check the Web Interface

Open your domain in a web browser (https://your-domain.com) and wait for the diagnostic to complete. You should see a green checkmark indicating that your node is running correctly.

### Step 2: Check IPv6 Connectivity

Test IPv6 connectivity by visiting:

```
https://your-domain.com/status/check/ipv6
```

### Step 3: Check Service Logs

If you encounter issues, check the service logs:

VM-Supervisor:
```bash
journalctl -f -u aleph-vm-supervisor.service
```

Caddy:
```bash
journalctl -f -u caddy.service
```

VM-Connector:
```bash
docker logs -f vm-connector
```

## Node Registration

After your node is set up and running correctly, you need to register it on the Aleph.im network:

1. Visit the [Node Operator Dashboard](https://account.aleph.im/)
2. Connect your wallet containing ALEPH tokens
3. Follow the registration process, providing your node's domain name
4. Stake the required amount of ALEPH tokens

For detailed registration instructions, refer to the [Node Registration Guide](https://medium.com/aleph-im/step-by-step-on-how-to-create-and-register-your-compute-resource-node-e5308130fbf7).

## Next Steps

After successful setup and registration:

1. Consider enabling [advanced features](/nodes/compute/advanced/enable-confidential/) such as confidential computing
2. Set up [monitoring](/nodes/resources/monitoring/) for your node
3. Learn about [troubleshooting](/nodes/resources/troubleshooting/) common issues

If you encounter any problems during the setup process, don't hesitate to reach out to the community for support.
