# Roles Microservice

This is a user roles microservice from Pip.Services library. 
It provides basic role-based authorization mechanism for users. 

The microservice currently supports the following deployment options:
* Deployment platforms: Standalone Process, Seneca
* External APIs: HTTP/REST, Seneca
* Persistence: Flat Files, MongoDB

This microservice has no dependencies on other microservices.

<a name="links"></a> Quick Links:

* [Download Links](doc/Downloads.md)
* [Development Guide](doc/Development.md)
* [Configuration Guide](doc/Configuration.md)
* [Deployment Guide](doc/Deployment.md)
* Client SDKs
  - [Node.js SDK](https://github.com/pip-services-users2/client-roles-node)
* Communication Protocols
  - [HTTP Version 1](doc/HttpProtocolV1.md)
  - [Seneca Version 1](doc/SenecaProtocolV1.md)

##  Contract

Logical contract of the microservice is presented below. For physical implementation (HTTP/REST, Thrift, Seneca, Lambda, etc.),
please, refer to documentation of the specific protocol.

```typescript
interface IRolesV1 {
    getRoles(correlationId: string, userId: string): Promise<string[]>;

    setRoles(correlationId: string, userId: string, roles: string[]): Promise<string[]>;

    grantRoles(correlationId: string, userId: string, roles: string[]): Promise<string[]>;


    revokeRoles(correlationId: string, userId: string, roles: string[]): Promise<string[]>;


    authorize(correlationId: string, userId: string, roles: string[]): Promise<boolean>;

}
```

## Download

Right now the only way to get the microservice is to check it out directly from github repository
```bash
git clone git@github.com:pip-services-users2/service-roles-node.git
```

Pip.Service team is working to implement packaging and make stable releases available for your 
as zip downloadable archieves.

## Run

Add **config.yml** file to the root of the microservice folder and set configuration parameters.
As the starting point you can use example configuration from **config.example.yml** file. 

Example of microservice configuration
```yaml
---
- descriptor: "service-commons:logger:console:default:1.0"
  level: "trace"

- descriptor: "service-roles:persistence:file:default:1.0"
  path: "./data/roles.json"

- descriptor: "service-roles:controller:default:default:1.0"

- descriptor: "service-roles:service:commandable-http:default:1.0"
  connection:
    protocol: "http"
    host: "0.0.0.0"
    port: 8080
```
 
For more information on the microservice configuration see [Configuration Guide](Configuration.md).

Start the microservice using the command:
```bash
node run
```

## Use

The easiest way to work with the microservice is to use client SDK. 
The complete list of available client SDKs for different languages is listed in the [Quick Links](#links)

If you use Node.js then you should add dependency to the client SDK into **package.json** file of your project
```javascript
{
    ...
    "dependencies": {
        ....
        "client-roles-node": "^1.0.*",
        ...
    }
}
```

Inside your code get the reference to the client SDK
```javascript
var sdk = new require('client-roles-node');
```

Define client configuration parameters that match configuration of the microservice external API
```javascript
// Client configuration
var config = {
    connection: {
        protocol: 'http',
        host: 'localhost', 
        port: 8080
    }
};
```

Instantiate the client and open connection to the microservice
```javascript
// Create the client instance
var client = sdk.RolesHttpClientV1(config);

// Connect to the microservice
// Connect to the microservice
try {
    await client.open(null);
    
    // Work with the microservice
    ...
}
catch (err) {
    console.error('Connection to the microservice failed');
    console.error(err);
}
```

Now the client is ready to perform operations
```javascript
// Grant user a role
let result = await client.grantRoles(
    null,
    '123',
    ['admin'],
);
```

```javascript
// Authorize user
let authorized = await client.authorize(
    null,
    '123',
    ['admin'],
);
```    

## Acknowledgements

This microservice was created and currently maintained by *Sergey Seroukhov*.

