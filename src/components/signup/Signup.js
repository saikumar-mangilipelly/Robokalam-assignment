import React from 'react'
import { toast } from 'react-toastify'
import { FcGoogle } from "react-icons/fc";
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom'
import { auth, db, provider } from '../../firebase';
import './Signup.css'
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import robo from '../../Assests/robo.png'
function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const onuserregister = async (userdata) => {
    await createUserWithEmailAndPassword(auth, userdata.email, userdata.password)
      .then(async (usercredentials) => {
        await setDoc(doc(db, "users", usercredentials.user.uid), {
          email: userdata.email,
          username: userdata.username
        })
        navigate('/login')
        toast.success("Registered Successfully", {
          position: "top-right",
          autoClose: 2000,
          pauseOnHover: false,
          closeOnClick: true,
          draggable: true,
          theme: "colored",
        })
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          toast.error("User Already exists", {
            position: "top-right",
            autoClose: 2000,
            pauseOnHover: false,
            closeOnClick: true,
            draggable: true,
            theme: "colored",
          })
        }
        else if (error.code === "auth/invalid-email") {
          toast.error("Invalid email / password", {
            position: "top-right",
            autoClose: 2000,
            pauseOnHover: false,
            closeOnClick: true,
            draggable: true,
            theme: "colored",
          })
        }
        else if (error.code === "auth/weak-password") {
          toast.warning("password min length 6", {
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
  const handlegooglesignup = async () => {
    await signInWithPopup(auth, provider)
      .then(async (usercredentials) => {        
        const docref=await getDoc(doc(db,"users",usercredentials.user.uid))        
        if (docref.exists()) {
          toast.error("User Already exists", {
            position: "top-right",
            autoClose: 2000,
            pauseOnHover: false,
            closeOnClick: true,
            draggable: true,
            theme: "colored",
          })
        }
        else {
          await setDoc(doc(db, "users", usercredentials.user.uid), {
            email: usercredentials.user.email,
            username: usercredentials.user.displayName
          })
          navigate('/login')
          toast.success("Registered Successfully", {
            position: "top-right",
            autoClose: 2000,
            pauseOnHover: false,
            closeOnClick: true,
            draggable: true,
            theme: "colored",
          })
        }
      })
      .catch(error => console.log(error.code))
  }
  return (
    <div className='signmain'>
      <div>
        <img src={robo} height={600} width={500} className='mt-5 d-none d-sm-block' alt="" />
      </div>
      <div>
        <form className="signupform" onSubmit={handleSubmit(onuserregister)}>
          <h3 className='text-center mt-1'>Register</h3>
          <div className='mt-3'>
            <input type="text" placeholder='Username' {...register("username", { required: true })} />
            {errors.username?.type === "required" && <p className='text-danger fw-light mt-1'>* username required</p>}
          </div>
          <div className='mt-3'>
            <input type="email" placeholder='Email' {...register("email", { required: true })} />
            {errors.email?.type === "required" && <p className='text-danger fw-light mt-1'>* username required</p>}
          </div>
          <div className='mt-3'>
            <input type="password" placeholder='Password' autoComplete='none' {...register("password", { required: true })} />
            {errors.password?.type === "required" && <p className='text-danger fw-light mt-1'>* username required</p>}
          </div >
          <div className='mt-3'>
            <input type="password" autoComplete='none' placeholder='Confirm Password' />
          </div >
          <div className='mt-3'>
            <button type='submit'>Register</button>
          </div>
          <div className='mt-3 text-center fw-light'>
            <span>Already have an account </span><NavLink style={{ textDecoration: "none" }} to='/login'>Login here</NavLink>
          </div>
          <div className="line mt-1">
            <span>Or</span>
          </div>
          <div className='mt-3'>
            <button className='btngoogle' onClick={() => handlegooglesignup()}><i className='me-2 fs-5'><FcGoogle /></i><span>Signup with Google</span></button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
