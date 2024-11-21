import React from 'react'



const SideBar = ({currentPage,setCurrentPage}) => {

  const menu = ['Products','Orders','Categories','Users']
  return (
    <div className='flex flex-col space-y-2 mt-20 text-white '>
      {menu.map((m,index) => (
        <button key={index}
          value={m} 
          onClick={(e)=>setCurrentPage(e.target.value)}
          className={`border-2 hover:bg-black  transition p-4 font-bold 
          ${currentPage===m ? 'bg-black text-white':''  }`} 
        >
            {m}          
        </button>
        
      ))}    
    </div>
  )
}

export default SideBar