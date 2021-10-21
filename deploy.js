const HDWalletProvider = require('truffle-hdwallet-provider');  // unlock external wallet
const Web3 = require('web3');   // connection
const { interface, bytecode } = require('./compile');   // getting contract

const provider = new HDWalletProvider(
    'gun wood fancy fitness throw salmon there object hip dad mesh dry',    // account mneumonic
    'https://rinkeby.infura.io/v3/8e3940bb2b5b4d4e919d2c4e6ded279c'     // infura api
);
const web3 = new Web3(provider);    // instance enabled for rinkeby

const deploy = async () => {    // to use async await syntax
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode })
        .send({ gas: '1000000', from: accounts[0] });

    console.log(interface);
    console.log("Contract deployed to", result.options.address);
};
deploy();