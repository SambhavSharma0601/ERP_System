// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const UserProfile = () => {
//  const [user, setUser] = useState({});
//  const [editMode, setEditMode] = useState(false);

//  useEffect(() => {
//     // Fetch user profile from backend
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/auth/user/1'); // Assuming user ID is 1 for demonstration
//         setUser(response.data);
//       } catch (error) {
//         console.error('Error fetching user profile:', error);
//       }
//     };
//     fetchUser();
//  }, []);

//  const handleInputChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//  };

//  const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (editMode) {
//       // Update user profile
//       try {
//         const response = await axios.put(`http://localhost:5000/api/auth/user/${user._id}`, user);
//         setUser(response.data);
//         setEditMode(false);
//       } catch (error) {
//         console.error('Error updating user profile:', error);
//       }
//     } else {
//       // Create new user profile
//       try {
//         const response = await axios.post('http://localhost:5000/api/auth/create-user', user);
//         setUser(response.data);
//         setEditMode(true);
//       } catch (error) {
//         console.error('Error creating user profile:', error);
//       }
//     }
//  };

//  return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">User Profile</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input type="text" name="name" value={user.name || ''} onChange={handleInputChange} placeholder="Name" className="w-full p-2 border border-gray-300 rounded" />
//         <input type="email" name="email" value={user.email || ''} onChange={handleInputChange} placeholder="Email" className="w-full p-2 border border-gray-300 rounded" />
//         <input type="text" name="phone" value={user.phone || ''} onChange={handleInputChange} placeholder="Phone" className="w-full p-2 border border-gray-300 rounded" />
//         <input type="text" name="address" value={user.address || ''} onChange={handleInputChange} placeholder="Address" className="w-full p-2 border border-gray-300 rounded" />
//         <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">{editMode ? 'Update' : 'Create'} Profile</button>
//       </form>
//       {user && (
//         <div className="mt-8">
//           <h2 className="text-xl font-bold mb-2">Profile Information</h2>
//           <p>Name: {user.name}</p>
//           <p>Email: {user.email}</p>
//           <p>Phone: {user.phone}</p>
//           <p>Address: {user.address}</p>
//         </div>
//       )}
//     </div>
//  );
// };

// export default UserProfile;

// Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [profile, setProfile] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        rollNumber: '',
        group: '',
        branch: '',
        session: '',
        parentsName: '',
        address: '',
        bloodGroup: '',
    });
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/auth/profile');
            setProfile(response.data.profile);
            setFormData(response.data.profile);
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put('http://localhost:5000/api/auth/update-profile', formData);
            alert('Profile updated successfully');
            fetchProfile(); // Fetch updated profile data after submission
            setShowUpdateForm(false); // Hide the update form
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-semibold mb-4">User Profile</h1>
            <div>
                <div className="mb-4">
                    <p>Name: {profile.name}</p>
                    <p>Roll Number: {profile.rollNumber}</p>
                    <p>Group: {profile.group}</p>
                    <p>Branch: {profile.branch}</p>
                    <p>Session: {profile.session}</p>
                    <p>Parents Name: {profile.parentsName}</p>
                    <p>Address: {profile.address}</p>
                    <p>Blood Group: {profile.bloodGroup}</p>
                </div>

                {showUpdateForm ? (
                    <div>
                        <button onClick={() => setShowUpdateForm(false)} className="absolute top-0 right-0 mt-2 mr-2">
                            <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name">Name</label>
                                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="rollNumber">Roll Number</label>
                                    <input type="text" id="rollNumber" name="rollNumber" value={formData.rollNumber} onChange={handleChange} />
                                </div>
                                {/* Add input fields for other profile fields */}
                                <div>
                                    <label htmlFor="address">Address</label>
                                    <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="bloodGroup">Blood Group</label>
                                    <input type="text" id="bloodGroup" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} />
                                </div>
                            </div>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4">
                                Update Profile
                            </button>
                        </form>
                    </div>
                ) : (
                    <button onClick={() => setShowUpdateForm(true)} className="bg-blue-500 text-white px-4 py-2 mt-4">
                        Update Profile
                    </button>
                )}
            </div>
        </div>
    );
};

export default Dashboard;

