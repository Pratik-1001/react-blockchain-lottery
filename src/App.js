import logo from "./bp32PizJ.png";
import "./App.css";
import React from "react";
import web3 from './Pages/web3';
import lottery from "./Pages/lottery";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);


class App extends React.Component {
  constructor(){
    super();
    this.state={
      balance:'',
      myWalletBalc:'',
      Players:[],
      accounts:[],
      amtToPay:null
    }
  }

  componentDidMount(){
    this.myfunc();
    setInterval(()=>{
      let CWallet=0;
      let MWallet=0;
      
      web3.eth.getBalance(lottery._address)
              .then((res)=>{
                CWallet=web3.utils.fromWei(res,'ether');
              console.log(res);
              this.setState({...this.state,balance:res});
            })
      web3.eth.getBalance(this.state.accounts[0])
              .then((res)=>{
                MWallet=web3.utils.fromWei(res,'ether');
                console.log(res)
                this.setState({...this.state,myWalletBalc:res});
              })
    
    
    },3000)
  }
  myfunc=async()=>{
    const accounts = await web3.eth.getAccounts();
    // .then((res)=>{
      console.log(lottery.methods)
    // });
    const Players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery._address);
    const myWalletBalc = await web3.eth.getBalance(accounts[0]);
    this.setState({balance, Players, accounts,myWalletBalc})
    // var t=await lottery.methods.manager().call();
    // console.log(t)
  }


  sendEther=async (e)=>{
    e.preventDefault();
    const sendCoins = await lottery.methods.joinGame().send({
      from:this.state.accounts[0],
      value:web3.utils.toWei(this.state.amtToPay,'ether')
    });

    // const balance = await web3.eth.getBalance(lottery._address);
    // this.setState({...this.state,balance})
    
    
    console.log(sendCoins)
  }
  SelectWinner=async(e)=>{
    e.preventDefault();
     const w = await lottery.methods.selectWinner().send({
       from:this.state.accounts[0]
     });
     console.log('w --- ',w)
  }
  render() {
    
    console.log(this.state)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"  style={{width:'8rem',height:'10rem'}}/>
          <p>
            <code><span className="text-white">Contract Wallet: </span><span className={web3.utils.fromWei(this.state.balance, 'ether') ==0? 'danger':'safe'}>{web3.utils.fromWei(this.state.balance, 'ether')}</span> <span className="text-info">Ether</span></code>
          </p>
            <div className="root-form-box">
              <form>
              <div className="row">
                <div className="col-md-12 d-flex justify-content-center">
                  <div className="walletForm">
                      <div className="row">
                          <div className="col-md-12 ">
                            <code><span className="text-white">My Wallet Balance:</span> <span className={web3.utils.fromWei(this.state.myWalletBalc, 'ether') ==0? 'danger':'safe'}>{web3.utils.fromWei(this.state.myWalletBalc,'ether')}</span> <span className="text-info">Ether</span></code>
                          </div>
                      </div>
                      <div className="row">
                          <div className="col-md-6">
                            <code className="text-white">Ether to Send</code>
                          </div>
                          <div className="col-md-6">
                              <input placeholder="Enter Ether" value={this.state.amtToPay} onChange={(e)=>this.setState({...this.state,amtToPay:e.target.value})} className="form-control" ></input>
                          </div>
                      </div>
                      <div className="row mt-2">
                          <div className="col-md-12">
                          &nbsp;&nbsp;
                              <button onClick={this.sendEther}
                              className="btn btn-success" style={{float:'right',marginLeft:'1rem'}}>Send</button> &nbsp;&nbsp;
                              <button 
                              onClick={this.SelectWinner}
                              className="btn btn-warning" style={{float:'right'}}>Pick a Winner</button>&nbsp;&nbsp;
                          </div>
                      </div>
                  </div>
                </div>
              </div>
            </form>
            </div>
        </header>
      </div>
    );
  }
}
export default App;
