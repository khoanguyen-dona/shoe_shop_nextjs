'use client'
import React from 'react'
import { useParams } from 'next/navigation';

const ProductDetail = () => {

    const productId = useParams().id
  return (
    <div>produc_id là : {productId} </div>
  )
}

export default ProductDetail