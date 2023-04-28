import React from 'react'
import { toast } from 'react-toastify'
import { FcGoogle } from "react-icons/fc";
import { NavLink, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import './Login.css'
import { signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth, db, provider } from '../../firebase';
import loginrobo from '../../Assests/loginrobo.png'
import { doc, getDoc } from 'firebase/firestore';
function Login() {
    localStorage.clear()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const onuserlogin = async (userdata) => {
        await signInWithEmailAndPassword(auth, userdata.email, userdata.password)
            .then((usercredentials) => {   
                localStorage.setItem('token', usercredentials.user.accessToken)             
                toast.success("Login Successfully", {
                    position: "top-right",
                    autoClose: 2000,
                    pauseOnHover: false,
                    closeOnClick: true,
                    draggable: true,
                    theme: "colored",
                })
                navigate('/mainpage')
            })
            .catch((error) => {
                if (error.code === "auth/wrong-password") {
                    toast.error("Invalid Password", {
                        position: "top-right",
                        autoClose: 2000,
                        pauseOnHover: false,
                        closeOnClick: true,
                        draggable: true,
                        theme: "colored",
                    })
                }
                else if (error.code === "auth/user-not-found") {
                    toast.error("Invalid Email", {
                        position: "top-right",
                        autoClose: 2000,
                        pauseOnHover: false,
                        closeOnClick: true,
                        draggable: true,
                        theme: "colored",
                    })
                }
                else {
                    console.log(error.code)
                }
            })
    }
    const handlegooglelogin = async () => {        
        await signInWithPopup(auth,provider)
        .then(async (usercredentials) => {            
            const docref = await getDoc(doc(db, "users", usercredentials.user.uid))              
            if(docref.exists()){
                localStorage.setItem('token',usercredentials.user.accessToken)
                toast.success("Login Successfully", {
                    position: "top-right",
                    autoClose: 2000,
                    pauseOnHover: false,
                    closeOnClick: true,
                    draggable: true,
                    theme: "colored",
                })
                navigate('/mainpage')   
            }
            else{
                toast.error("Invalid Email", {
                    position: "top-right",
                    autoClose: 2000,
                    pauseOnHover: false,
                    closeOnClick: true,
                    draggable: true,
                    theme: "colored",
                })
                signOut(auth)
            }
        })
        .catch(error => console.log(error))             
    }
    return (
        <div className='loginmain mt-4'>
            <img src={loginrobo} className='mt-5' alt="" />
            <div>
                <form className="loginform" onSubmit={handleSubmit(onuserlogin)}>
                    <h3 className='text-center'>Login</h3>
                    <div className='mt-3'>
                        <input type="email" placeholder='Email' {...register("email", { required: true })} />
                        {errors.email?.type === "required" && <p className='text-danger fw-light mt-1'>* email required</p>}
                    </div>
                    <div className='mt-3'>
                        <input type="password" autoComplete='none' placeholder='Password' {...register("password", { required: true })} />
                        {errors.password?.type === "required" && <p className='text-danger fw-light mt-1'>* password required</p>}
                    </div >
                    <div className='mt-3'>
                        <button type='submit'>Login</button>
                    </div>
                    <div className='mt-3 text-center fw-light'>
                        <span>Don't have an account </span><NavLink style={{ textDecoration: "none" }} to='/'>Signup here</NavLink>
                    </div>
                    <div className="line mt-1">
                        <span>Or</span>
                    </div>
                    <div className='mt-3'>
                        <button className='btngoogle' onClick={() => handlegooglelogin()}><i className='me-2 fs-5'><FcGoogle /></i><span>Login with Google</span></button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
