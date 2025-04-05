import React from 'react'
import "../../assets/css/message.css"
import { Messageview } from "./Messageview"


export const Messages = () => {

  return (
    <div className='message-cont'>

      <div className='message-sidebar'>

        <div className='message-sidebar-head'>
          <span>Message</span>
        </div>

        <div className='message-sidebar-body'>

          <div className='message-user-card'>
            <div className='message-user-head'>
              <img src="#" alt="A" />
            </div>
            <div className='message-user-body'>
              <div className='message-user-name'>
                <span>UserName</span>
                <span>Date</span>
              </div>
              <div className='message-user-msg'>Last Message</div>
            </div>
          </div>

          <div className='message-user-card'>
            <div className='message-user-head'>
              <img src="#" alt="A" />
            </div>
            <div className='message-user-body'>
              <div className='message-user-name'>
                <span>UserName</span>
                <span>Date</span>
              </div>
              <div className='message-user-msg'>Last Message</div>
            </div>
          </div>

        </div>

      </div>

      <div className='message-view'>
        <Messageview></Messageview>
      </div>

    </div>
  )
}
