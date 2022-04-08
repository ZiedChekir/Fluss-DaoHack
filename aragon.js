import pkg from '@1hive/evmcrispr';
import {ethers } from "ethers";
const { EVMcrispr, evmcl } = pkg;
// const provider = new ethers.providers.Web3Provider(window.ethereum)
const provider = new ethers.providers.JsonRpcProvider();
//const signer = provider.getSigner();
const signer = provider.getSigner();
 //const signer = (await ethers.getSigners())[0];
const daoAddress = "0x2ec24463ed9BC8122F2b19b313AD8F8d0E99CBB7";


const evmcrispr = await EVMcrispr.create(signer, daoAddress);




await evmcrispr.forward(
    evmcl`
      install wrapped-hooked-token-manager.open:membership-tm ${token} false 0
      install voting:membership-voting ${token} ${suppPct} ${minQuorumPct} ${voteTime}
      grant ANY_ENTITY voting:membership-voting CREATE_VOTES_ROLE
      grant voting:membership-voting wrapped-hooked-token-manager.open:membership-tm MINT_ROLE
      grant voting:membership-voting wrapped-hooked-token-manager.open:membership-tm BURN_ROLE
      exec wrapped-hooked-token-manager.open:membership-tm mint ${address} 2e18
    `,
    ["token-manager:1", "voting"]
  );