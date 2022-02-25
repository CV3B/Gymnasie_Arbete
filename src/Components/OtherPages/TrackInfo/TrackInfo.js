import React from "react";

import { Typography } from "@mui/material"

import gokart_on_track from "../../../Images/gokart_on_track.jpg";

import "./TrackInfo.css";

function TrackInfo() {
  return(
  <div>
      <div className="track-info-container">
        <div className="track-info-img-container">
          <img src={gokart_on_track} alt="a" className="track-info-img"/>
        </div>
        <div className="track-product-info">
          <div className="track-info-text">
            <Typography variant="h5" className="track-info-title" sx={{fontWeight: "bold"}}>Utomhus Banan</Typography>
            <Typography variant="subtitle1" className="track-info-desc" sx={{padding: "10px"}} >
            Vår utomhusbana är 1100 meter lång och har många långa svepande kurvor.
            </Typography>
          </div>
        </div>
      </div>

      <div className="track-info-container">
        <div className="track-info-img-container">
          <img src={gokart_on_track} alt="a" className="track-info-img"/>
        </div>
        <div className="track-product-info">
          <div className="track-info-text">
            <Typography variant="h5" className="track-info-title" sx={{fontWeight: "bold"}}>Inomhus Banan</Typography>
            <Typography variant="subtitle1" className="track-info-desc" sx={{padding: "10px"}} >
              Vår utomhusbana är 850 meter lång och har många långa svepande kurvor.
            </Typography>
          </div>
        </div>
      </div>
  </div>
  );
}

export default TrackInfo;