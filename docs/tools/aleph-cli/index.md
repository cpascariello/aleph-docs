# Aleph Cloud Client

The Aleph Cloud Client is a command-line interface (CLI) tool that allows you to interact with the Aleph Cloud network directly from your terminal. It provides a comprehensive set of commands for managing resources, deploying applications, and accessing Aleph Cloud services.

## Installation

### Using pip (Python Package Manager)

```bash
pip install aleph-client
```

### Using Docker

```bash
docker pull alephim/aleph-client
```

## Basic Usage

Once installed, you can use the `aleph` command to interact with the Aleph Cloud network:

```bash
aleph --help
```

This will display a list of available commands and options.

## Authentication

Before using most commands, you'll need to authenticate with the Aleph Cloud network:

```bash
aleph login
```

This will guide you through the process of creating or importing an account.

## Common Commands

### Managing Files

```bash
# Upload a file
aleph file upload myfile.txt

# List your files
aleph file list

# Download a file
aleph file download <file_hash> --output downloaded_file.txt
```

### Managing Instances (VMs)

```bash
# Create a new instance
aleph instance create --name my-instance --cpu 2 --memory 4 --disk 20 --image debian:11 --ssh-key "ssh-rsa AAAA..."

# List your instances
aleph instance list

# Get instance details
aleph instance status <instance_hash>

# Stop an instance
aleph instance stop <instance_hash>

# Start an instance
aleph instance start <instance_hash>
```

### Managing Programs (FaaS)

```bash
# Deploy a program
aleph program deploy --name my-function --runtime nodejs16 --file function.js

# List your programs
aleph program list

# Call a program
aleph program call <program_hash> --data '{"key": "value"}'
```

### Managing Volumes

```bash
# Create a volume
aleph volume create --name my-volume --size 50

# List your volumes
aleph volume list

# Delete a volume
aleph volume delete <volume_hash>
```

## Configuration

The Aleph Cloud Client can be configured using a configuration file or environment variables:

### Configuration File

Create a file at `~/.aleph/config.yml`:

```yaml
api_server: https://api2.aleph.im
private_key: your_private_key_here
```

### Environment Variables

```bash
export ALEPH_API_SERVER=https://api2.aleph.im
export ALEPH_PRIVATE_KEY=your_private_key_here
```

## Advanced Usage

### Using with Docker

If you're using the Docker image, you can run commands like this:

```bash
docker run -it --rm -v $(pwd):/data alephim/aleph-client file upload /data/myfile.txt
```

### Scripting

The Aleph Cloud Client can be used in shell scripts for automation:

```bash
#!/bin/bash
# Example script to deploy a web server

# Upload web files
FILE_HASH=$(aleph file upload ./website.tar.gz --output hash-only)

# Deploy instance with cloud-init to set up web server
INSTANCE_HASH=$(aleph instance create \
  --name "web-server" \
  --cpu 2 \
  --memory 4 \
  --disk 20 \
  --image debian:11 \
  --ssh-key "$(cat ~/.ssh/id_rsa.pub)" \
  --allowed-ports 22,80,443 \
  --cloud-init "$(cat ./web-server-init.yml)" \
  --output hash-only)

echo "Web server deployed with hash: $INSTANCE_HASH"
```

## Troubleshooting

If you encounter issues with the Aleph Cloud Client:

1. Ensure you're using the latest version:
   ```bash
   pip install --upgrade aleph-client
   ```

2. Check your network connection and API server availability:
   ```bash
   curl https://api2.aleph.im/api/v0/info
   ```

3. Verify your authentication credentials are correct:
   ```bash
   aleph account info
   ```

## Next Steps

- [Web Console](/tools/webconsole/) - A graphical interface for managing Aleph Cloud resources
- [API Reference](/devhub/api/rest/) - Documentation for the Aleph Cloud REST API
- [SDK Documentation](/devhub/sdks/python/) - Learn how to use the Python SDK for programmatic access
