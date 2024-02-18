import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import appwriteServcie from '../appwrite/config'
import { Button, Loading } from '../components'
import parse from 'html-react-parser'
import { useDispatch, useSelector } from 'react-redux'
import { showAlert } from '../store/alertSlice'

const Post = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  appwriteServcie.dispatch = dispatch ;
  const [loading, setloading] = useState(false);

  const [post, setpost] = useState(null);
  const { slug } = useParams();
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  const deletePost = () => {
    setloading(true);
    appwriteServcie.deletePost(post.$id).then((status) => {
      if (status) {
        const deleted = appwriteServcie.deleteFile(post.featuredImage);
        if (deleted) {
          // deleted.then((message)=>{
          //   console.log("deleted:",message)
          // })
          dispatch(showAlert({
            message: "Post has been Deleted",
            type: "success"
          }));
          navigate("/all-posts");
        } else {
          dispatch(showAlert({
            message: "Post Img was not Deleted",
            type: "error"
          }));
        }
      } else {
        dispatch(showAlert({
          message: "Post was not Deleted",
          type: "error"
        }));
      }
    });
    setloading(false);
  }

  useEffect(() => {
    if (slug) {
      appwriteServcie.getPost(slug).then((post) => {
        if (post) {
          setpost(post);
        }
        else {
          navigate('/all-posts');
        }
      })
    }
  }, [slug])

  return post ? (
    <div className='w-full relative sm:h-[670px] flex gap-2 sm:gap-2 ms:gap-10 flex-col justify-center items-center sm:flex-row bg-secondary p-2 ms:p-10'>
      {
        loading &&
        <div className='w-full h-full absolute top-0 left-0 bg-black opacity-90'>
          <Loading />
        </div>
      }
      <div className='sm:h-full h-[450px] sm:w-1/2  w-full'>
        <div className="relative w-full h-full bg-black duration-200 rounded-xl object-cover">
          <div className={`status ${post?.status === "active" ? 'bg-green-400':"bg-red-600"} h-[30px] w-[30px] border-black border-[5px] rounded-full absolute top-1 right-1 z-[99]`}></div>
          
          <img src={appwriteServcie.getFilePreview(post.featuredImage)} alt={post.title} className='relative h-full w-full object-scale-down' />
          {isAuthor && (
            <div className='bottom-1 absolute right-1 flex gap-1'>
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor='bg-gray-600 rounded-full'>Edit</Button>
              </Link>
              <Button bgColor='bg-gray-600 rounded-full' onClick={deletePost}>Delete</Button>
            </div>
          )}
        </div>
      </div>
      <div className='sm:h-full h-full sm:w-1/2 w-full overflow-y-auto p-3 bg-white rounded-xl flex flex-col'>
  <h1 className='text-3xl font-bold mb-6 text-black break-words'>{post.title}</h1>
  <div className='text-black break-words'>
  {/* using html-react-parser for creatingElement html element in react */}
    {parse(post.content)}
  </div>
</div>

    </div>
  ) : null

}

export default Post