# Core Channel Node Configuration

This guide explains how to configure your Aleph Cloud Core Channel Node (CCN) for optimal performance and security.

## Configuration File

The main configuration file for a Core Channel Node is located at `~/.aleph/config/config.yml`. This file contains all the settings needed to customize your node's behavior.

## Essential Configuration Options

### Node Identity

```yaml
aleph:
  # Your Ethereum address used for node registration
  ethereum_address: '0x...'
  
  # Private key for message signing (keep this secure!)
  private_key: '0x...'
```

### Network Settings

```yaml
p2p:
  # Port for P2P communication
  port: 4025
  
  # Public IP address of your node (leave empty for auto-detection)
  host: ''
  
  # Bootstrap nodes to connect to
  bootstrap_nodes:
    - '/ip4/51.159.57.71/tcp/4025/p2p/QmZkurbY2G2hWay59yiTgQNaQxHSNzKZFt2jMwuHfda6Kd'
    - '/ip4/51.158.116.142/tcp/4025/p2p/QmaxufiqdLgxCiCHLrFc5Kv7xUUHAxZJEZLfqG87aC3ks'
```

### API Configuration

```yaml
api:
  # Enable/disable the HTTP API
  enabled: true
  
  # API server host (0.0.0.0 to listen on all interfaces)
  host: '0.0.0.0'
  
  # API server port
  port: 4024
  
  # CORS settings
  cors_origin: '*'
```

### Storage Settings

```yaml
storage:
  # Base directory for storage
  folder: '~/.aleph/storage'
  
  # IPFS settings
  ipfs:
    enabled: true
    host: '127.0.0.1'
    port: 5001
```

## Advanced Configuration

### Performance Tuning

```yaml
# Number of workers for processing
workers: 4

# Memory settings
memory:
  # Cache size in MB
  cache_size: 1024
  
  # Sync interval in seconds
  sync_interval: 60
```

### Security Settings

```yaml
security:
  # Enable TLS for API
  use_tls: false
  
  # Path to TLS certificate
  cert_file: '/path/to/cert.pem'
  
  # Path to TLS key
  key_file: '/path/to/key.pem'
```

### Compute Resource Node Connections

```yaml
crn:
  # Maximum number of CRNs to connect (up to 3)
  max_connections: 3
  
  # CRN allocation strategy
  allocation_strategy: 'round_robin'
```

## Sample Complete Configuration

Below is a sample configuration file with common settings:

```yaml
aleph:
  ethereum_address: '0x...'
  private_key: '0x...'

p2p:
  port: 4025
  host: ''
  bootstrap_nodes:
    - '/ip4/51.159.57.71/tcp/4025/p2p/QmZkurbY2G2hWay59yiTgQNaQxHSNzKZFt2jMwuHfda6Kd'
    - '/ip4/51.158.116.142/tcp/4025/p2p/QmaxufiqdLgxCiCHLrFc5Kv7xUUHAxZJEZLfqG87aC3ks'

api:
  enabled: true
  host: '0.0.0.0'
  port: 4024
  cors_origin: '*'

storage:
  folder: '~/.aleph/storage'
  ipfs:
    enabled: true
    host: '127.0.0.1'
    port: 5001

workers: 4

memory:
  cache_size: 1024
  sync_interval: 60

security:
  use_tls: false
  cert_file: ''
  key_file: ''

crn:
  max_connections: 3
  allocation_strategy: 'round_robin'
```

## Applying Configuration Changes

After modifying your configuration file, restart your node to apply the changes:

```bash
sudo systemctl restart aleph-node
```

## Verifying Configuration

To verify that your configuration has been applied correctly:

1. Check the node logs:
   ```bash
   journalctl -u aleph-node -f
   ```

2. Access the API to check node status:
   ```bash
   curl http://localhost:4024/api/v0/status
   ```

## Next Steps

After configuring your Core Channel Node:

1. Set up [Node Backups](/nodes/resources/backups/) to protect your data
2. Implement [Node Monitoring](/nodes/resources/monitoring/) to keep track of performance
3. Connect [Compute Resource Nodes](/nodes/compute/introduction/) to your CCN

If you encounter any issues with your configuration, refer to the [Troubleshooting Guide](/nodes/resources/troubleshooting/) or reach out to the community for support.
