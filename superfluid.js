import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";



  async function createNewFlow(recipient, flowRate) {
    const customHttpProvider = new ethers.providers.InfuraProvider(
        "rinkeby",
        "58cc73c50cef43dfb2af71e6426b4bc7"
      );

    const sf = await Framework.create({
        networkName: "rinkeby",
        provider: customHttpProvider
      });
      
  
    const signer = sf.createSigner({
      privateKey:
        "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
      provider: customHttpProvider
    });
  
    const DAIx = "0xe3cb950cb164a31c66e32c320a800d477019dcff";
  
    try {
      const createFlowOperation = sf.cfaV1.createFlow({
        flowRate: flowRate,
        receiver: recipient,
        superToken: DAIx
        // userData?: string
      });
  
      console.log("Creating your stream...");
  
      const result = await createFlowOperation.exec(signer);
      console.log(result);
  
      console.log(
        `Congrats - you've just created a money stream!
      View Your Stream At: https://app.superfluid.finance/dashboard/${recipient}
      Network: Kovan
      Super Token: DAIx
      Sender: 0xDCB45e4f6762C3D7C61a00e96Fb94ADb7Cf27721
      Receiver: ${recipient},
      FlowRate: ${flowRate}
      `
      );
    } catch (error) {
      console.log(
        "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
      );
      console.error(error);
    }
  }

  createNewFlow("0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",10);