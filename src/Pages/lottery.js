import web3 from './web3';

const address = '0x004BCD56a83Ef0319bFf1Ae1BCDc68777b7Da1f0';

const abi = [
    {
        "constant":false,
        "inputs":[],
        "name":"selectWinner",
        "outputs":[],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
    },{
        "constant":true,
        "inputs":[],
        "name":"getPlayers",
        "outputs":[
            {
                "name":"",
                "type":"address[]"
            }
        ],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },{
        "constant":false,
        "inputs":[],
        "name":"joinGame",
        "outputs":[],
        "payable":true,
        "stateMutability":"payable",
        "type":"function"
    },{
        "inputs":[],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"constructor"
    }
]

export default new web3.eth.Contract(abi,address);