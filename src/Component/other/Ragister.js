import React from 'react'
import "./reg.css";
import { useState } from "react";
import axios from "axios"
const initialValue = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    // country: "",
    state: "",
    city: "",
    mobile_Name: "",
    role_type: "",
    company_name:""
}
const Ragister = () => {


    // const API_URL="http://134.209.229.112:5000/account/signup"

//  const addUser = async(data)=>{
//     try{
//     return await axios.post(API_URL,data);
//     } catch(error){
//         console.log("Error while calling addUser api",error.massage);
//     }
// }

    const [user, setUser] = useState(initialValue);

    const onValueChange=(e)=>{
        console.log(e.target.name,e.target.value)
        setUser({...user, [e.target.name]: e.target.value})
        console.log(user)
    }



    const addUserDetails= (e)=>{
       
        e.preventDefault()
        axios.post("http://134.209.229.112:5000/account/signup",user)
        .then(res=>{console.log(res)})
        .catch(err=>{console.log(err)})

        // await addUser(user);
        // navigate('/all');
     }

    return (
        <>
            <div className="container-fluid box ">
                <h1>Register</h1>
                <form className='d-flex' >
                    <div className="row" style={{ margin: "15px" }}>
                        <div className="col">
                            <input type="text" placeholder=' name' name='name' onChange={(e)=>onValueChange(e)}  />
                        </div>
                        <div className="col">
                            <input type="text" placeholder=' email' name="email" onChange={(e)=>onValueChange(e)} />
                        </div>
                        <div className="w-100 " style={{ margin: "15px" }}> </div>
                        <div className="col">
                            <input type="text" placeholder=' mobile number' style={{ marginBottom: "10px" }} name="mobile_Number" onChange={(e)=>onValueChange(e)} />
                        </div>
                        <div className="col">
                            <input type="text" placeholder='company name' style={{ marginBottom: "10px" }}
                                name="company_name" onChange={(e)=>onValueChange(e)} />
                        </div>
                        <div className='w-100' style={{ margin: "15px" }} onChange={(e)=>onValueChange(e)}  ></div>
                        <div >

                        <input type="text" placeholder='company name' style={{ marginBottom: "10px" }}
                                name="role_type" onChange={(e)=>onValueChange(e)} />

                            {/* <select type="select" name="role_type " id="" placeholder='role type'>
                            <option value="">role type</option>
                            <option value="recruiter">recruiter</option>
                            <option value="employe">employe</option>
                        </select> */}
                        </div>
                        <div className="w-100" style={{ margin: "20px" }}></div>
                        <div className="col" >
                            <input type="text" placeholder='state' name="country"onChange={(e)=>onValueChange(e)}  />
                        </div>
                        <div className="col" >
                            <input type="text" placeholder='city' name="city" onChange={(e)=>onValueChange(e)}  />
                        </div>
                        <div className="w-100" style={{ margin: "15px" }}></div>
                        <div className="col">
                            <input type="text" placeholder='password' name="password" onChange={(e)=>onValueChange(e)}  />
                        </div>
                        <div className="col">
                            <input type="text" placeholder='confirm password' name="confirm_password" onChange={(e)=>onValueChange(e)}  />
                        </div>

                        <div style={{ marginTop: "40px" }}><input type="submit" onClick={() => addUserDetails()}  /></div>

                    </div>
                </form>
            </div>
        </>
    )
}

export default Ragister