# Other Languages

While Aleph Cloud provides official SDKs for [TypeScript](/devhub/sdks/typescript/) and [Python](/devhub/sdks/python/), the community has developed integrations for other programming languages. This page documents these community-supported SDKs and provides guidance on using Aleph Cloud with languages that don't yet have dedicated SDKs.

## Community SDKs

### Go

The Go SDK for Aleph Cloud provides a way to interact with the Aleph Cloud network from Go applications.

#### Installation

```bash
go get github.com/aleph-cloud/go-aleph
```

#### Basic Usage

```go
package main

import (
    "fmt"
    "context"
    "github.com/aleph-cloud/go-aleph/client"
)

func main() {
    // Create a new client
    aleph := client.NewClient(client.DefaultOptions())
    
    // Get a message by hash
    ctx := context.Background()
    message, err := aleph.GetMessage(ctx, "QmHash123")
    if err != nil {
        fmt.Printf("Error: %v\n", err)
        return
    }
    
    fmt.Printf("Message content: %v\n", message.Content)
}
```

#### Authentication

```go
package main

import (
    "fmt"
    "context"
    "github.com/aleph-im/go-aleph/client"
    "github.com/aleph-im/go-aleph/account"
)

func main() {
    // Create an account from a private key
    privateKey := "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
    acc, err := account.NewEthereumAccount(privateKey)
    if err != nil {
        fmt.Printf("Error creating account: %v\n", err)
        return
    }
    
    // Create a client with the account
    opts := client.DefaultOptions()
    opts.Account = acc
    aleph := client.NewClient(opts)
    
    // Store a message
    ctx := context.Background()
    result, err := aleph.Store(ctx, "Hello from Go!", []string{"example", "go"})
    if err != nil {
        fmt.Printf("Error storing message: %v\n", err)
        return
    }
    
    fmt.Printf("Stored message with hash: %s\n", result.ItemHash)
}
```

#### Resources

- [GitHub Repository](https://github.com/aleph-im/go-aleph)
- [Documentation](https://pkg.go.dev/github.com/aleph-im/go-aleph)

### Rust

The Rust SDK for Aleph.im provides a way to interact with the Aleph.im network from Rust applications.

#### Installation

Add the following to your `Cargo.toml`:

```toml
[dependencies]
aleph-rs = "0.1.0"
```

#### Basic Usage

```rust
use aleph_rs::{Client, ClientOptions};
use tokio;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Create a new client
    let client = Client::new(ClientOptions::default());
    
    // Get a message by hash
    let message = client.get_message("QmHash123").await?;
    println!("Message content: {:?}", message.content);
    
    Ok(())
}
```

#### Authentication

```rust
use aleph_rs::{Client, ClientOptions, Account};
use tokio;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Create an account from a private key
    let private_key = "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";
    let account = Account::from_ethereum_private_key(private_key)?;
    
    // Create a client with the account
    let mut options = ClientOptions::default();
    options.account = Some(account);
    let client = Client::new(options);
    
    // Store a message
    let result = client.store("Hello from Rust!", &["example", "rust"]).await?;
    println!("Stored message with hash: {}", result.item_hash);
    
    Ok(())
}
```

#### Resources

- [GitHub Repository](https://github.com/aleph-im/aleph-rs)
- [Documentation](https://docs.rs/aleph-rs)

### Java

The Java SDK for Aleph.im provides a way to interact with the Aleph.im network from Java applications.

#### Installation

Add the following to your Maven `pom.xml`:

```xml
<dependency>
    <groupId>im.aleph</groupId>
    <artifactId>aleph-java</artifactId>
    <version>0.1.0</version>
</dependency>
```

Or to your Gradle build file:

```groovy
implementation 'im.aleph:aleph-java:0.1.0'
```

#### Basic Usage

```java
import im.aleph.AlephClient;
import im.aleph.model.Message;

public class AlephExample {
    public static void main(String[] args) {
        // Create a new client
        AlephClient client = new AlephClient();
        
        // Get a message by hash
        try {
            Message message = client.getMessage("QmHash123");
            System.out.println("Message content: " + message.getContent());
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
}
```

#### Authentication

```java
import im.aleph.AlephClient;
import im.aleph.account.EthereumAccount;
import im.aleph.model.StoreResult;

public class AlephAuthExample {
    public static void main(String[] args) {
        // Create an account from a private key
        String privateKey = "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";
        try {
            EthereumAccount account = new EthereumAccount(privateKey);
            
            // Create a client with the account
            AlephClient client = new AlephClient(account);
            
            // Store a message
            String[] tags = {"example", "java"};
            StoreResult result = client.store("Hello from Java!", tags);
            System.out.println("Stored message with hash: " + result.getItemHash());
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
}
```

#### Resources

- [GitHub Repository](https://github.com/aleph-im/aleph-java)
- [Documentation](https://aleph-im.github.io/aleph-java/)

## Using the REST API Directly

For languages without a dedicated SDK, you can interact with Aleph.im using the REST API directly.

### Basic HTTP Requests

Most programming languages have libraries for making HTTP requests. Here's how to use the Aleph.im API with common HTTP libraries:

#### Ruby

```ruby
require 'net/http'
require 'json'

# Get a message by hash
def get_message(item_hash)
  uri = URI("https://api2.aleph.im/api/v0/messages/#{item_hash}")
  response = Net::HTTP.get_response(uri)
  
  if response.code == '200'
    JSON.parse(response.body)
  else
    raise "Error: #{response.code} - #{response.body}"
  end
end

# Query messages by tags
def query_messages(tags, limit = 10)
  uri = URI('https://api2.aleph.im/api/v0/messages')
  params = {
    'tags' => tags.join(','),
    'limit' => limit
  }
  uri.query = URI.encode_www_form(params)
  
  response = Net::HTTP.get_response(uri)
  
  if response.code == '200'
    JSON.parse(response.body)
  else
    raise "Error: #{response.code} - #{response.body}"
  end
end

# Example usage
begin
  message = get_message('QmHash123')
  puts "Message content: #{message['content']}"
  
  messages = query_messages(['example', 'ruby'], 5)
  messages.each do |msg|
    puts "#{msg['item_hash']}: #{msg['content']}"
  end
rescue => e
  puts e.message
end
```

#### PHP

```php
<?php

// Get a message by hash
function getMessage($itemHash) {
    $url = "https://api2.aleph.im/api/v0/messages/{$itemHash}";
    $response = file_get_contents($url);
    
    if ($response === false) {
        throw new Exception("Error fetching message");
    }
    
    return json_decode($response, true);
}

// Query messages by tags
function queryMessages($tags, $limit = 10) {
    $tagsString = implode(',', $tags);
    $url = "https://api2.aleph.im/api/v0/messages?tags={$tagsString}&limit={$limit}";
    $response = file_get_contents($url);
    
    if ($response === false) {
        throw new Exception("Error querying messages");
    }
    
    return json_decode($response, true);
}

// Example usage
try {
    $message = getMessage('QmHash123');
    echo "Message content: " . json_encode($message['content']) . "\n";
    
    $messages = queryMessages(['example', 'php'], 5);
    foreach ($messages as $msg) {
        echo "{$msg['item_hash']}: " . json_encode($msg['content']) . "\n";
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
```

#### C#

```csharp
using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text.Json;

class AlephApi
{
    private static readonly HttpClient client = new HttpClient();
    
    // Get a message by hash
    public static async Task<JsonElement> GetMessage(string itemHash)
    {
        string url = $"https://api2.aleph.im/api/v0/messages/{itemHash}";
        HttpResponseMessage response = await client.GetAsync(url);
        
        response.EnsureSuccessStatusCode();
        string responseBody = await response.Content.ReadAsStringAsync();
        
        return JsonDocument.Parse(responseBody).RootElement;
    }
    
    // Query messages by tags
    public static async Task<JsonElement> QueryMessages(string[] tags, int limit = 10)
    {
        string tagsString = string.Join(",", tags);
        string url = $"https://api2.aleph.im/api/v0/messages?tags={tagsString}&limit={limit}";
        HttpResponseMessage response = await client.GetAsync(url);
        
        response.EnsureSuccessStatusCode();
        string responseBody = await response.Content.ReadAsStringAsync();
        
        return JsonDocument.Parse(responseBody).RootElement;
    }
    
    // Example usage
    public static async Task Main()
    {
        try
        {
            var message = await GetMessage("QmHash123");
            Console.WriteLine($"Message content: {message.GetProperty("content")}");
            
            var messages = await QueryMessages(new[] { "example", "csharp" }, 5);
            foreach (var msg in messages.EnumerateArray())
            {
                Console.WriteLine($"{msg.GetProperty("item_hash")}: {msg.GetProperty("content")}");
            }
        }
        catch (Exception e)
        {
            Console.WriteLine($"Error: {e.Message}");
        }
    }
}
```

### Authentication with the REST API

For operations that require authentication (like storing data), you need to sign your requests. Here's a general approach:

1. Generate a message to sign
2. Sign the message with your private key
3. Include the signature and public key/address in your request

The specific implementation depends on the cryptographic libraries available in your language. Here's a conceptual example:

```
1. Create a JSON object with your message data
2. Add a timestamp and a nonce for uniqueness
3. Serialize the object to a string
4. Sign the string with your private key
5. Send the original data along with the signature and your address
```

For detailed examples of authentication with specific languages, refer to the [REST API documentation](/devhub/api/rest/).

## Building Your Own SDK

If you're interested in building an SDK for a language not currently supported, here are some guidelines:

1. **Start with the API Documentation**: Understand the [REST API](/devhub/api/rest/) endpoints and parameters
2. **Implement Core Functionality First**: Focus on basic operations like getting and storing messages
3. **Add Authentication Support**: Implement signing mechanisms for the supported chains
4. **Add Higher-Level Abstractions**: Build convenience methods for common operations
5. **Document Your SDK**: Provide clear documentation and examples
6. **Contribute to the Community**: Share your SDK with the Aleph.im community

The Aleph.im team is happy to provide guidance and support for community SDK development. Join the [Aleph.im Discord](https://discord.gg/alephim) to connect with the team and other developers.

## Resources

- [REST API Documentation](/devhub/api/rest/)
- [GraphQL API Documentation](/devhub/api/graphql/)
- [TypeScript SDK Source](https://github.com/aleph-im/aleph-sdk) (reference implementation)
- [Python SDK Source](https://github.com/aleph-im/aleph-client) (reference implementation)
