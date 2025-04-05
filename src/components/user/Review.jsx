import React from 'react'
import "../../assets/css/review.css";

export const Review = () => {
  return (
    <div className='review-cont'>

        <div className='review-header'>
            <div className='review-userimg'>
                <img src="src\assets\img\help u.webp" alt="user img"/>
            </div>
            <div className='review-username'>Username</div>
        </div>
        <div className='review-footer'>
        <div className='review-text'>*(4.5)</div> 
        <div className='review-text'>Genevieve has an amazing home that was very welcoming. Really great little place to stay. The house gets a lot of natural light, which I think is rare in London.</div> 
        </div>

    </div>
  )
}
