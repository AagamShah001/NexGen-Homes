import React, { useEffect, useState } from 'react'
import "../../assets/css/photo.css";
import { IoIosArrowBack } from "react-icons/io";
import axios from 'axios';


export const PhotoTour = ({ isOpen, onClose ,data }) => {


  const [Imgs, setImgs] = useState([]);
  
  useEffect(() => {
    if (data) {
      setImgs(data);
    }
  }, [data]);
  
  if (!isOpen) return null;

  return (
    <div className='photo-cont'>
      <div className='photo-grid-section-top'>
          <button className='photo-grid-bt' onClick={onClose}><IoIosArrowBack size={30} /></button>
        </div>
      <div className='photo-grid-section-bottom'>
        
        <div className="photo-row">
          {
            Imgs?.map((img)=>{
              return(
                <div key={img} className="photo-column">
                  <img src={"http://localhost:3000/"+img}/>
                  </div>
              )
            })
          }

        </div>
      </div>
    </div>
  )
}
