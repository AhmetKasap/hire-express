'use client'
import React from 'react'

const page = ({params}) => {
    const { id } = React.use(params)
  return (
    <div>{id}</div>
  )
}

export default page