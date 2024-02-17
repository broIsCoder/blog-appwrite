import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Container from '../components/container/Container'

const Protected = ({ children, authentication = true }) => {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    const [loader, setLoader] = useState(false);

    useEffect(() => {
        // if page need authentication and user is not loggedin
        if (authentication && !authStatus) {
            navigate('/login');
        }//if page don't need authentication but user loggedin 
        else if (!authentication && authStatus) {
            navigate('/');
        }
    }, [authStatus, authentication, navigate]);

    return loader ?
        (
            <Container className={'flex items-center justify-center'}>
                <img src="/loading .gif" className='w-20 h-20' alt="loading" />
            </Container>
        )
        :
        (
            <Container>
                {children}
            </Container>
        )
}

export default Protected