import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import appwriteService from '../appwrite/config';
import Container from '../components/container/Container'
import { PostForm } from '../components';

const AddPost = () => {
  const slug = useParams();
  const navigate = useNavigate();

  const [post, setpost] = useState(null);
  return (
    <PostForm />
  )
}

export default AddPost