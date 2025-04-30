// import React from 'react'
// import ReactQuill, { Quill } from "react-quill-new";
// import 'react-quill-new/dist/quill.snow.css';
// import  ImageResize  from "quill-image-resize-module-react";

//  import {
//     getStorage,
//     ref,
//     uploadBytes,
//     getDownloadURL,
//   } from "firebase/storage";
// import app from '@/firebase'

// const storage = getStorage(app);
// Quill.register('modules/imageResize', ImageResize);

// const Editor2 = ({desc, setDesc, setQuillImage, loading, setLoading}) => {
//     const imageHandler = () => {
//         const input = document.createElement("input");
//         input.setAttribute("type", "file");
//         input.setAttribute("accept", "image/*");
//         input.click();
//         input.onchange = async () => {
//             if (input !== null && input.files !== null) {
//             const file = input.files[0];
//             console.log(file)
//             await handleUploadImage(file)
//             }
//         };
//         }
//     // upload image gallery to firebase then push to imageGalleryUrl[]
//     const handleUploadImage = async (file) => {
//         let imageName = new Date().getTime() + file.name
//         let imageRef = ref(storage, `upload/test/${imageName}`)
//         try{
//             setLoading(true)
//             await uploadBytes(imageRef, file)
//             const img_URL = await getDownloadURL(imageRef)
//             console.log(img_URL)
//             setQuillImage(img_URL)
            
//         } catch (err){
//             console.log('error loading file', err)
//         }  finally {
//             setLoading(false)
//         }   
//     }   

//     const modules = {
//         toolbar:{
//             container: 
//             [
//                 [{ 'header': [1, 2, false] }],
//                 ['bold', 'italic', 'underline','strike', 'blockquote'],
//                 [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
//                 ['link', 'image', ],
//                 [{ 'color':[] }, { 'background': [] }],
//                 ['clean','code-block']
//             ] ,     
//             handlers:{
//                 image: imageHandler
//             }
//         },
//         imageResize: {
//             parchment: Quill.import('parchment'),
//             modules: ['Resize', 'DisplaySize']
//         },
//         clipboard: {
//             matchVisual: false,
//         },
//     }
      
//     const formats = [
//           'header',
//           'bold', 'italic', 'underline', 'strike', 'blockquote',
//           'list', 'bullet', 'indent',
//           'link', 'image', 'color', 'background','code-block'
//         ]


//   return (
//         <div className="text-editor  w-full xl:w-4/5 ">
//                 <ReactQuill theme="snow"
//                     modules={modules}
//                     formats={formats}
//                     value={desc}
//                     onChange={(e)=>setDesc(prev=>(prev+e.target.value))}            
//                 />
//         </div>
//   )
// }

// export default Editor2