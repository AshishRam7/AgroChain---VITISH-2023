import React,{useEffect} from 'react'
import { useState } from 'react';
import { ethers } from 'ethers';
import {abi} from '../agro';
import Navbar from '../components/Navbar';
import Modal from '../components/Modal';
import '../Styles/form.css';
import "../Styles/form.jpg";


function Postdetails() {
    const[signeraddress,setsigneraddress]=useState("You haven't logged in yet");
    const[contract,setcontract]=useState();
    const[pendingadd,setpendingadd]= useState('');
    const[pending,setpending]= useState([]);
    const[places,setplaces]= useState('');
    const[placesarray,setplacesarray]= useState([]);
    const[itemid,setid]=useState();
    const[name,setname]=useState();
    const[namearr,setnamearr]=useState([]);



    const[quandity,setquanidty]= useState();
    const[price,setprice]= useState();
    const[inflation,setinflation]= useState();
    const[inflationarr,setinflationarr]= useState([]);

    const[prodnam,setprodname]= useState('');

    const[bool,setbool]=useState(false);
    const[bool2,setbool2]=useState(false);

    useEffect(()=>{

      iscontract();
    },[])
    async function iscontract(){
        try{
        const  provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", []);

        const signer =  provider.getSigner();
        const contractaddress =  '0x5Abf285424A67e3bA8edC96A21dC20165c5C1E4c'
        setcontract(new ethers.Contract(contractaddress,abi,signer))
        console.log(prodnam)


        setsigneraddress(signer.address);
        }catch(err){
            console.log(err.reason);
        }
    }
    // const handlefile=()=>{
    //   let e='allenexcel.xlsx'
    //   ExcelRenderer(e,(err,response)=>{
    //     if(err){
    //       console.log(err);
    //     }else{
    //       console.log('success');
    //     }

    //   })
    // }
    // handlefile()
    const add= async (e)=>{
      e.preventDefault();
      try{
        await contract.initiate_order(pending,quandity,price,inflationarr,prodnam,[],placesarray,namearr);
        setid(await contract.getid());
        setbool(true);
      }catch(err){
        console.log(err);
      }
      }

    async function setq(e){
      e.preventDefault();
      pending.push(pendingadd);
      placesarray.push(places);
      inflationarr.push(inflation);
      namearr.push(name);
      console.log(pending);
      console.log(placesarray);
      console.log(namearr);
      setbool2(true)


    }

  
  return (
    <div>
    <Navbar/>
    <form onSubmit={(e)=>add(e)} className='form1'>
    <input className='input-box' type='text' placeholder="Enter all of your distribution address in the format" onChange={e=>{setpendingadd(e.target.value)}}></input><br/>
    <input className='input-box' type='text' placeholder='Enter the PlaceName'  onChange={e=>{setplaces(e.target.value)}}></input><br/>
    <input className='input-box' type='text' placeholder='Enter the Name of the vendor'  onChange={e=>{setname(e.target.value)}}></input><br/>
    <input  className='input-box' type='number' placeholder='Enter the inflation percentage'  onChange={e=>{setinflation(e.target.value)}}></input><br/><br/>

    <button   className='btn1' onClick={e=>setq(e)}>+</button>
    <Modal open={bool2} onclose={()=>setbool2(false)} value={`You have added a new Distributor to your chain`}/>


       
     

      <input className='input-box' type='number' placeholder='Enter the quantity in terms of Kg' onChange={e=>{setquanidty(e.target.value)}}></input><br/><br/>
      
      <input className='input-box' type='number' placeholder='Enter the price in terms of Rs'  onChange={e=>{setprice(e.target.value)}}></input><br/><br/>
      <input className='input-box' type='text' placeholder='Enter the Product Name'  onChange={e=>{setprodname(e.target.value)}}></input><br/><br/>

      <button  className='btn' type="submit">submit contract</button>
      <Modal open={bool} onclose={()=>setbool(false)} value={`You have successfully started the chain, your productId is ${itemid}`}/>

      </form>
      
    </div>
  )
}

export default Postdetails

