import React from "react";
import Navbar from "../components/Navbar";
import TimeLine from "../components/TimeLine";
import Modal from '../components/Modal';

function Services(){

    const pageStyle = {
        backgroundColor: "#DAEBEE", // Set the background color to #3C326F
        // You can add other CSS properties here if needed
    };

    return( 
        <div style = {pageStyle}>
            <Navbar></Navbar>
            <TimeLine></TimeLine>
            {/* <div><h1>Services Page</h1></div> */}
        </div>
    )
}

export default Services