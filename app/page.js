// "use client";

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const UsersList = () => {
//   const [users, setUsers] = useState([]); 
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/users');
//         setUsers(response.data); 
//       } catch (err) {
//         setError('Error fetching users');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <ul>
//       {users.length > 0 ? (
//         users.map((user) => (
//           <li key={user.id}>
//             {user.name} - {user.email}
//           </li>
//         ))
//       ) : (
//         <li>No users found</li>
//       )}
//     </ul>
//   );
// };

// export default UsersList;
/////

import clientPromise from "../lib/mongodb"; 

export default async function Home() {
  let users = [];
  let error = null;

  try {
    
    const client = await clientPromise;
    const db = client.db(); 

    // جلب المستخدمين من مجموعة "users"
    users = await db.collection('users').find({}).toArray(); 
  } catch (err) {
    console.error("Error fetching users:", err);
    error = err.message;
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">Users</h1>
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user._id} className="mb-2">
              {user.name} ({user.email})
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </main>
  );
}
