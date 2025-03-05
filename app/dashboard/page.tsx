"use client";

interface TagType {
  id: string;
  title: string;
  issues: any[];
}

import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "@/components/Loader";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const [tags, setTags] = useState<TagType[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();

  async function getTags() {
    try {
      const { data } = await axios.get("/api/tags/getalltags");
      // Sort the tags in descending order based on the number of issues
      const sortedTags = data.alltags.sort(
        (a: TagType, b: TagType) => b.issues.length - a.issues.length
      );
      setTags(sortedTags);
      console.log("Fetched and sorted tags:", sortedTags);
    } catch (error) {
      console.error("Error fetching tags:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getTags();
  }, []);

  return (
    <>
      {session && session.user.type === "CITIZEN" ? (
        <div className="p-4">
          {loading ? (
            <Loader />
          ) : tags.length === 0 ? (
            <p>No tags found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {tags.map((t: TagType) => (
                <div key={t.id} className="bg-white shadow-md rounded-lg p-4">
                  <h2 className="text-xl text-slate-800 font-bold mb-2">{t.title}</h2>
                  <p className="text-gray-600">Issues: {t.issues.length}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <p>You are not authorized to view this page.</p>
      )}
    </>
  );
  
};

export default Dashboard;