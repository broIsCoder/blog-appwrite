import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import Input from './Input';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import authService from '../appwrite/auth'
import { login } from '../store/authSlice'
import Container from './container/Container';
import { showAlert, hideAlert } from '../store/alertSlice';
import {Footer} from '../components'

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    authService.dispatch = dispatch;

    const { register, handleSubmit, formState: { errors } } = useForm();     // used to register and submit input data
    const userNameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const user = useSelector((state) => state.auth.userSignUp)

    const submit = async (data) => {
        try {
            dispatch(showAlert({
                message: "Signing Up",
                type: "loading"
            }));
            const userSignUp = await authService.createAccount(data);
            if (userSignUp) {
                const user = await authService.getCurrentUser();
                if (user) {
                    dispatch(login({ userData: user }));
                    navigate('/')
                    dispatch(showAlert({
                        message: "You are signed in",
                        type: "success"
                    }));
                }
            } else {
                dispatch(showAlert({
                    message: "SignUp Failed . Try again",
                    type: "warning"
                }));
            }
        } catch (error) {
            dispatch(showAlert({
                message: error.message,
                type: "error"
            }));
        }
    }

    return (
        <Container className={'flex flex-col justify-between'} backgroundImage={'/signupBg.svg'}>
            <div className='flex items-center justify-center bg-center p-8'>
            <form onSubmit={handleSubmit(submit)} className='bg-gray-900 p-3 rounded-xl sm:rounded-3xl h-100 w-100 relative'>
                {/* Registering input fields on hookform */}
                <Input label="User Name" type="text" ref={userNameRef} {...register("username", { required: true ,
                minLength:{
                    value :3 , message:"Minimum value is 3"
                },maxLength:{
                    value:25, message:"Maximum value is 25"
                } 
                })} />
                {errors.username && <span className='text-red-600'>{errors.username.message}</span>}

                <Input label="Email" type="email" ref={emailRef} {...register("email", { required: true })} />
                {errors.email && <span className='text-red-600'>{errors.email.message}</span>}

                <Input label="Password" type="password" ref={passwordRef} {...register("password", { required: true ,
                minLength:{
                    value :8 , message:"Minimum value is 8"
                },maxLength:{
                    value:25, message:"Maximum value is 25"
                } })} />
                {errors.password && <span className='text-red-600'>{errors.password.message}</span>}

                <div className='flex flex-col justify-between items-center py-3'>
                    <Button type='submit' classname='mx-0' bgColor='bg-green-700'>Sign up</Button>
                    <p>
                        Already have an account ?&nbsp;
                        <Link to="/login" className=' text-blue-500 underline'>Log in</Link>
                    </p>
                </div>
            </form>
            </div>
            <Footer/>
        </Container >
    )
}

export default Signup
