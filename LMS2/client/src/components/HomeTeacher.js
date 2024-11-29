
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// const HomeTeacher = () => {
//   const [data, setData] = useState({
//     user: "",
//     name: "",
//     file: null,
//   });

//   const [files, setFiles] = useState([]);

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     if (id === 'file') {
//       setData(prevData => ({
//         ...prevData,
//         [id]: e.target.files[0],
//       }));
//     } else {
//       setData(prevData => ({
//         ...prevData,
//         [id]: value,
//       }));
//     }
//   };

//   const handleSubmit = async () => {
//     const formData = new FormData();
//     formData.append('user', data.user);
//     formData.append('name', data.name);
//     formData.append('file', data.file,); // Append file with its name

//     console.log(data.name);
//     console.log(data.user);
//     console.log(data.file); // Logging the file directly

//     try {
//       const response = await axios.post("http://localhost:5000/api/auth/upload-files", formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       window.location.reload();
//       console.log(response);
//     } catch (err) {
//       console.log("error", err);
//     }
//   };



//   useEffect(() => {
//     const fetchFiles = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/auth/get-files");
//         setFiles(response.data)
//       } catch (err) {
//         console.error("Error fetching files:", err);
//       }
//     };

//     fetchFiles();
//   }, []);

//   return (
//     <>
//       <div>
//         <div className='bg-[#111827] py-10 min-h-[100vh] flex flex-col text-white justify-center'>

//           <div className="max-w-sm mx-auto mt-[3%]">
//             <div className="mb-5 text-2xl">
//               <label htmlFor="base-input" className="block mb-2  font-medium text-gray-900 dark:text-white">User Name</label>
//               <input onChange={handleChange} type="text" id="user" placeholder='Enter Your Name: ' className="bg-gray-50 border w-[400px] text-xl px-4 py-2 border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
//             </div>
//             <div className="mb-5 text-2xl">
//               <label htmlFor="base-input" className="block mb-2  font-medium text-gray-900 dark:text-white">File Name</label>
//               <input onChange={handleChange} type="text" id="name" placeholder='Enter File Name: ' className="bg-gray-50 border w-[400px] text-xl px-4 py-2 border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
//             </div>
//             <div>
//               <input onChange={handleChange} type="file" className='text-white' accept='application/pdf' name="file" id="file" />
//             </div>
//             <button onClick={handleSubmit} className="w-full my-10 cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
//             border-blue-600
//             border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
//             active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
//               Submit
//             </button>
//           </div>
//           <div className='grid grid-cols-2 gap-10'>
//             {files && files.map((file, index) => (
//               <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg shadow-md">
//                 <p className="font-semibold text-lg mb-2">User: {file.user}</p>
//                 <p className="text-gray-600 mb-2">File Name: {file.name}</p>
//                 <a rel="noopener noreferrer" target="_blank" href={`http://localhost:5000/Files/${file.file}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
//                   Click to view
//                 </a>
//                 <a rel="noopener noreferrer" target="_blank" href={`http://localhost:5000/api/auth/Files/${file.file}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
//                   Click to view
//                 </a>
//                 <p>{file.file}</p>
//                 <a href={`http://localhost:5000/api/auth/download-file/${file.file}`} download className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
//                   Download PDF
//                 </a>



//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default HomeTeacher
// TeacherHome.js
import React, { useState } from 'react';
import axios from 'axios';
import Quiz from './Quiz';

const HomeTeacher = () => {
 const [title, setTitle] = useState('');
 const [type, setType] = useState('Notice');
 const [file, setFile] = useState(null);

 const handleFileChange = (e) => {
    setFile(e.target.files[0]);
 };

 const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('type', type);
    formData.append('file', file);
    formData.append('email', localStorage.getItem('email')); // Assuming you store user ID in localStorage

    try {
      const response = await axios.post('http://localhost:5000/api/auth/upload-file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      // Handle success
    } catch (error) {
      console.error(error);
      // Handle error
    }
 };

 return (
  <>
    <form onSubmit={handleSubmit} className='mb-5 p-5'>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="Notice">Notice</option>
        <option value="Course Material">Course Material</option>
      </select>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
    <Quiz />
    </>
 );
};

export default HomeTeacher;
