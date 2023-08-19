import React from 'react'
import AIBlogAsst from './AIBlogAsst'
import { useParams } from 'react-router-dom'

function AISinglePostAsst() {
    const id = useParams();
  return (
    <AIBlogAsst id = {id} />
  )
}

export default AISinglePostAsst
