import React, { useState } from 'react'
import { BsFillCameraVideoOffFill, BsFillCameraVideoFill, BsFillMicMuteFill, BsFillMicFill } from "react-icons/bs";
import cameroff from '../../Assests/cameroff.jpg'
import Webcam from 'react-webcam'
import './Mainpage.css'
function Mainpage() {
    const [cameron, setcameron] = useState(true)
    const [micon, setmicon] = useState(true)
    const handlecamera = () => {
        setcameron(!cameron)
    }
    const handlemic = () => {
        setmicon(!micon)
    }
    return (
        <div className='mainpagelive'>
            <h1 className="text-center text-light mt-4">ROBOKALAM MEETING</h1>
            <div className='classlive mt-5'>
                <h2 className='fw-light text-center mt-5'>Your live video will appear here</h2>
            </div>
            <div className='liveicons'>
                <div className='iconsettings'>
                    <i onClick={() => handlecamera()}>{cameron ? <BsFillCameraVideoFill /> : <BsFillCameraVideoOffFill />}</i>
                </div>
                <div className='iconsettings'>
                    <i onClick={() => handlemic()}>{micon ? <BsFillMicFill /> : <BsFillMicMuteFill />}</i>
                </div>
            </div>
            <div className='emotion'>
                <h3 className='text-light'>{cameron && "Emotion"}</h3>
            </div>
            <div className='livecam'>
                {
                    cameron ? <Webcam
                        height={300}
                        width={300}
                        videoConstraints={{height:200,width:300}}
                        audio={micon ? true : false}
                    />
                        :
                    <img src={cameroff} className='coffimg' height={200} width={300} alt=''/>
            }
            </div>
        </div>
    )
}

export default Mainpage
