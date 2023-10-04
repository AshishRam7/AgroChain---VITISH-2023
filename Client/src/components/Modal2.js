import React from 'react'
import {useEffect} from 'react';
import { useState } from 'react';
import axios from 'axios';
import emailjs from 'emailjs-com'

function Modal2({open,onclose,decayPercent,rotArea,children}) {
  const [humidity,sethumidity]=useState();
  const [tempc,settempc]=useState();
  const [tempf,settempf]=useState();
  const [gassensor,setgassensor]=useState();
  const [pirsensor,setpirsensor]=useState();
  const [flamesensor,setflamesensor]=useState();
  const [ultrasonic,setultrasonic]=useState();
  useEffect(()=>{
    const interval = setInterval(async ()=>{


    let detailsn = await axios.get('https://api.thingspeak.com/channels/2276275/feeds/last.json');       
    sethumidity(detailsn.data.field1);
    settempc(detailsn.data.field2);
     settempf(detailsn.data.field3);
     setgassensor(detailsn.data.field4 );
     setpirsensor(detailsn.data.field5 );
     setflamesensor(detailsn.data.field6);
     setultrasonic(detailsn.data.field7);

     console.log(tempc,humidity,tempf,gassensor,pirsensor,flamesensor,ultrasonic)

     const Mailer = async () => {
        function sendEmail(e){
          e.preventDefault();
        }
     }
    
  },15000)
  },[])
  
  

  
  return (
    <div>
    <div onClick={onclose} className={`fixed inset-0 justify-center items-center transition-colors ${open ? "visible bg-black/20":"invisible"} `}>
    <div onClick={(e)=>e.stopPropagation()} className={`  h-{64}  absolute inset-0 bg-white rounded-xl shadow p-8 transition-all   text-5xl ${open ? "scale-50 opacity-100":"scale-125-opacity-0"}`}  style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        
        <div><h1>Humidity: {humidity} </h1></div> <br/> 
        <div><h1>Temperature in Celsius: {tempc} </h1>  </div><br/> 
        <div><h1>Temperature in Farenheit: {tempf} </h1></div><br/>   
        <div><h1>Gas Sensor: {gassensor} </h1> </div>       <br/>  
        <div><h1>Flame Sensor: {pirsensor} </h1> </div>  <br/>       
        <div><h1>PIR Sensor: {flamesensor} </h1></div>    <br/>    
        <div><h1>Ultrasonic Sensor: {ultrasonic} </h1></div>  <br/>    
        <div><h1>Percentage of Decay: {decayPercent} </h1></div>  <br/>   
        <div><h1>Number of Rotten Areas: {rotArea} </h1></div>  <br/>
   


        <button onClick={onclose} type="button" class="absolute top-0 right-0 h-16 w-20 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 text-5xl">X</button>

    </div>

    </div>
    </div>
  )
}

export default Modal2