import React from 'react'
import { useState } from 'react';
import ReactQuill, { Quill } from "react-quill-new";
import 'react-quill-new/dist/quill.snow.css';
import  ImageResize  from "quill-image-resize-module-react";
import QuillImageDropAndPaste from 'quill-image-drop-and-paste'
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import app from '@/firebase'

const storage = getStorage(app);
Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/imageDropAndPaste', QuillImageDropAndPaste)

const RichTextEditor = ({ desc, setDesc, setQuillImage, setLoading }) => {
    // const dragAndDropHandler = async (imageDataUrl, type, imageData) => { 
    //     const file = imageData.toFile()
    //     console.log(file)
    //     await handleUploadImage(file)       
    // };
        
    // upload image gallery to firebase then push to imageGalleryUrl[]
    // const handleUploadImage = async (file) => {
    //     let imageName = new Date().getTime() + file.name
    //     let imageRef = ref(storage, `upload/test/${imageName}`)
    //     try{
    //         setLoading(true)
    //         await uploadBytes(imageRef, file)
    //         const img_URL = await getDownloadURL(imageRef)
    //         console.log(img_URL)
    //         setQuillImage(img_URL)
            
    //     } catch (err){
    //         console.log('error loading file', err)
    //     }  finally {
    //         setLoading(false)
    //         setReload(!reload)
    //     }   
    // }   

    const handleQuillImage = async (e) => {
            const file = e.target.files[0]
            let imageName = new Date().getTime() + file.name
            let imageRef = ref(storage, `upload/test/${imageName}`)
            try{
                setLoading(true)
                await uploadBytes(imageRef, file)
                const img_URL = await getDownloadURL(imageRef)
                console.log(img_URL)
                setQuillImage(img_URL)
                
            } catch (err){
                console.log('error loading file to firebase', err)
            }  finally {
                setLoading(false)
            }   
        }

    const modules = {
        toolbar:{
            container: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline','strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                [{ 'script': 'sub'}, { 'script': 'super' }],
                ['link',],
                [{ 'color':[] }, { 'background': [] }],   
                [{ 'font': [] }],
                [{ 'align': [] }],
                ['code-block'],
                [{ 'direction': 'rtl' }],
                ['clean']
            ] ,     
            // handlers:{
            //     image: imageHandler
            // }
        },
        // imageDropAndPaste: {
        //     // add an custom image handler
        //     handler: dragAndDropHandler,
        //   },
        
        imageResize: {
            parchment: Quill.import('parchment'),
            modules: ['Resize', 'DisplaySize']
        },
        clipboard: {
            matchVisual: false,
        },
    }
      
    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent','script',
        'link', 'image', 'color', 'background','code-block','align',
        'direction',
    ]


  return (
    <div className='flex flex-col md:flex-row gap-2  '>
        <div  className='flex flex-col mb-2 md:mb-12 mt-12  md:mt-12' >
            <label 
            title='Thêm ảnh'
            className='hover:bg-blue-100 h-14  rounded-lg p-1 hover:cursor-pointer flex flex-col w-16  transition  ' 
            htmlFor="quill-Image"
            >
                <img
                    src='/upload-image.png'
                    alt='Thêm ảnh'
                    className='  w-16 hover:cursor-pointer object-cover   px-2  rounded-lg '        
                />
                
                <input  className='hidden' type="file"  accept='image/*' onChange={handleQuillImage} id='quill-Image' />
            </label>    
        </div>
        <div className="  w-full md:w-4/5    mb-12 ">
                <ReactQuill theme="snow"
                    className='h-[400px] md:h-[700px] xl:h-[600px] '
                    modules={modules}
                    formats={formats}
                    value={desc}
                    onChange={setDesc}            
                />
        </div>
        
    </div>
  )
}

export default RichTextEditor