import React, { useEffect, useState } from "react";
import closeup_gokart from "../../../Images/closeup_gokart.jpg";
import { Typography, Paper } from "@mui/material";

import "./AboutGokarts.css";
// import { typography } from "@mui/system";

function AboutGokarts() {

  return(
    <div>
      <div class="info-container">
        <div class="info-img-container">
          <img src={closeup_gokart} alt="a" className="info-img"/>
        </div>
        <div class="product-info">
          <div class="info-text">
            <Typography variant="h5" className="info-title" sx={{fontWeight: "bold"}}>Gokart 1</Typography>
            <Typography variant="subtitle1" className="info-desc" >
              <dl>  
                <dt>Hästkrafter:</dt>  
                <dd>12bhp</dd>  
              </dl> 
            </Typography>
          </div>
        </div>
      </div>
      <div class="info-container">
      <div class="info-img-container">
        <img src={closeup_gokart} alt="a" className="info-img" />
      </div>
      <div class="product-info">
        <div class="info-text">
          <Typography variant="h5" className="info-title" sx={{fontWeight: "bold"}}>Gokart 2</Typography>
          <Typography variant="subtitle1" className="info-desc" >
            <dl>  
              <dt>Hästkrafter:</dt>  
              <dd>12bhp</dd>  
            </dl> 
          </Typography>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AboutGokarts;