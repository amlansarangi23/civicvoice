"use client";
import { useEffect, useState } from "react";

interface UserDetails {
  username: string | null;
  email: string | null;
  locality: string | null;
}

const Display = () => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const res = await fetch("/api/user"); // Assuming /api/user is your endpoint
      if (res.ok) {
        const data = await res.json();
        console.log(data)
        setUserDetails(data);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div>
      {userDetails ? (
        <div>
          <h2>User Details</h2>
          <p>
            <strong>Name:</strong> {userDetails.username}
          </p>
          <p>
            <strong>Email:</strong> {userDetails.email}
          </p>
          <p>
            <strong>Locality:</strong> {userDetails.locality}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Display;
