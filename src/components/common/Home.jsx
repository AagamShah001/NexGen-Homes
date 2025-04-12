import React, { useEffect, useState } from "react";
import "../../assets/css/home.css";
import axios from "axios";
import { Link } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';
import { Box, Skeleton } from "@mui/material";
import { WishButton } from "./WishButton";



export const Home = () => {

  const [Imgs, setImgs] = useState([]);
  const [Rate, setRate] = useState([]);

  useEffect(() => {
    getAllImgs();
    rate();
  }, []);

  const getAllImgs = async () => {
    try {
      const res = await axios.get("/img/imgs");
      setImgs(res.data.data);

    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const rate = async () => {
    const res = await axios.get("/review/rate");
    setRate(res.data.data)
  }

  return (


    <div className="home-card-cont">

      {
        Imgs && Imgs.length > 0 ? (
          Imgs.map((Img) => {
            return (
              <div key={Img._id} className="home-card">
                <div className="home-card-head">
                  <div className="home-card-head-heart">
                  <WishButton  imgId={Img._id} propertyId={Img.propertyId._id} />
                  </div>
                  <div className="home-card-head-content-img">
                  <Link id="home-link" target="_blank" to={"/homedetails/" + Img._id}>
                    <img src={"http://localhost:3000/" + Img.imgUrl[0]} />
                    </Link>
                  </div>
                </div>
                <Link id="home-link"  target="_blank" to={"/homedetails/" + Img._id}>
                <div className="home-card-body">
                  <div className="home-card-body-content-title">{Img.name}
                    <div className="home-card-body-content-rate">
                      {Rate?.map((rate) =>
                        Img.propertyId._id === rate._id ? (
                          <div key={rate._id}><StarIcon sx={{ fontSize: 15 }}/> {(rate.averageRating) / 10}</div>
                        ) : null
                      )}
                    </div>
                  </div>
                  <div className="home-card-body-content-text">
                    {Img.propertyId.cityId.name},{Img.propertyId.stateId.name}
                    <span>₹{Img.propertyId.basePrice}</span>
                  </div>
                </div>
                </Link>
              </div>);
          })) : (
          <>{[...Array(8)].map((_, index) => (
            <Box key={index}>
              <Skeleton variant="rounded" width={250} height={230} />
              <Skeleton animation="wave" height={30} />
              <Skeleton animation="wave" width={200} height={30} />
            </Box>
          ))}
          </>
        )
      }

    </div>

  );
};
