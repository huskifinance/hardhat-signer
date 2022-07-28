# Hardhat Hd Wallet Signer

This plugin signs Ethereum transaction using hd wallet key during deployments.

## Usage

It's assumed that you have hd wallet access configured and your role perform eth_sendTransaction using hd key.

In `hardhat.config.ts` do:

```
import "@aiethlab/hardhat-signer";

...

const config: HardhatUserConfig = {
  networks: {
    ropsten: {
      url: `https://ropsten.infura.io/v3/${process.env.INFURA_KEY}`,
      hdSigner: 'trezor',
      address: '0x********',
    }
  }
}
```

### Learn your address

```
$ node_modules/.bin/hardhat console --network ropsten
Creating Typechain artifacts in directory types for target ethers-v5
Successfully generated Typechain artifacts!
Welcome to Node.js v12.22.6.
> getNamedAccounts().then(console.log)
Promise { <pending> }
> { deployer: '0x541dD0eC22fB1213d2C2B1fc83B5F302cEFF79A2' }
```

Remember to fund your address with some ETH before deploying.
