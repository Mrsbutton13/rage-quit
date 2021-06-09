import React, { useState } from 'react'
import { Modal } from '../../context/PostModal'
import PostComment from '../PostComment'

import './CommentModal.css'


function PostCommentModal({post}) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <a className='comment' onClick={() => setShowModal(true)}>
       <i className="far fa-comment"></i>Comment 
      </a>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} >
          <PostComment post={post} />
        </Modal>
      )}
    </>
  )
}

export default PostCommentModal