// import { useState } from "react";
// import axios from "axios";

// const CompleteProfile = () => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     const uniqueId = user.uniqueId;
//     const role = user.role;
//     const name=user.name;

//     const [formData, setFormData] = useState({
//         fatherName: "",
//         motherName: "",
//         dob: "",
//         contact: "",
//         address: "",
//         department: "",
//         email: ""
//     });

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post("http://localhost:8080/api/profile/complete-profile", {
//                 uniqueId,
//                 role,
//                 name,
//                 profileData: formData
//             });
//             alert("Profile completed successfully!");
//         } catch (error) {
//             console.error("Error updating profile:", error);
//             alert("Failed to complete profile. Please try again.");
//         }
//     };
//     console.log(formData);

//     return (
//         <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px", margin: "auto" }}>
//             <h2>Complete Your Profile</h2>
//             {/* <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required /> */}
//             <input type="text" name="fatherName" placeholder="Father Name" value={formData.fatherName} onChange={handleChange} required />
//             <input type="text" name="motherName" placeholder="Mother Name" value={formData.motherName} onChange={handleChange} required />
//             <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
//             <input type="text" name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} required />
//             <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
//             <input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleChange} required />
//             <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
//             <button type="submit">Submit</button>
//         </form>
//     );
// };

// export default CompleteProfile;
