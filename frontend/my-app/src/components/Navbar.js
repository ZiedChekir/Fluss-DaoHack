import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { ethers } from "ethers";

function clickme(){alert('you clicked me');}

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
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

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);



  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            TEST
            <i class='fab fa-typo3' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Explore
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/submit'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Submit
              </Link>
            </li>

            <li>
              <Link
                to='/signup'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
            </li>
          </ul>
          {button && <Button onClick={clickme} buttonStyle='btn--outline'>Connect Metamask</Button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
