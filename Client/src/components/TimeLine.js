import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { abi } from '../agro';
import Modal from './Modal'
import Modal2 from './Modal2';
import axios from 'axios';
import matlabData from '../matlabData.json'

function TimeLine() {
  const [signeraddress, setsigneraddress] = useState("You haven't logged in yet");
  const [contract, setcontract] = useState();
  const [searchid, setsearchid] = useState();

  // Variable initialization
  const [owner, setowner] = useState('');
  const [pendingaddress, setpendingaddress] = useState([]);
  const [qty, setqty] = useState();
  const [price, setprice] = useState();
  const [inflation, setinflation] = useState([]);
  const [prodname, setprodname] = useState('');
  const [verifiedaddress, setverifiedaddress] = useState([]);
  const [bool, setbool] = useState(false);
  const[namearr,setnamearr]=useState([]);
  const[placearr,setplacearr]  = useState([]);
  const [bool2, setbool2] = useState(false);
  const [backobj,setBackobj] = useState();
  const [decayPercent,setdecayPercent] = useState();
  const [rotArea,setrotArea]  = useState();


  useEffect(() => {
    iscontract();

    const interval = setInterval(async () => {
      const response = await axios.get('http://localhost:5000/api1').then((response) => {
        setBackobj(response.data)
        setdecayPercent(response.data.percentageRotten)
        setrotArea(response.data.rottenAreas)
      }).catch((error) => {
        console.error('Error fetching data:', error);
      });
      
    }, 10000);

    
  }, []);

console.log(backobj)

  async function iscontract() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);

      const signer = provider.getSigner();
      const contractaddress = '0x5Abf285424A67e3bA8edC96A21dC20165c5C1E4c';
      setcontract(new ethers.Contract(contractaddress, abi, signer));

      setsigneraddress(await signer.address);
    } catch (err) {
      console.log(err.reason);
    }
  }

  async function get() {
    try {
      const data = await contract.get_order(searchid);
      setowner(data.item_owner);
      setpendingaddress(data.pending_address);
      setqty(data.qty.toString());
      setprice(data.price.toString());
      setinflation(data.inflation);
      setprodname(data.product_name);
      setverifiedaddress(data.verified_address);
      setnamearr(data.names);
      setplacearr(data.places)
    } catch (err) {
      console.log(err);
      setbool(true);
    }
  }


  return (
    <div className="timeline">
    {console.log(namearr)}
    <div class='h-screen'>
    <div class="flex items-center justify-center relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            
        </div>
      <input type="number" placeholder="enter the product id"  class="block  p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-1/3" onChange={e => setsearchid(e.target.value)} />
      <button onClick={get} class="text-white  items-center h-12  w-44 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search for the product</button>
    </div>
      <h1 class="flex items-center justify-center py-5 font-mono text-orange-50 font-bold text-xl">Timeline of {prodname}</h1>


      <h1 class="flex items-center justify-center py-5 font-mono text-orange-50 font-bold text-xl	">Owner: {owner}</h1>
 
      

      <VerticalTimeline>
      
        {pendingaddress.map((data, index) => (
          <VerticalTimelineElement
            key={index}
            className="vertical-timeline-element--work"
            date=  <button onClick={()=>setbool2(true)} class="text-white  items-center h-12  w-44 bottom-2.5  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style={{ backgroundColor: "black", width: "200px" }}>Real-time health of fruits</button>
            
            
            iconStyle={{ background: pendingaddress[index] === '0x0000000000000000000000000000000000000000' ? 'green' : 'red', color: '#fff' }}
            
            icon={<AgricultureIcon />}
            
          >
        
            <h4 className="vertical-timeline-element-subtitle">ID: {pendingaddress[index]}</h4>
            <h4 className="vertical-timeline-element-subtitle">Name: {namearr[index]}</h4>
            <h4 className="vertical-timeline-element-subtitle">Place: {placearr[index]}</h4>
            <h4 className="vertical-timeline-element-subtitle">Total Price: {price*qty}</h4>
            <h4 className="vertical-timeline-element-subtitle">Price per Kg: {price} rs</h4>
            <h4 className="vertical-timeline-element-subtitle">Inflation: {inflation[index]}%</h4>
            
          </VerticalTimelineElement>
          
        ))}
        
      </VerticalTimeline>
      
      <Modal open={bool} onclose={()=>setbool(false)} value={"No Such order has been initiated yet, Try again"}/>
      <Modal2 open={bool2} onclose={()=>setbool2(false)} value={"Hello"}  TempInC={"Ayo"} TempInF={"Ayo"} Gas={"Ayo"} Flame={"Ayo"} Pir={"Ayo"} Ultrasonic={"Ayo"} decayPercent={decayPercent} rotArea={rotArea}/>

    </div>
    </div>
  );
}

export default TimeLine;