import React, { useEffect, useState } from "react";
import "../../assets/css/home.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";



export const Home = () => {

  const [liked, setLiked] = useState({});
  const [Imgs, setImgs] = useState([]);
  const [Rate, setRate] = useState([]);
  const [Ids, setIds] = useState({});

  useEffect(() => {
    getAllImgs();
    rate();
    if (Ids.userId) { 
      wishlist();
    }
  
  }, [Ids]);

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

  const wishlist = async () =>{
    try{
      const res = await axios.post("/wishlist/addwishlist",Ids);
      console.log(res)
    }catch(error){
      console.error(error)
    }
    
  }

  return (


    <div className="home-card-cont">

      {
        Imgs?.map((Img) => {
          return (
            <Link key={Img._id} className="home-card" target="_blank" to={"/homedetails/" + Img.propertyId._id}>
              <div className="home-card-head">
                <div className="home-card-head-heart">
                  <FaHeart
                    size={20}
                    color={liked[Img._id] ? "red" : "lightgrey"} 
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      setIds({
                        userId: localStorage.getItem('id'),
                        propertyId: Img.propertyId._id,
                        imgId: Img._id
                      });
                      wishlist();
                      setLiked(prevLiked => ({
                        ...prevLiked,
                        [Img._id]: !prevLiked[Img._id]
                      }));
                    }}
                    style={{ cursor: "pointer", transition: "color 0.3s" }}
                  />
                </div>
                <div className="home-card-head-content-img"><img src={"http://localhost:3000/" + Img.imgUrl[0]} /></div>
              </div>
              <div className="home-card-body">
                <div className="home-card-body-content-title">{Img.name}
                  <div className="home-card-body-content-rate">
                    {Rate?.map((rate) =>
                      Img.propertyId._id === rate._id ? (
                        <div key={rate._id}><FaStar size={13} /> {(rate.averageRating) / 10}</div>
                      ) : null
                    )}
                  </div>
                </div>
                <div className="home-card-body-content-text">
                  {Img.propertyId.cityId.name},{Img.propertyId.stateId.name}
                  <span>₹{Img.propertyId.basePrice}</span>
                </div>
              </div>
            </Link>);
        })}

    </div>

  );
};
