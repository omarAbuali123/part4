"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Profile = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      // Fetch user data if needed
      // setUser(userData);
    }
  }, [router]);

  return (
    <div>
      {user ? (
        <h1>Welcome, {user.username}</h1>
      ) : (
        <p>Loading...</p>
        
      )}
    </div>
  );
};

export default Profile;
