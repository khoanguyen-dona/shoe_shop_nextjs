
import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import {
  getStorage,
  ref,
  deleteObject,
  uploadBytesResumable,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import app from '@/firebase'

const Jodit = ({desc, setDesc, setLoading, setDescImage}) => {
  const editor = useRef(null);
	const storage= getStorage(app)

	const config = useMemo(() => ({
			readonly: false,
			placeholder: 'Nhập nội dung ...',
      statusbar: false

  }),[desc])
  
  const handleImage = async (e) => {
      const file = e.target.files[0]
          let imageName = new Date().getTime() + file.name
          let imageRef = ref(storage, `product-desc/${imageName}`)
          try {
              setLoading(true)
              await uploadBytes(imageRef, file)
              const img_URL = await getDownloadURL(imageRef)
              console.log(img_URL)
              setDescImage(img_URL)
              
          } catch (err){
              console.log('error loading file to firebase', err)
          }  finally {
              setLoading(false)
          }   
  }

	return (
  <div className='flex flex-col md:flex-row   gap-2 ' >
    <div className='w-full md:w-4/5' >
		  <JoditEditor
        ref={editor}
        value={desc}
        config={config}
        tabIndex={1} // tabIndex of textarea
        onBlur={newContent => setDesc(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={newContent => {}}
      />
    </div>

    <div className='flex flex-col justify-end' >
      <label 
        title='Thêm ảnh'
        className='hover:bg-blue-100   rounded-lg p-1 hover:cursor-pointer flex flex-col w-12  transition  ' 
        htmlFor="quill-Image"
        >
          <img
              src='/upload-image.png'
              alt='Thêm ảnh'
              className='  w-12 hover:cursor-pointer object-cover   rounded-lg '        
          />
            
            <input  className='hidden' type="file"  accept='image/*' onChange={handleImage} id='quill-Image' />
        </label>  
    
    </div>

  </div>
	);
}

export default Jodit