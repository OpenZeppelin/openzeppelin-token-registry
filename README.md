# Delta Camp Skeleton Dapp

### Setup

Start by installing node_modules via yarn:

`$ yarn`

Link the contracts package in the other folder on your machine. For instance,
if the contracts live in '~/Git/my-contracts':

`$ cd ~/Git/my-contracts && yarn link` (NOTE: the package.json name should match the directory name)

Then in this dapp directory:

`$ yarn link my-contracts`

This project uses ZeppelinOS. Make sure you have compiled and deployed the contracts
you would like to use (in the linked directory) and manually copy over the
proxy contract addresses (found at the bottom of 'my-contracts/zos.dev-1234.json')
to your networks/1234.json file. Then run:

`$ yarn run update-local`

### Running the Webpack Dev Server

`$ yarn start`

### Testing the DApp Components & Services

`$ yarn test`
