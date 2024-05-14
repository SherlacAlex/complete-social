import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../../appwrite-services/auth-service';
import { logIn } from '../../store/AuthSlice';
import { Button } from '../../shadcn/components/ui/button';
import { Input } from '../../shadcn/components/ui/input';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Label } from '../../shadcn/components/ui/label';

type Inputs = {
  userEmail: string
  userPassword: string
}

function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {register, handleSubmit, formState: {errors}} = useForm<Inputs>();
  const [loginError, setLoginError] = useState<boolean>(false);

  const logUserIn = async(data: Inputs): Promise<void> => {
    setLoginError(false);
    try {
      const session = await authService.userLogin("", "");
      if(session) {
        const userData = await authService.getCurrentUser();
        if(userData) {
          dispatch(logIn(userData));
          navigate("/");
        }
      }

    } catch (error) {
      setLoginError(true);
    }
  }

  return (
    <div className='flex justify-center items-center w-[396px] h-[456px] border rounded-lg border-gray-200'>
      <div className="form-container">
        <form onSubmit={handleSubmit(logUserIn)}>
          <div className="form-controls">
            <Input className='w-[330px] h-[52px] p-2 m-4' placeholder='Enter Your Email' type='email' {...register("userEmail", {
              required: true, validate: {
                matchPattern: (value:string) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || "Email Address should be valid"
              }
            })}></Input>
            <Input className='w-[330px] h-[52px] p-2 m-4' placeholder='Password' type='password' {...register("userPassword",{
              required: true,
            })}></Input>

            <Button className='w-[330px] h-[52px] p-2 m-4' type='submit'>Log In</Button>
          </div>
        </form>
        <div className="error-container">
          {loginError &&
            <div className="error-message flex justify-center items-center">
              <Label className='font-normal text-red-600'>Login failed</Label>
            </div>
          }
        </div>
        <div className="divider border bg-grey-600  m-4"></div>
        <div className="register-container flex justify-center items-center">
          <Button variant={'secondary'} className='w-[240px] p-2 m-4'>Register</Button>
        </div>
      </div>
    </div>
  )
}

export default Login