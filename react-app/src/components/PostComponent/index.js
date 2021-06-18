import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { deletePost, getPost } from '../../store/post'
import PostCommentModal from '../CommentModal'
import PostComments from '../PostComments'
import './Post.css'

function Post ({ user, post }) {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser.user)
  const posts = useSelector(state => Object.values(state.post))

  let postId 
  {posts.map(aPost => {
    if(aPost?.id == post?.id) {
      postId = aPost?.id
    }
  })}

  const deleteAPost = async (postId) => {
      await dispatch(deletePost(postId))
      await dispatch(getPost())
  }
  
let userLinks
  if (post?.user_id === currentUser.id){
    userLinks = 
    <>
    <div className='likes'>
    <div className='comment-div'>
      <PostCommentModal post={post}/>
    </div>
      <div>
        <a onClick={() => deleteAPost(postId)} >
      <i className="far fa-trash-alt"></i>
      Delete
        </a>
    </div>
    </div>
    </>
  } else {
    userLinks = 
    <>
    <div className='likes'>
    <div className='comment-div'>
      <PostCommentModal post={post}/>
    </div>
    </div>
    </>
  }


  return (
    <>
    <div className='post-container'>
      <img className='post-user' src={user?.avatar}/>
      <NavLink className='post-username' to={`/users/${user?.id}`}>
        {user?.username}
      </NavLink>
      <div className='post-body'>
        {post?.body}
      </div>
      <div className='image-holder'>
      <img className='post-img' src={post?.post_img}/>
      </div>
      <span>
        <hr/>
      </span>
      {userLinks}
    <span>
        <hr/>
      </span>
      <div className='postComments'>
        <PostComments post={post} user={user}/>
      </div>
    </div>
    </>
  )
}

export default Post
