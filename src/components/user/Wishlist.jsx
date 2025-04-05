import React from 'react'
import "../../assets/css/wishlist.css";

export const Wishlist = () => {
  return (
    <div className='Wishlist-cont'>
        <div className='Wishlist-title'>Your Wishlist</div>
        <div className='Wishlist-card-grid'>
          <div className='Wishlist-card'>
            <div className='Wishlist-card-img'>img</div>
            <div className='Wishlist-card-title'>title</div>
          </div>

          <div className='Wishlist-card'>
            <div className='Wishlist-card-img'>img</div>
            <div className='Wishlist-card-title'>title</div>
          </div>

        </div>

    </div>
  )
}
