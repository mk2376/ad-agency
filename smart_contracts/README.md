# Smart Contracts

## Migration

In order to publish the smart contracts please run:

```
truffle migrate --reset
```

## Dependencies

After the smart contracts are published please update dependencies (smart contract addresses):

-   **ad_agency/client_script/script.js**
-   **ad_agency/dapp/constants/ethConstants.js**

## Advertisements Smart Contract

The **Advertisements** contract is a Solidity smart contract that manages advertisements. It allows users to submit advertisements, retrieve advertisement data, update advertisement information, and close advertisements while splitting the rewards among participants.

## Websites Smart Contract

The **Websites** contract is a Solidity smart contract that manages websites. It allows users to submit websites and retrieve website data.
