import React, { useEffect, useState } from 'react';
import Navbar from "./Navbar";
import axios from 'axios';

const HomeStudent = () => {
  const [notices, setNotices] = useState([]);
  const [courseMaterials, setCourseMaterials] = useState([]);
  // Placeholder for Enrolled Courses and Attendance Report
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [attendanceReport, setAttendanceReport] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/get-files/Notice');
        setNotices(response.data);
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    };

    const fetchCourseMaterials = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/get-files/Course Material');
        setCourseMaterials(response.data);
      } catch (error) {
        console.error('Error fetching course materials:', error);
      }
    };

    // Placeholder for fetching Enrolled Courses and Attendance Report
    // const fetchEnrolledCourses = async () => {
    //   // Implement fetching logic here
    // };

    // const fetchAttendanceReport = async () => {
    //   // Implement fetching logic here
    // };

    fetchNotices();
    fetchCourseMaterials();
    // fetchEnrolledCourses();
    // fetchAttendanceReport();
  }, []);

  return (
    <div className="w-full">
      <Navbar />
      <div>
        {/* Premium-courses-Banner */}
        <div className="bg-gray-900 text-white py-12 px-6 font-[sans-serif]">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="md:w-1/2 text-center md:text-left mb-6 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">Unlock Your Potential</h2>
              <p className="text-base">
                Upgrade your skills with our premium courses. Enroll now and
                access exclusive content!
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <a
                href="javascript:void(0)"
                className="bg-blue-600 text-white font-semibold py-2.5 px-6 rounded hover:bg-blue-800 transition duration-300 ease-in-out"
              >
                Enroll Now
              </a>
            </div>
          </div>
        </div>
        {/* Cards */}
        <div className="grid grid-flow-col m-8 gap-6 ">
          <div className="bg-[#19191afc] h-[20rem] shadow-xl rounded-3xl">
            <h2 className="font-extrabold flex justify-center  p-4 border border-red-400 rounded-t-3xl bg-slate-300 text-2xl ">
              Notice Board
            </h2>
            {notices.map((notice) => (
              <>
                <div key={notice._id} className='flex justify-between p-4 mx-3 items-center'>
                  <h3 className='text-white text-xl'>{notice.title}</h3>
                  <a
                    // href="javascript:void(0)" 
                    href={`http://localhost:5000/api/auth/download-file${notice.file.split('uploads')[1]}`} target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white font-semibold py-2.5 px-6 rounded hover:bg-blue-800 transition duration-300 ease-in-out"
                  >
                    Download
                  </a>

                </div>
                <hr />
              </>
            ))}
          </div>
          <div className="bg-[#19191afc] h-[20rem] shadow-xl rounded-3xl">
            <h2 className="font-extrabold flex justify-center  p-4 border border-red-400 rounded-t-3xl bg-slate-300 text-2xl">
              Courses Material
            </h2>
            {courseMaterials.map((material) => (
              <>
              <div key={material._id} className='flex justify-between p-4 mx-3 items-center'>
                <h3 className='text-white text-xl'>{material.title}</h3>
                <a
                    // href="javascript:void(0)" 
                    href={`http://localhost:5000/api/auth/download-file${material.file.split('uploads')[1]}`} target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white font-semibold py-2.5 px-6 rounded hover:bg-blue-800 transition duration-300 ease-in-out"
                  >
                    Download
                  </a>
                {/* <a href={`http://localhost:5000/api/auth/download-file${material.file.split('uploads')[1]}`} target="_blank" rel="noopener noreferrer">Download</a> */}
              </div>
              <hr />
              </>
            ))}
          </div>
        </div>
        <div className="grid grid-flow-col m-8 gap-6">
          <div className="bg-slate-800 h-[20rem] shadow-xl rounded-3xl">
            <h2 className="bg-gray-900 text-gray-100 font-serif rounded-t-xl font-bold">
              Enrolled Courses
            </h2>
            {/* Placeholder for Enrolled Courses content */}
          </div>
          <div className="bg-slate-800 h-[20rem] shadow-xl rounded-3xl">
            <h2 className="bg-gray-900 text-gray-100 font-serif rounded-t-xl font-bold">
              Attendance Report
            </h2>
            {/* Placeholder for Attendance Report content */}
          </div>
        </div>
        <div className="grid grid-flow-col m-8 gap-6">
          <div className="bg-slate-800 h-[20rem] shadow-xl rounded-3xl">
            <h2 className="bg-gray-900 text-gray-100 font-serif rounded-t-xl font-bold">
              Grades
            </h2>
            {/* Placeholder for Grades content */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeStudent;
