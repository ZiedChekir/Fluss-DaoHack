# Introduction

Fluss
A Matchmaking Dapp that connects investment DAOs with entrepreneurs or project owners seeking funding or investment.

# Description 


Our platform is a matching Dapp that connects investment DAOs with entrepreneurs seeking funding for their projects. Entrepreneurs can submit the title, description, address, and image of their project, which will be hosted on IPFS because we feel that decentralization is critical. The project will then be featured on our platform's Explore page for DAO members to review and make investment proposals for their respective DAOs. If the vote passes, we will automate the process of supporting the project with an ongoing supply of funds that will be instantaneous, continuous, and flexible as the project progresses.

# Technical details

The frontend of this project was made feasible by the use of Reactjs. For the Web3 Integration, we used etherjs. The Submit portion uses web3.storage to publish the project details to IPFS, while the Explore section retrieves the project details and displays them on our platform. Members of the DAO can invest in one of the projects and have an automated proposal sent to their DAO. However, due to time constraints, we were unable to incorporate the automatic proposal.

The investment is made in the form of a money stream via the SuperFluid protocol and the constant flow agreement, ensuring a continuous and instantaneous funding flow for the project and giving DAOs the confidence to invest in a wide range of projects while maintaining the right to increase, decrease or modify the money stream according to the project’s progression. We used the budget NFT provided in the SuperFluid examples for this, but we tweaked it to fit our needs.

There are 2 funding streams, an incoming stream from the DAO to our smart contract and an outgoing stream from the smart contract to the project wallet address.

# Achievements 

It is worth mentioning that this project was among winning projects in

 - [Dao Hack by EthGlobal](https://ethglobal.com/showcase/fluss-comdf)
