import React from 'react'
import { useForm } from 'react-hook-form'
import "../../assets/css/sign.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
export const Signup = () => {

    const{register,handleSubmit,formState:{errors}}=useForm()

    const navigate = useNavigate();

    const submit = async(data)=>{
        data.roleId ="67da9784c1217a5cae4799f4";
        const res = await axios.post("/user/adduser",data)

        if(res.status===201){
            alert("User added Successfully")
            navigate("/login")
        }
        else{
            alert("user not added")
        }
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
                    },

               pass:{
                           required:{
                               value:true,
                               message:"password is required"
                           },
                           minLength:{
                               value:8,
                               message:"min length required is 8 characters"
                           },
                                                     
                           
                    },
               fname:{
                       required:{
                           value:true,
                           message:"First Name is required"
                       }
                       
                     },
               uname:{
                           required:{
                               value:true,
                               message:"Last Name is required"
                           }
                           
                     }
                       
                
           }

   return (
       <div className="form-cont">
        <div className='first-cont'>
           <form className="form-control" onSubmit={handleSubmit(submit)}>

               <div className="form-first">
                   <input type="text" className="ip-text" placeholder="Phone number, username, or email" {...register('email',validator.user)}/>
                   <span className='span' style={{color:"red"}}>
                       {
                           errors.user?.message   
                       }
                   
                   </span>
               </div>


               <div className="form-second">
                   <input type="password" className="ps-text" placeholder="Password" {...register('password',validator.pass)}/>
                   <span className='span' style={{color:"red"}}>
                       {
                           errors.pass?.message   
                       }
                   
                   </span>    
               </div>

               <div className="form-third">
                   <input type="text" className="ip-text" placeholder="Firstname" {...register('firstname',validator.fname)}/>
                   <span className='span' style={{color:"red"}}>
                       {
                           errors.firstname?.message   
                       }
                   
                   </span>
               </div>

               <div className="form-fourth">
                   <input type="text" className="ip-text" placeholder="lastname" {...register('lastname',validator.uname)}/>
                   <span className='span' style={{color:"red"}}>
                       {
                           errors.lastname?.message   
                       }
                   
                   </span>
               </div>
               <div className="stp">By selecting Agree and continue, 
                                    I agree to <a href="#"> Terms of Service, 
                                    Payments Terms of Service,</a> and <a href="#">
                                    Nondiscrimination Policy</a> and acknowledge the 
                                    <a href="#">Privacy Policy.</a></div>
               
               <div className="btn-login"><button type="submit" className="btn-login">Sign up</button></div>
           </form>
           </div>
           
           <div className="second-cont">
           <label>have an account? <Link to='/login'>Log in</Link></label>
           </div>

       </div>
   )
}
