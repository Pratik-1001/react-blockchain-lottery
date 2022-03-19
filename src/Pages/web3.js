import Web3 from 'web3';

//Current Provider
//window.web3 - copy of web3 coming from the metamask library 

// Deprecated Version
// const web3 = new Web3(window.web3.currentProvider);

//New Version 
window.ethereum.request({method: "eth_requestAccounts"});

const web3=new Web3(window.ethereum);

export default web3;