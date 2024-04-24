import LoginNavbar  from "../components/LoginNavbar";
import { useState } from "react";
import './LoginPage.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-hot-toast';

function LoginPage(){
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: '',
        password: '',
    })


    const loginUser = async(e) => {
        e.preventDefault()
        const{email, password} = data
        try{
            const{data} = await axios.post('/login',{
                email, 
                password,
            });
            if(data.error){
                toast.error(data.error)
            }else{
                
            setData({}); // Clear the form data
            navigate('/'); // Redirect the user to the homepage
        }
        }catch(error){

        }
        
    };
    return(
        <>
         <LoginNavbar /> 
        <div className = "login-container">
            <form onSubmit = {loginUser}>
                <label>Email</label>
                <input type= 'email' placeholder='Enter email' value={data.email} onChange={(e)=>setData({...data, email:e.target.value})}/>
                <label>Password</label>
                <input type= 'password' placeholder='Enter password' value={data.password} onChange={(e)=>setData({...data, password:e.target.value})}/>
                <button type='submit'>Login</button>
            </form>
        </div>
        </>
    );
}

export default LoginPage;