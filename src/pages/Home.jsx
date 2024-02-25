import React, { useEffect } from 'react'
import Container from '../components/container/Container'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Footer } from '../components'

const Home = () => {

  const authStatus = useSelector((state) => state.auth.status);
  const user = useSelector((state) => state.auth.userData);

  return (
    <Container className='flex flex-col justify-between' backgroundImage={'/homeBg.svg'}>
      <div className='flex flex-col items-center sm:justify-center'>
        {
          authStatus ?
            <marquee behavior="" direction="lef-to-right" className='text-4xl font-bold sm:text-8xl h-12 sm:h-32 my-7'>Welcome back ! {user.name}</marquee>
            :
            <marquee behavior="" direction="lef-to-right" className='text-4xl font-bold sm:text-8xl h-12 sm:h-32 my-7'>Welcome to Youtube Blogs</marquee>
        }
        <p className='text-2xl mx-[20px] mb-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi odio maxime quod numquam cupiditate quam, consectetur sint ipsam illo. Veritatis molestias magni eius?</p>
        {!authStatus ?
          <div className='flex gap-4'>
            <Link to="/login" className=' text-black font-bold px-4 py-1 bg-blue-400 rounded-xl'>Log in</Link>
            <Link to="/signup" className=' text-black font-bold px-4 py-1 bg-green-500 rounded-xl'>Sign up</Link>
          </div>
          :
          <div className='flex flex-col xxs:flex-row items-center gap-2 bg-gray-900 p-2 rounded-xl'>
            <p className='font-bold'>
              {user?.email}
            </p>
          </div>
        }
      </div>
      <Footer />

    </Container>
  )
}

export default Home