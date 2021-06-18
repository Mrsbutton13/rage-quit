import React, { useState } from 'react'
import { Modal } from '../../context/PostModal'
import PostForm from '../PostForm'
import '../PostForm/PostForm.css'


function PostFormModal() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <button className='create' onClick={() => setShowModal(true)}>
        Tell others what you're thinking about.
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} >
          <PostForm />
        </Modal>
      )}
    </>
  )
}

export default PostFormModal