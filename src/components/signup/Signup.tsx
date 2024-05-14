import React, { useState} from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authService from '../../appwrite-services/auth-service'
import { logIn } from '../../store/AuthSlice'
import { Button } from '../../shadcn/components/ui/button'
import { Label } from '../../shadcn/components/ui/label'
import { Input } from '../../shadcn/components/ui/input'

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
    <div className='flex justify-center items-center w-[396px] h-[456px] border rounded-lg border-gray-200'>
      <div className="form-container">
        <form onSubmit={handleSubmit(signUserUp)}>
          <div className="form-controls">
            <Input className='w-[330px] h-[52px] p-2 m-4' placeholder='Enter Your Email' type='email' {...register("userEmail", {
              required: true, validate: {
                matchPattern: (value:string) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || "Email Address should be valid"
              }
            })}></Input>
            <Input className='w-[330px] h-[52px] p-2 m-4' placeholder='Password' type='password' {...register("userPassword",{
              required: true,
            })}></Input>
            <Input className='w-[330px] h-[52px] p-2 m-4' placeholder='Username' type='text' {...register("userName",{
              required: true,
            })}></Input>

            <Button type='submit' className='w-[330px] h-[52px] p-2 m-4'>Register</Button>
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
        <div className="login-container flex justify-center items-center">
            <Button variant={'secondary'} className='w-[240px] p-2 m-4'>Login</Button>
        </div>
      </div>
      
    </div>
  )
}

export default Signup