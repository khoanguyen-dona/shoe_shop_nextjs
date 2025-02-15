'use client'
import React from 'react'

import ProductCard from '@/components/ProductCard'
import { useState ,useEffect} from 'react'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useSelector } from 'react-redux';
import { publicRequest } from '@/requestMethod';
import Loader from '@/components/Loader';
import { Filter } from '@/components/Filter';
import Pagination from '@/components/Pagination';

const Shoe = () => {
    const [loading, setLoading] = useState(true)
    const [category, setCategory] = useState(['Giày'])
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState()
    const [limit, setLimit] = useState(12)
    const addToWishlist_loading = useSelector((state)=>state.loading.status)
    const user =useSelector((state)=>state.user.currentUser)
    const wishlist = useSelector((state)=> state.wishlist.userWishlist)
    const wishlistArray = []
    wishlist?.products?.map((item)=> wishlistArray.push(item._id))
    const [reload,setReload] = useState(false)

    const size_data = ['6 US','6.5 US','7 US','7.5 US','8 US','8.5 US','9 US','9.5 US','10 US','10.5 US',
      '11 US']
    const [size,setSize]=useState('');
    const [color, setColor] = useState('')
    const [price, setPrice] = useState([0,20000000])
    
    const[filter,setFilter]=useState(false)
    const[products, setProducts]=useState([])

    const [categoryList, setCategoryList] = useState([])
    const [subCategories, setSubCategories] = useState([])
    

    // fetching categories
    useEffect(() => {
      var categories = []
      var subCatArray = []
      
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
 

  const handlePrice = (e) => {
        setPrice(e.target.value)
  }

  // fetching products
  useEffect(() => {
      setLoading(true)
      const getProducts = async () => {
        try {    
          const res = await publicRequest.get(`/product?category=${category}&color=${color}&size=${size}&page=${page}&limit=${limit}&minPrice=${price[0]}&maxPrice=${price[1]}`)
          if(res.data){
            setProducts(res.data.products)
            setTotalPage(res.data.totalPage)
            setLoading(false)
          }
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
         src="https://firebasestorage.googleapis.com/v0/b/adidas-shop-d0636.appspot.com/o/upload%2F1735961276128Giay_Ultraboost_5_trang_ID8810_HM4%20(1).avif?alt=media&token=63f63bce-9501-4790-b3ff-521719d0383f" 
         alt="" />
        <h1 className='text-4xl font-bold text-center mt-5' >  GIÀY </h1>
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
          {products.length>0 &&  products?.map((d,index)=>(
            <ProductCard key={index} data={d} user={user}  wishlistArray={wishlistArray} />         
          ))}  
        </div>

        {/* pagination */}
        <Pagination page={page} totalPage={totalPage} setPage={setPage} />
      </div>
      
      {/* filter popup */} 
      <Filter size={size} color={color} size_data={size_data} categoryList={categoryList} subCategories={subCategories} category={category} 
        filter={filter} price={price} setPrice={setPrice}  setCategory={setCategory} handleFilterClick={handleFilterClick} setPage={setPage} 
        setColor={setColor} setSize={setSize} 
      />
           
    </div>
  )
}

export default Shoe