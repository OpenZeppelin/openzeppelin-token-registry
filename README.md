# zOS Vouching App

The official front end for the Zeppelin OS vouching contracts.

To run the project against a local node you can use the [zos-vouching-mock](https://github.com/DeltaCamp/zos-vouching-mock).  The mock project allows you to easily bootstrap a local Ganache instance with test data so that you can develop the app locally.

# Setup

Install dependencies:

```
$ yarn
```

Make sure you have `direnv` installed and copy `.envrc.example` to `.envrc`:

```
$ cp .envrc.example .envrc
$ direnv allow
```

## Contract Addresses

We use [truffle-deploy-registry](https://github.com/MedXProtocol/truffle-deploy-registry) to manage the contract addresses.  TDR merges network config files into Truffle artifacts.  The network config files record deployed contracts (newest at the bottom).  The newest addresses are merged into a standard Truffle artifact JSON object.

Create a network config for the contracts deployed to the [zos-vouching-mock](https://github.com/DeltaCamp/zos-vouching-mock).  The network id for the `zos-vouching-mock` ganache-cli node is 1234, so create a file like so:

`networks/1234.json`

```json
[
  {
    "contractName": "ZepToken",
    "address": "0x1111111111111111111111111111111111111111"
  },
  {
    "contractName": "Vouching",
    "address": "0x2222222222222222222222222222222222222222"
  }
]
```

Make sure to replace the above addresses with the actual addresses in the generated zos config file `zos.dev-1234.json` in the zos-vouching-mock project directory.

Now generate the Truffle artifacts to be included in the build:

```
$ yarn apply-registry
```

This will generate Truffle-compatible artifacts in the `build/contracts` directory.

# Running

Run the local server:

```
$ yarn start
```

# Building

To build the site run:

```
$ yarn build
```

# Configuration

You can configure the app using environment variables:

| Environment Variable Name | Description | Default Value |
| --- | --- | --- |
| REACT_APP_DEFAULT_PROVIDER_URL | Configures the default web3 provider url if not provided by the browser | http://localhost:8545 |
| REACT_APP_METADATA_URI | Configures the hostname for metadata URI paths (may not be needed in production) | http://localhost:3000 |
