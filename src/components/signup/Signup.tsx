import React, { useState} from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authService from '../../appwrite-services/auth-service'
import { logIn } from '../../store/AuthSlice'
import { Button } from '../../shadcn/components/ui/button'
import { Label } from '../../shadcn/components/ui/label'
import { Input } from '../../shadcn/components/ui/input'
import './signup.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons'

type Inputs = {
    userEmail: string,
    userPassword: string,
    userName: string,
}

function Signup() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm<Inputs>();
    const [signinError, setSigninError] = useState<boolean>(false);
    const [isLogin, setIsLogin] = useState<boolean>(true);

    const signUserUp = async(data: Inputs) => {
        setSigninError(false);
        try {
            const session = await authService.createAccount("", "", "");
            if(session) {
                const userData = await authService.getCurrentUser();
                if(userData) {
                    dispatch(logIn(userData));
                    navigate("/");
                }
            }
        } catch (error) {
            setSigninError(true)
        }
    }

  return (
    <div className={'container'+ (isLogin ? ' active': '')}>
      <div className="form-container sign-up">
        <form onSubmit={handleSubmit(signUserUp)}>
          <div className="social-icons">
            <div className="google-icon icon">
              <FontAwesomeIcon icon={faGoogle} />
            </div>
            <div className="twitter-icon icon">
              <FontAwesomeIcon icon={faTwitter} />
            </div>
            <div className="facebook-icon icon">
              <FontAwesomeIcon icon={faFacebook} />
            </div>
          </div>
          <span className="alternative">Or use your Email</span>
          <div className="form-controls">
            <Input className='' placeholder='Enter Your Email' type='email' {...register("userEmail", {
              required: true, validate: {
                matchPattern: (value:string) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || "Email Address should be valid"
              }
            })}></Input>
            <Input className='' placeholder='Password' type='password' {...register("userPassword",{
              required: true,
            })}></Input>
            <Input className='' placeholder='Username' type='text' {...register("userName",{
              required: true,
            })}></Input>

            <Button type='submit' className=''>Register</Button>
          </div>
        </form>
        <div className="error-container">
            {signinError &&
            <div className="error-message error-message flex justify-center items-center">
                <Label className='font-normal text-red-600'>Sign Up Failed</Label>
            </div>
            }
        </div>
        <div className="divider border bg-grey-600  m-4 "></div>
      </div>
      <div className="form-container sign-in">
        <form onSubmit={handleSubmit(signUserUp)}>
          <div className="social-icons">
            <div className="google-icon icon">
              <FontAwesomeIcon icon={faGoogle} />
            </div>
            <div className="twitter-icon icon">
              <FontAwesomeIcon icon={faTwitter} />
            </div>
            <div className="facebook-icon icon">
              <FontAwesomeIcon icon={faFacebook} />
            </div>
          </div>
          <span className="alternative">Or use your Email</span>
          <div className="form-controls">
            <Input className='' placeholder='Enter Your Email' type='email' {...register("userEmail", {
              required: true, validate: {
                matchPattern: (value:string) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || "Email Address should be valid"
              }
            })}></Input>
            <Input className='' placeholder='Password' type='password' {...register("userPassword",{
              required: true,
            })}></Input>
            <Button type='submit' className=''>Log In</Button>
          </div>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left" onClick={() => setIsLogin(false)}>
            <span>Welcome Back</span>
            <span>Sign Up?</span>
          </div>
          <div className="toggle-panel toggle-right" onClick={() => setIsLogin(true)}>
            <span>Hello, There!</span>
            <span>Log In?</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup