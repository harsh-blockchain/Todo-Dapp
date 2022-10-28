import React from 'react'

const walletButton = ({connectWallet}) => {
  return (
    
    <button className='h-[6rem] text-2xl font-bold py-3 px-12
    bg-[#f1c232] rounded-lg mb-10 hover:scale-110 transition duration-500 ease-in-out'
    onClick={connectWallet}
    >
        Connect Metamask Wallet
    </button>
  )
}

export default walletButton