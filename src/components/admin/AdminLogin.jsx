import React from 'react'
import { useForm } from 'react-hook-form'
import "../../assets/css/sign.css"
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

export const AdminLogin = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()

    const navigate = useNavigate();

    const submit = async(data) => {

        try{
            const res = await axios.post("/adminlogin",data)
          if(res.status === 200){
            alert("Login Success");
            localStorage.setItem("id",res.data.data._id);
            localStorage.setItem("role",res.data.data.roleId.name);

            if (res.data.data.roleId.name === "Admin") {
                navigate("/adminpanel");
              }
            
            else{
              alert(" Failed")
            }
            
          }}
          catch(error){
                console.log(error)
                alert("login failed");
          }
        
    }

    const validator = {
        user: {
            required: {
                value: true,
                message: "user is required"
            },
            minLength: {
                value: 5,
                message: "min length is 8 characters"
            },
            pattern: {
                value: /([a-zA-Z0-9_.-]+@[a-zA-Z-]+\.[a-zA-Z]+)|(^[5-9][\d]?[0-9]{8}\b)/,
                message: "Invalid email or phone number"
            }



        },
        pass: {
            required: {
                value: true,
                message: "password is required"
            },
            minLength: {
                value: 8,
                message: "min length required is 8 characters"
            }

        }
    }

    return (
        <div className="form-cont">
           <div className='first-cont'>
            <form className="form-control" onSubmit={handleSubmit(submit)}>
                <div className="form-first">
                    <input type="text" className="ip-text" placeholder="Enter Email" {...register("email", validator.user)} />
                    <span className='span' style={{ color: "red" }}>
                        {
                            errors.email?.message
                        }

                    </span>
                </div>
                <div className="form-second">
                    <input type="password" className="ps-text" placeholder="Password" {...register("password", validator.pass)} />
                    <span className='span' style={{ color: "red" }}>
                        {
                            errors.password?.message
                        }

                    </span>
                </div>

                <div className='form-third'>
                    <button type="submit" className="btn-login">Login</button>
                    
                </div>
            </form>
            </div>
                        
        </div>
    )
}

