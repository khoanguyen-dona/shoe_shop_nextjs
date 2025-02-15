'use client'

import React from 'react'

import ProductCard from '@/components/ProductCard'
import { useState, useEffect } from 'react'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { publicRequest } from '@/requestMethod';
import { useSelector } from 'react-redux';
import Loader from '@/components/Loader';
import { Filter } from '@/components/Filter';
import Pagination from '@/components/Pagination';

const Clothes = () => {
    const addToWishlist_loading = useSelector((state)=>state.loading.status)
    const [loading, setLoading] = useState(true)
    const [category, setCategory] = useState(['Áo','Quần'])
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState()
    const [limit, setLimit] = useState(12)
    const user =useSelector((state)=>state.user.currentUser)
    const wishlist = useSelector((state)=> state.wishlist.userWishlist)
    const wishlistArray = []
    wishlist?.products?.map((item)=> wishlistArray.push(item._id))

    const size_data = ['S','M','L','XL']
    const [size,setSize]=useState('');
    const [color, setColor] = useState('')
    const [price, setPrice] = useState([0,20000000])

    const[filter,setFilter]=useState(false)
    const[products,setProducts]=useState([])

    const [categoryList, setCategoryList] = useState([])
    const [subCategories, setSubCategories] = useState([])

    // fetching categories
    useEffect(() => {
      var categories = []
      var subCatArray = []
      setLoading(true)
      const getCategories = async () => {
          try {
              const res = await publicRequest.get('/category')
              if(res.data){
                  res.data.categories.map((item) =>  {
                      categories.push(item.name)
                      const getSubCategories = async () => {    
                          const res2 = await publicRequest.get(`/sub-category/${item._id}`)
                          if(res2.data){
                              res2.data.subCategory.map((subCat)=> {
                                  categories.push(subCat.name)
                                  subCatArray.push(subCat.name)
                              })
                          }
                      }
                      getSubCategories()
                  })
              }
              setSubCategories(subCatArray)
              setCategoryList(categories)
              setLoading(false)
          
          } catch(err){
              console.log('err while fetching categories', err)
          }
      }
      getCategories()
    }, [])

    //fetching products
    useEffect(() => {
      setLoading(true)
      const getProducts = async () => {
        try {    
          const res = await publicRequest.get(`/product?category=${category}&color=${color}&size=${size}&page=${page}&limit=${limit}&minPrice=${price[0]}&maxPrice=${price[1]}`)
          setProducts(res.data.products)
          setTotalPage(res.data.totalPage)
          setLoading(false)
        } catch {}
      }
      getProducts();
    },[page,price,size,color,category])

    // toggle filter
    const handleFilterClick = () => {
      setFilter((prev) => !prev) ;
    };

  return (
    <div className={` ${loading||addToWishlist_loading?'bg-white opacity-50':''} `} >
      <div className='flex flex-col' >
        <img  className='object-cover w-full h-[300px] '  
         src="https://firebasestorage.googleapis.com/v0/b/adidas-shop-d0636.appspot.com/o/upload%2Fao%2Fan%20thun%20adidas%20basketball%2FAo_Thun_adidas_Basketball_trang_JE3762_21_model.avif?alt=media&token=24dcab7e-9e46-4f94-85a7-a07ec67f1dcd" 
         alt="" />
        <h1 className='text-4xl font-bold text-center mt-5' >  QUẦN ÁO </h1>
        {loading||addToWishlist_loading ?  <div className='flex justify-center  ' >  <Loader  color={'inherit'} />  </div> : ''}
        <div className='flex justify-end'>
          <button  
            onClick={handleFilterClick}
            className='mr-2 mt-2 p-2 border-2 transition border-black text-xl w-32 font-bold flex-end hover:bg-black
            hover:text-white' >
              Bộ lọc
              <FilterAltIcon fontSize='large' />
          </button>
        </div>
        {/* product list */}
        <div className=' grid lg:grid-cols-4 md:grid-cols-2 xs:grid-cols-2   mt-2  mx-2' >
          {products.length>0 && products?.map((d,index)=>(
            <ProductCard key={index} data={d}   user={user}  wishlistArray={wishlistArray} />
          ))}  
        </div>

        {/* pagination */}
        <Pagination page={page} totalPage={totalPage} setPage={setPage} />
      </div>
      
      {/* filter popup */} 
      <Filter size={size} color={color} size_data={size_data} categoryList={categoryList} subCategories={subCategories} category={category} filter={filter} price={price}
        setPrice={setPrice}  setCategory={setCategory} handleFilterClick={handleFilterClick} setPage={setPage} setColor={setColor} setSize={setSize} 
      />
     
    </div>
  )
}

export default Clothes