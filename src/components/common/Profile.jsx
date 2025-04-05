import React from 'react'
import "../../assets/css/profile.css";
import { FaCamera } from "react-icons/fa";


export const Profile = () => {
  return (
    <div className='Profile-cont'>

        <div className='Profile-section-left'>
            <div className='Profile-section-left-fixed'>
            <div className='Profile-pic-cont'>
                <div className='Profile-pic'>
                    <img src="#" alt="M"/>
                    <button className='Profile-pic-Add-bt'><FaCamera id="camera-icon"/>Add</button>
                </div>
            </div>
            </div>
        </div>

        <div className='Profile-section-right'>
            <div className='Profile-Title'>Your Profile</div>
            <div className='Profile-Details'>
                <div className='Profile-half-textbox'>   <input type='text' placeholder='First Name'/>    </div>
                <div className='Profile-half-textbox'>   <input type='text' placeholder='Last Name'/>     </div>
                <div className='Profile-full-textbox'>   <input type='text' placeholder='Email'/>         </div>
                <div className='Profile-half-textbox'>   <input type='text' placeholder='Phone Number'/>  </div>
                <div className='Profile-half-textbox'>   <input type='text' placeholder='Pincode'/>       </div>
                <div className='Profile-half-textbox'>   <input type='text' placeholder='Gender'/>        </div>
                <div className='Profile-half-textbox'>   <input type='date' placeholder='Date of Birth'/> </div>
                <div className='Profile-half-textbox'>   <input type='text' placeholder='State'/>         </div>
                <div className='Profile-half-textbox'>   <input type='text' placeholder='City'/>          </div>
                <div className='Profile-full-textbox'>   <input type='text' placeholder='Address'/>       </div>
            </div>
            <div className='Profile-submit'><button className='Profile-submit-bt'>Done</button></div>
        </div>
    </div>
  )
}
