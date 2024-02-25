import React, { useRef, useState } from 'react'
import { Link, parsePath, useNavigate } from 'react-router-dom';
import Button from './Button';
import Input from './Input';
import Logo from './Logo';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import authService from '../appwrite/auth'
import { login } from '../store/authSlice'
import Container from './container/Container';
import { showAlert, hideAlert } from '../store/alertSlice';
import Footer from './footer/Footer';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    authService.dispatch = dispatch;

    const { register, handleSubmit ,formState:{errors}} = useForm();     // used to register and submit input data
    const loading = useSelector((state) => state.auth.loading)
    const userData = useSelector((state) => state.auth.userData)

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const loginAccount = async (data) => {
        const { email, password } = data;
        try {
            dispatch(showAlert({
                message: "Logging In",
                type: "loading"
            }));
            const userLogin = await authService.login(email, password);
            if (userLogin) {
                const user = await authService.getCurrentUser();
                if (user) {
                    dispatch(login({ userData: user }));
                    navigate('/')
                    dispatch(showAlert({
                        message: "You are logged in",
                        type: "success"
                    }));
                }
            } else {
                dispatch(showAlert({
                    message: "Login Failed . Try again",
                    type: "warning"
                }));
            }
        } catch (error) {
            dispatch(showAlert({
                message: error.message,
                type: "error"
            }));
        };
    }

    return (
        <Container className={"flex flex-col justify-between"} backgroundImage={'/loginBg.svg'}>
           <div className='flex items-center justify-center p-16'>

            <form onSubmit={handleSubmit(loginAccount)} className='bg-gray-900 p-3 rounded-xl sm:rounded-3xl h-100 w-100'>
                {/* Registering input fields on hookform */}
                <Input label="Email" type="email" ref={emailRef} {...register("email", { required: true})} />
                {errors.email && <div className='text-red-600'>{errors.email.message}</div>}
                
                <Input label="Password" type="password" ref={passwordRef} {...register("password", { required: true  ,
                minLength:{
                    value :8 , message:"Minimum length is 8"
                },maxLength:{
                    value:25, message:"Maximum length is 25"
                }})} />
                {errors.password && <div className='text-red-600'>{errors.password.message}</div>}

                <div className='flex flex-col justify-between items-center py-3 h-100'>
                    <Button type='submit' classname='mx-0' bgColor='bg-green-700'>Log in</Button>
                    <p>
                        Don&apos;t have any account?&nbsp;
                        <Link to="/signup" className=' text-blue-500 underline'>Sign up</Link>
                    </p>
                </div>
            </form>
            
                </div>
<Footer/>
        </Container >
    )
}

export default Login
