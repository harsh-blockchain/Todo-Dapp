import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import TodoList from '../components/TodoList'
import WalletButton from '../components/walletButton'
import WrongNetwork from '../components/WrongNetwork'
import { ContractABI, ContractAddress } from '../config'
import { ethers } from 'ethers'



const index = () => {

  const [correctNetwork, setCorrectNetwork] = useState(false);
  const [account, setAccount] = useState('');
  const [input, setInput] = useState('');
  const [tasks, setTasks] = useState([]);


  const connectWallet = async () => {
    try{

      const { ethereum } = window

      if(!ethereum) {
        alert('Get MetaMask!')
        return
      }

      const accounts = await ethereum.request({method: 'eth_requestAccounts'});
      const account = accounts[0];
      console.log(account);
      setAccount(account);

      const chainId = await ethereum.request({method: 'eth_chainId'});
      console.log('connected to chainId: ', chainId);
      if(chainId === '0x5') {
        setCorrectNetwork(false);
      } else {
        setCorrectNetwork(true);
      }


      const goerliId = '0x5';

      if(goerliId !== chainId){
        console.log(' You are not Connected to Goerli network !');
        alert(' You are not Connected to Goerli network !');
        return
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();


      provider.on('accountsChanged', (accounts) => {
        account = accounts[0];
        console.log('account changed to: ', account);
        setAccount(account);
      })

    }catch(error){
      console.log(error)
    }
  }

  const getAllTasks = async () => {

    try{

      const {ethereum} = window;

    if(ethereum){

      const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TaskContract = new ethers.Contract(
          ContractAddress,ContractABI,signer
        )

        let allTasks = await TaskContract.getMyTasks();
        setTasks(allTasks);



      
    }else{
      alert('Get MetaMask!')
      return
    }


    }catch(error){
      console.log(error)
    }

    }

    useEffect(() => {
      getAllTasks();
    },[])
   

  

  const addTask = async (e) => {
    e.preventDefault();

    let task = {
      'taskText': input,
      'isDeleted': false
    };

    try {
      const {ethereum} = window

      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TaskContract = new ethers.Contract(
          ContractAddress,
          ContractABI,
          signer
        )

        TaskContract.addTask(task.taskText, task.isDeleted)
        .then(response => {
          setTasks([...tasks, task]);
          console.log("Completed Task");
        })
        .catch(err => {
          console.log("Error occured while adding a new task");
        });
        ;
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch(error) {
      console.log("Error submitting new Tweet", error);
    }

    setInput('')
  }


  const deleteTask = async (key) => {
    console.log(key);

    // Now we got the key, let's delete our tweet
    try {
      const {ethereum} = window

      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TaskContract = new ethers.Contract(
          ContractAddress,
          ContractABI,
          signer
        )

        let deleteTaskTx = await TaskContract.deleteTask(key, true);
        let allTasks = await TaskContract.getMyTasks();
        setTasks(allTasks);
      } else {
        console.log("Ethereum object doesn't exist");
      }

    } catch(error) {
      console.log(error);
    }
  
  }



  




  useEffect(() => {
    ethereum.on("accountsChanged", handleAccountChange);
    return() => {
      ethereum.removeListener("accountsChanged", handleAccountChange);
    }
  })

  useEffect(() => {
    connectWallet();
  })


  const handleAccountChange = (...args) => {
    const accounts = args[0];
    if(accounts.length === 0){
      console.log('Please connect to MetaMask.');
    }
    else if(accounts[0] !== account){
      setAccount(accounts[0]);
    }
  }


  return (
    <div className='bg-[#97b5fe] bg-gradient-to-r from-red-400 to-blue-500 h-screen w-screen flex justify-center p-7 '>

      <Head><title>TODO DAPP</title></Head>



      {/* main */}


      { account == '' ? 
        <WalletButton connectWallet={connectWallet} /> :
        correctNetwork == false ?
        <TodoList account={account} input={input} setInput={setInput} addTask={addTask} tasks={tasks} deleteTask={deleteTask} /> : 
        <WrongNetwork />  
    }







      {/* end */}
      


    </div>
  )
}

export default index