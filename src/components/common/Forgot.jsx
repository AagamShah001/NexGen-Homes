import React from 'react'
import { useForm } from 'react-hook-form'
import "../../assets/css/sign.css"
import { Link } from 'react-router-dom'
import { Navbar } from '../layout/Navbar'

export const Forgot = () => {
    const{register,handleSubmit,formState:{errors}}=useForm()

    const submit = (data)=>{
      console.log('data',data)
   }
            
                const validator={
                    user:{
                            required:{
                                value:true,
                                message:"Field is required"
                            },
                            minLength:{
                                    value:5,
                                    message:"min length is 8 characters"
                            },
                            pattern:{
                              value:/([a-zA-Z0-9_.-]+@[a-zA-Z-]+\.[a-zA-Z]+)|(^[5-9][\d]?[0-9]{8}\b)/,
                              message:"Invalid email or phone number"
                          }
                                
                         }
                  }
  
    return (
      <div className="form-cont">
          <div className='first-cont'>
        <form className="form-control" onSubmit={handleSubmit(submit)}>
  
          <div className="form-first">
            <div className='stp'>Enter your email, phone, or username and we'll send you a link to get back into your account.</div>
            <input type="text" className="ip-text" placeholder="Phone number, username, or email" {...register('user',validator.user)} />
            <span style={{color:"red"}}>
                          {
                              errors.user?.message   
                          }
                      
                      </span>
          </div>
            
            <div className='form-second'><button type="submit" className="btn-login">Send login link</button></div>
        </form>
        </div>

        <div className='second-cont'>
             <Link to='/login'>Back to Login</Link>
          </div>
  
  
      </div >
    )
  }
  