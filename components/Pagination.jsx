import React from 'react'

const Pagination = ({page, totalPage, setPage}) => {

const handlePrev =() => {
    setPage((prev)=>prev-1)
    }

const handleNext =() => {
    setPage((prev)=>prev+1)
}

  return (
    <div className='flex justify-around mt-24' >
          <div>
            <button  
                onClick={handlePrev} disabled = {page===1}
                className={`font-bold  transition p-3  
                  ${page===1?' text-gray-400 hover:cursor-not-allowed':' text-black hover:text-white hover:bg-black'} `} >
                    PREVIOUS</button>
          </div>
          <div className='p-3' >
            Page 
            <span className='mx-2  transition   ' > 
              <select value={page} onChange={(e)=>setPage(parseInt(e.target.value))}
                  className='border-gray-300 hover:border-black hover:cursor-pointer transition border-2 p-2  '  >
               {Array.from({length: totalPage}, (_, i)=> (
                  <option key={i} value={i+1}>{i+1}</option>
               ))}
              </select> 
             
            </span> 
            of {totalPage}
          </div>
          <div>
            <button
                onClick={handleNext} disabled ={page===totalPage}
                className={`font-bold transition p-3  ${page===totalPage?' text-gray-400 hover:cursor-not-allowed':' text-black hover:text-white hover:bg-black'} `}  >NEXT</button>
          </div>
        </div>
  )
}

export default Pagination