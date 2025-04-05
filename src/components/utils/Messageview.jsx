import React from 'react'
import "../../assets/css/messageview.css"
import { IoMdSend } from "react-icons/io";

export const Messageview = () => {
  return (
    <div className='message-view-cont'>

        <div className='message-navbar'>
            <div className='message-userimg'>
                <img src="#" alt="A"/>
            </div>
            <div className='message-username'>
                <span>ReceiverName</span>
            </div>
        </div>

        <div className='message-view-section'>
            <div className='message-msg-cont sender'>
                <div className='message-msg sender'>
                    <span>It seems like you might have accidentally typed a few characters ("+-+"). Could you clarify what you need help with or provide more context for your request? I'd be happy to assist!</span>
                </div>
            </div>

            <div className='message-msg-cont receiver'>
                <div className='message-msg receiver'>
                    <span>Hello</span>
                </div>
            </div>

        </div>

        <div className='message-box'>
            <input type='text' placeholder='Enter Message'/>
            <button type='submit'><IoMdSend size={20}/></button>
        </div>

    </div>
  )
}
