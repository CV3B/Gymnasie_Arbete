import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material"
import gokart_on_track from "../../../Images/gokart_on_track.jpg";
import "./TrackInfo.css";

function TrackInfo() {
  return(
  <div>
      <div class="track-info-container">
        <div class="track-info-img-container">
          <img src={gokart_on_track} alt="a" className="track-info-img"/>
        </div>
        <div class="track-product-info">
          <div class="track-info-text">
            <Typography variant="h5" className="track-info-title" sx={{fontWeight: "bold"}}>Utomhus Banan</Typography>
            <Typography variant="subtitle1" className="track-info-desc" >
              AAAAAA AAAAAAAAAA AAAAAAAAAA AAA AAAAA
            </Typography>
          </div>
        </div>
      </div>

      <div class="track-info-container">
        <div class="track-info-img-container">
          <img src={gokart_on_track} alt="a" className="track-info-img"/>
        </div>
        <div class="track-product-info">
          <div class="track-info-text">
            <Typography variant="h5" className="track-info-title" sx={{fontWeight: "bold"}}>Inomhus Banan</Typography>
            <Typography variant="subtitle1" className="track-info-desc" >
              AAAAAA AAAAAAAAAA AAAAAAAAAA AAA AAAAA
            </Typography>
          </div>
        </div>
      </div>
  </div>
  )
}

export default TrackInfo;