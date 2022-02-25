import React from "react";
import { Typography } from "@mui/material";
import racelineLight from "../../../Images/raceline-light.png";

import "./AboutGokarts.css";

function AboutGokarts() {

  return(
    <div>
      <div className="info-container">
        <div className="info-img-container">
          <img src={racelineLight} alt="gokart-img1" className="info-img" />
        </div>
        <div className="product-info">
          <div className="info-text">
            <Typography variant="h5" className="info-title" sx={{fontWeight: "bold", textAlign: "justify"}}>Praga Raceline Light</Typography>
            <Typography variant="subtitle1" className="info-desc" >
              <dl>  
                <dt>Hästkrafter: </dt>  
                <dd>12hp</dd>
                <dt>Motor:</dt>  
                <dd>Tillotson 350</dd>
                <dt>Vikt: </dt>  
                <dd>119kg</dd>  
                <dt>Säte: </dt>  
                <dd>Justerbart</dd> 
                <dt>Pedaler: </dt>  
                <dd>Justerbart</dd>
              </dl> 
            </Typography>
          </div>
        </div>
      </div>

      <div className="info-container">
      <div className="info-img-container">
        <img src={racelineLight} alt="gokart-img2" className="info-img" />
      </div>
      <div className="product-info">
        <div className="info-text">
          <Typography variant="h5" className="info-title" sx={{fontWeight: "bold", textAlign: "justify"}}>Praga Raceline Light</Typography>
          <Typography variant="subtitle1" className="info-desc" >
            <dl>  
              <dt>Hästkrafter:</dt>  
              <dd>12hp</dd>
              <dt>Motor:</dt>  
              <dd>Tillotson 350</dd>
              <dt>Vikt:</dt>  
              <dd>119kg</dd>  
              <dt>Säte:</dt>  
              <dd>Justerbart</dd> 
              <dt>Pedaler:</dt>  
              <dd>Justerbart</dd> 
            </dl> 
          </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutGokarts;