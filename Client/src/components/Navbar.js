import {useRef} from "react";
import {FaBars, FaTimes} from "react-icons/fa";
import "../Styles/main.css"
import { Link } from "react-router-dom";
import { useState } from 'react';
import { ethers } from 'ethers';
import {abi} from '../agro';

function Navbar() {
    const navRef = useRef();

    const showNavbar = () =>{
        navRef.current.classList.toggle("responsive_nav");
    }

    //blockchain part
    const[signeraddress,setsigneraddress]=useState("");
    async function ismetamask(){
        if(!window.ethereum){
            alert('to proceed further please install metamsk');        }
        try{
        const  provider =  new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", []);
                await provider.send("eth_requestAccounts", []);


        const signer = provider.getSigner();
        const contractaddress =  '0x5FbDB2315678afecb367f032d93F642f64180aa3'
        const contract = new ethers.Contract(contractaddress,abi,signer)
        setsigneraddress(await signer.getAddress());
        }catch(err){
            console.log(err.reason);
        }
    }
    return (
        <header>
            <h3>AgroChain</h3>
            <nav ref={navRef}>
                {/* <a href="/#">Home</a> */}
                <Link to = "/">Home</Link>
                <a href="/#">About us</a>
                {/* <a href="/Services">Services</a> */}
                <Link to = "/Services">Services</Link>
                <Link to = "/Login">Order</Link>
                <Link to = "/Verify">Verify</Link>



                <button className="nav-btn nav-close-btn" onClick={showNavbar}>

                <FaTimes/>

                </button>
                
                <button type="button" class="text-white bg-emerald-50 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 relative top-1" onClick={ismetamask}>{signeraddress=='' ? 'Login' : signeraddress}</button>


            </nav>
            <button className="nav-btn " onClick={showNavbar}>
                <FaBars/>
            </button>

        </header>
     );
}

export default Navbar;