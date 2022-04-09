import React, { useState, useEffect } from "react";
import { Framework } from "@superfluid-finance/sdk-core";
import {
    Button,
    Form,
    FormGroup,
    FormControl,
    Spinner,
    Card
} from "react-bootstrap";
import { ethers } from "ethers";
import { EVMcrispr, evmcl } from '@1hive/evmcrispr';



async function aragon() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();
   // const daoAddress = "0x2ec24463ed9BC8122F2b19b313AD8F8d0E99CBB7";
    const daoAddress = "daohacka.aragonid.eth";
    const evmcrispr = await EVMcrispr.create(daoAddress,signer );

    const txReceipt = await evmcrispr.forward(
        commonsUpgradeActionFns,
        ["disputable-voting.open"],
        { context: "Commons Upgrade" }
      );
}

async function test(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const sf = await Framework.create({
        // chainId: "42",//Number(chainId),
        networkName: "kovan",

        provider: provider
    });
    const ethx = "0xdd5462a7db7856c9128bc77bd65c2919ee23c6e1"
    console.log(" host is "+ sf.settings.config.hostAddress)
    console.log("cfa adress "+ sf.settings.config.cfaV1Address);
    

}



//act/0xbfaf8dd2ce6467efcb52f7f45f34d789026c1a6a/0xB50206e1Ff3Fc81A973Ef87F72eB08F2b326E568/store(uint256: 4)

// let account;

//where the Superfluid logic takes place
async function createNewFlow(recipient, flowRate) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    //const provider = new ethers.providers.JsonRpcProvider("https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");

    const signer = provider.getSigner();
    console.log(signer)
    //const chainId = await window.ethereum.request({ method: "eth_chainId" });
    const sf = await Framework.create({
        // chainId: "42",//Number(chainId),
        networkName: "kovan",

        provider: provider
    });

    const DAIx = "0xe3cb950cb164a31c66e32c320a800d477019dcff";
    const ETHx = "0xdd5462a7db7856c9128bc77bd65c2919ee23c6e1"

    try {
        const createFlowOperation = sf.cfaV1.createFlow({
            receiver: recipient,
            flowRate: flowRate,
            superToken: ETHx
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
        console.error(error.message);
    }
}
async function issueNFT(){
    const StreamFundAdress = "0xB5458B55989aC4221415DbFC6017798086fC9Eb4";
    const ABI = [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_symbol",
                    "type": "string"
                },
                {
                    "internalType": "contract ISuperfluid",
                    "name": "host",
                    "type": "address"
                },
                {
                    "internalType": "contract IConstantFlowAgreementV1",
                    "name": "cfa",
                    "type": "address"
                },
                {
                    "internalType": "contract ISuperToken",
                    "name": "acceptedToken",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "approved",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "bool",
                    "name": "approved",
                    "type": "bool"
                }
            ],
            "name": "ApprovalForAll",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "burnNFT",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "internalType": "int96",
                    "name": "flowRate",
                    "type": "int96"
                }
            ],
            "name": "editNFT",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "receiver",
                    "type": "address"
                },
                {
                    "internalType": "int96",
                    "name": "flowRate",
                    "type": "int96"
                }
            ],
            "name": "issueNFT",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId1",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId2",
                    "type": "uint256"
                }
            ],
            "name": "mergeStreams",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "receiver",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "int96",
                    "name": "flowRate",
                    "type": "int96"
                }
            ],
            "name": "NFTIssued",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "safeTransferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
                    "name": "_data",
                    "type": "bytes"
                }
            ],
            "name": "safeTransferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "approved",
                    "type": "bool"
                }
            ],
            "name": "setApprovalForAll",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "internalType": "int96",
                    "name": "newTokenFlowRate",
                    "type": "int96"
                }
            ],
            "name": "splitStream",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "_acceptedToken",
            "outputs": [
                {
                    "internalType": "contract ISuperToken",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "cfaV1",
            "outputs": [
                {
                    "internalType": "contract ISuperfluid",
                    "name": "host",
                    "type": "address"
                },
                {
                    "internalType": "contract IConstantFlowAgreementV1",
                    "name": "cfa",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "flowRates",
            "outputs": [
                {
                    "internalType": "int96",
                    "name": "",
                    "type": "int96"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "getApproved",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                }
            ],
            "name": "isApprovedForAll",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "nextId",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "ownerOf",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes4",
                    "name": "interfaceId",
                    "type": "bytes4"
                }
            ],
            "name": "supportsInterface",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "tokenURI",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];
    const ProjectToFundAdress ="0xbAA9bD36EE2c8AaC31cFAf137B1dFaA77caF1e63";
    const flowRate = 10;
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    console.log(signer);
    const contract = new ethers.Contract(StreamFundAdress,ABI,signer)
    

    const tx = await contract.issueNFT(ProjectToFundAdress,flowRate);
    console.log("hii")
    await tx.wait();
    
//     const nonce  = await provider.getTransactionCount("ricmoo.eth",'latest');

//     const txObject = {
//         to: StreamFundAdress,
// 		nonce: nonce, 
// 		gasLimit: ethers.BigNumber.from('150000'),
//         data: transaction,
// 	};
    

// const signedTx = await signer.signTransaction(txObject);
// const sendTx = await signer.sendTransaction(signedTx, function(error, hash) {
//     if (!error) {
//       console.log("🎉 The hash of your transaction is: ", hash, "\n Check Alchemy's Mempool to view the status of your transaction!");
//     } else {
//       console.log("❗Something went wrong while submitting your transaction:", error)
//     }
//    });
}


export const CreateFlow = () => {
    const [recipient, setRecipient] = useState("");
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const [flowRate, setFlowRate] = useState("");
    const [flowRateDisplay, setFlowRateDisplay] = useState("");
    const [currentAccount, setCurrentAccount] = useState("");

    const connectWallet = async () => {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                alert("Get MetaMask!");
                return;
            }
            const accounts = await ethereum.request({
                method: "eth_requestAccounts"
            });
            console.log("Connected", accounts[0]);
            setCurrentAccount(accounts[0]);
            // let account = currentAccount;
            // Setup listener! This is for the case where a user comes to our site
            // and connected their wallet for the first time.
            // setupEventListener()
        } catch (error) {
            console.log(error);
        }
    };

    const checkIfWalletIsConnected = async () => {
        const { ethereum } = window;

        if (!ethereum) {
            console.log("Make sure you have metamask!");
            return;
        } else {
            console.log("We have the ethereum object", ethereum);
        }

        const accounts = await ethereum.request({ method: "eth_accounts" });
        const chain = await window.ethereum.request({ method: "eth_chainId" });
        let chainId = chain;
        console.log("chain ID:", chain);
        console.log("global Chain Id:", chainId);
        if (accounts.length !== 0) {
            const account = accounts[0];
            console.log("Found an authorized account:", account);
            setCurrentAccount(account);
            // Setup listener! This is for the case where a user comes to our site
            // and ALREADY had their wallet connected + authorized.
            // setupEventListener()
        } else {
            console.log("No authorized account found");
        }
    };

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    function calculateFlowRate(amount) {
        if (typeof Number(amount) !== "number" || isNaN(Number(amount)) === true) {
            alert("You can only calculate a flowRate based on a number");
            return;
        } else if (typeof Number(amount) === "number") {
            if (Number(amount) === 0) {
                return 0;
            }
            const amountInWei = ethers.BigNumber.from(amount);
            const monthlyAmount = ethers.utils.formatEther(amountInWei.toString());
            const calculatedFlowRate = monthlyAmount * 3600 * 24 * 30;
            return calculatedFlowRate;
        }
    }

    function CreateButton({ isLoading, children, ...props }) {
        return (
            <Button variant="success" className="button" {...props}>
                {isButtonLoading ? <Spinner animation="border" /> : children}
            </Button>
        );
    }

    const handleRecipientChange = (e) => {
        setRecipient(() => ([e.target.name] = e.target.value));
    };

    const handleFlowRateChange = (e) => {
        setFlowRate(() => ([e.target.name] = e.target.value));
        let newFlowRateDisplay = calculateFlowRate(e.target.value);
        setFlowRateDisplay(newFlowRateDisplay.toString());
    };

    return (
        <div>
            <h2>Create a Flow</h2>
            {currentAccount === "" ? (
                <button id="connectWallet" className="button" onClick={connectWallet}>
                    Connect Wallet
                </button>
            ) : (
                <Card className="connectedWallet">
                    {`${currentAccount.substring(0, 4)}...${currentAccount.substring(
                        38
                    )}`}
                </Card>
            )}
            <Form>
                <FormGroup className="mb-3">
                    <FormControl
                        name="recipient"
                        value={recipient}
                        onChange={handleRecipientChange}
                        placeholder="Enter recipient address"
                    ></FormControl>
                </FormGroup>
                <FormGroup className="mb-3">
                    <FormControl
                        name="flowRate"
                        value={flowRate}
                        onChange={handleFlowRateChange}
                        placeholder="Enter a flowRate in wei/second"
                    ></FormControl>
                </FormGroup>
                <CreateButton
                    onClick={() => {
                        setIsButtonLoading(true);
                        createNewFlow(recipient, flowRate);
                        setTimeout(() => {
                            setIsButtonLoading(false);
                        }, 1000);
                    }}
                >
                    Click to Create Your Stream
                </CreateButton>

                <CreateButton
                    onClick={() => {
                        setIsButtonLoading(true);
                        aragon();
                        setTimeout(() => {
                            setIsButtonLoading(false);
                        }, 1000);
                    }}
                >
                    Aragon
                </CreateButton>
            </Form>

            <div className="description">
                <p>
                    Go to the CreateFlow.js component and look at the <b>createFlow() </b>
                    function to see under the hood
                </p>
                <div className="calculation">
                    <p>Your flow will be equal to:</p>
                    <p>
                        <b>${flowRateDisplay !== " " ? flowRateDisplay : 0}</b> DAIx/month
                    </p>
                </div>
            </div>
        </div>
    );
};



