import React, { useEffect,useState } from 'react'
import Navbar from '../components/Navbar'
import { ethers} from 'ethers'
import {abi} from '../agro'
import Modal from '../components/Modal'
import '../Styles/verify.css';
//import bigInt from "big-integer";

function Verify() {
    const[contractadd,setcontractadd]=useState();
    const[pendingaddress,setpendingadd]=useState();
    const[userid,setuserid]=useState();
    const[inflation,setinflation]=useState();
    const[bool,setbool]=useState(false);
    const[newprice,setnewprice]= useState();
    const[bool2,setbool2]=useState(false);


    useEffect(()=>{
        inContract();
    })
    async function inContract(){
        try{
        const provider =  new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);

        const contract_address= '0x5Abf285424A67e3bA8edC96A21dC20165c5C1E4c';
        const signer =  provider.getSigner();
        const contract = new ethers.Contract(contract_address,abi,signer);
        setcontractadd(contract);
        let a = await signer.getAddress()        
        setpendingadd(a);


        }
        catch(err){
            console.log(err);
        }

    }
    async function toverify(e){
        e.preventDefault();
        try{
            const data = await contractadd.get_order(userid);
            let org = data.price
            const ind = await contractadd.get_index(pendingaddress,userid);
            if(ind!=100){
                let inf = data.inflation[ind];
                let newprice = Math.round(org + (inf*org/100));
                await contractadd.to_verify(pendingaddress,userid,newprice);
                setbool(true);
            }else{
                setbool2(true);
            }
           
        }

        catch(err){
            console.log(err);
        }
    }

  return (
    
    <div >
        <Navbar/>
        <form className='form2'>
        <input  className='input-box2' onChange={e=>setuserid(e.target.value)} placeholder='Enter id of the product'/><br/>

        <button   className='btn2' onClick={e=>toverify(e)}>click here to verify</button>
        </form>
        <Modal open={bool} onclose={()=>setbool(false)} value={`You have successfully verified, Go to timeline page for more information`}/>
        <Modal open={bool2} onclose={()=>setbool2(false)} value={`You are not authorized to verify this particular product id`}/>


        

    </div>
  )
}

export default Verify