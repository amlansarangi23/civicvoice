"use client";
import { useEffect, useState } from "react";

interface UserDetails {
  id: string;
  username: string;
  email: string;
  localityId: string;
  localityName: string;
}

const Display = () => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await fetch("/api/user");
        if (!res.ok) throw new Error("Failed to fetch user details");

        const data = await res.json();
        console.log("User Data:", data);
        setUserDetails(data);
      } catch (error) {
        console.error("Error fetching user details:", error);
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
            <strong>Locality ID:</strong> {userDetails.localityId}
          </p>
          <p>
            <strong>Locality:</strong> {userDetails.localityName}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Display;
