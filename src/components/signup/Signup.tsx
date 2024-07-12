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
import { Field, FieldProps, Form, Formik, FormikProps } from 'formik';
import { faFacebook, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { authFormHelperService } from '../../form-services/auth-form-services'
import { ILoginData, ISignUpData } from '../../models/AuthData'

interface SignupProps {
  showRegister: boolean;
}

function Signup({ showRegister = true }: SignupProps) {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signinError, setSigninError] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(showRegister);

  const signUpValidationSchema = authFormHelperService.getSignUpFormSchema();
  const signUpValues = authFormHelperService.getSignUpDefaultValues();

  const loginValues = authFormHelperService.getLoginDefaultValues();
  const loginValidationSchema = authFormHelperService.getLoginFormSchema();

  const signUserUp = async (data: ISignUpData) => {
      try {
          const session = await authService.createAccount(data);
          console.log(session);
      } catch (error) {
          setSigninError(true)
      }
  }
    
  const logUserIn = async(data: ILoginData): Promise<void> => {
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
    <div className="main-container grid place-items-center w-screen h-screen">
      <div className={'container'+ (isLogin ? ' active': '')}>
        <div className="form-container sign-up">
          <Formik key={1} initialValues={signUpValues} validationSchema={signUpValidationSchema} onSubmit={signUserUp} validateOnChange>
            {
              () => {
                return (
                  <Form>
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
                      <Field name='email'>
                        {
                          ({field, meta}: FieldProps) => {
                            return (
                              <div className="form-control">
                                <Input id='email' placeholder='Email' type='email' {...field} />
                                {
                                  (meta.error && meta.touched) && 
                                  <span className='text-red-500 place-self-start pt-1 pl-1'>{meta.error}</span>
                                }
                              </div>
                            )
                          }
                        }
                      </Field>
                      <Field name='username'>
                        {
                          ({field, meta}: FieldProps) => {
                            return (
                              <div className="form-control">
                                <Input id='username' placeholder='User Name' type='text' {...field} />
                                {
                                  (meta.error && meta.touched) && 
                                  <span className='text-red-500 place-self-start pt-1 pl-1'>{meta.error}</span>
                                }
                              </div>
                            )
                          }
                        }
                      </Field>
                      <Field name='password'>
                        {
                          ({field, meta}: FieldProps) => {
                            return (
                              <div className="form-control">
                                <Input id='password' placeholder='Password' type='password' {...field} />
                                {
                                  (meta.error && meta.touched) && 
                                  <span className='text-red-500 place-self-start pt-1 pl-1'>{meta.error}</span>
                                }
                              </div>
                            )
                          }
                        }
                      </Field>
                    </div>
                    <Button type='submit' className='register-button'>Register</Button>
                  </Form>
                )
              }
            }
          </Formik>
          <div className="error-container">
              {signinError &&
              <div className="error-message error-message flex justify-center items-center">
                  <Label className='font-normal text-red-600'>Sign Up Failed</Label>
              </div>
              }
          </div>
        </div>
        <div className="form-container sign-in">
        <Formik key={2} initialValues={loginValues} validationSchema={loginValidationSchema} onSubmit={logUserIn} validateOnChange>
          {
            () => {
              return (
                <Form>
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
                    <Field name='username'>
                      {
                        ({field, meta}: FieldProps) => {
                          return (
                            <div className="form-control">
                              <Input id='username' placeholder='User Name/Email' type='text' {...field} />
                              {
                                (meta.error && meta.touched) && 
                                <span className='text-red-500 place-self-start pt-1 pl-1'>{meta.error}</span>
                              }
                            </div>
                          )
                        }
                      }
                    </Field>
                    <Field name='password'>
                      {
                        ({field, meta}: FieldProps) => {
                          return (
                            <div className="form-control">
                              <Input id='password' placeholder='Password' type='password' {...field} />
                              {
                                (meta.error && meta.touched) && 
                                <span className='text-red-500 place-self-start pt-1 pl-1'>{meta.error}</span>
                              }
                            </div>
                          )
                        }
                      }
                    </Field>
                  </div>
                  <Button type='submit' className='login-button'>Login</Button>
                </Form>
              )
            }
          }
        </Formik>
          <div className="error-container">
              {loginError &&
              <div className="error-message error-message flex justify-center items-center">
                  <Label className='font-normal text-red-600'>Sign Up Failed</Label>
              </div>
              }
          </div>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left" onClick={() => setIsLogin(false)}>
              <span>Hello, There!</span>
              <span>Log In?</span>
            </div>
            <div className="toggle-panel toggle-right" onClick={() => setIsLogin(true)}>
              <span>Welcome Back</span>
              <span>Sign Up?</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup