# zOS Vouching App

[![CircleCI](https://circleci.com/gh/DeltaCamp/zeppelin-vouching-app.svg?style=svg&circle-token=f48686f5e1d41bf6eab3434461c3da6579bf63ca)](https://circleci.com/gh/DeltaCamp/zeppelin-vouching-app)

The official front end for the Zeppelin OS vouching contracts.  The latest version [is deployed on Netlify](https://zeppelin-vouching-app.netlify.com/)

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

Now you may configure the [ZOS Vouching](https://github.com/zeppelinos/zos-vouching) contract addresses.  The project is already configured with [mock zOS Vouching](https://github.com/DeltaCamp/zos-vouching-mock) Ropsten contract addresses in the file called `networks/3.json`.  To get up and running right away run:

```
$ yarn apply-registry
```

This will generate files that match the Truffle artifact shape for contract network configs.  These files are pulled into the app.  If you want to setup a custom test environment then you follow the custom contract configuration instructions below.

To run the local server, run:

```
$ yarn start
```

To build the production version of the site run:

```
$ yarn build
```

# Configuration

You can configure the app using environment variables:

| Environment Variable Name | Description | Default Value |
| --- | --- | --- |
| REACT_APP_DEFAULT_PROVIDER_URL | Default web3 provider url if not provided by the browser | http://localhost:8545 |
| REACT_APP_ALLOWED_NETWORK_IDS | Network ids that the app recognizes.  We use 1234 as the local network id. | "1234 3" |
| REACT_APP_DEFAULT_NETWORK_NAME | Default network when no Ethereum provider is found. See [Ethers.js](https://docs.ethers.io/ethers.js/html/api-providers.html#connecting-to-ethereum) | ropsten |
| REACT_APP_NEXT_RELEASE_FEATURE_FLAG | Feature flag to show features that are hidden | true |
| REACT_APP_SENTRY_DSN | Optionally configure Sentry (error reporting) | Empty |
| REACT_APP_MIXPANEL_ID | Mixpanel app id | e5f3a0b990d694b84981f493169f47c4 |
| REACT_APP_GA_TRACKING_ID | Optional Google Analytics Tracking ID | No default |

## Custom Contract Addresses

We use [truffle-deploy-registry](https://github.com/MedXProtocol/truffle-deploy-registry) to manage the contract addresses.  TDR merges network config files into Truffle artifacts.  Each network config file stores an array of deployed contracts in chronological order.  The newest addresses for each contract and from each network config are merged into a standard Truffle artifact JSON object.

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

# Updating the Contract ABIs

The Contract ABIs are currently hard-coded into the app.  Only the Vouching contract is used.  Soon we'll be able to reference the official ABIs in the [zos-vouching](https://github.com/zeppelinos/zos-vouching) repository once the project is deployed.

To update the ABI compile the contracts locally then update the file `src/abi/VouchingAbi.js`.

##### Made with :heart: by [Delta Camp](https://delta.camp)
