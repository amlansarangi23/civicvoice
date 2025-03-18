"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "@/components/Loader";
import TagModal from "@/components/TagModal";
import { useSession } from "next-auth/react";
import { Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface TagType {
  id: string;
  title: string;
  issues: any[];
}

const Dashboard = () => {
  const Router = useRouter();
  const [tags, setTags] = useState<TagType[]>([]);
  const [tagTitle, setTagTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const [showModal, setShowModal] = useState(false);

  async function handleAddTag(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/admin/createtag", {
        title: tagTitle,
      });
      console.log("Added tag:", data.message);
      setTagTitle("");
      setShowModal(false);
      getTags();
    } catch (error) {
      console.error("Error adding tag:", error);
    }
  }

  async function handleDeleteTag(tagId: string) {
    try {
      const { data } = await axios.delete("/api/admin/deletetag", {
        data: { tagId: tagId },
      });
      console.log("Deleted tag:", data.message);
      getTags();
    } catch (error) {
      console.error("Error adding tag:", error);
    }
  }

  async function getTags() {
    try {
      const { data } = await axios.get("/api/tags/getalltags");
      const sortedTags = [...data.alltags].sort(
        (a, b) => b.issues.length - a.issues.length
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
  }, [tags.length]);

  return (
    <>
      {session && session.user?.type === "CITIZEN" ? (
        <div className="p-4 h-screen">
          {loading ? (
            <Loader />
          ) : tags.length === 0 ? (
            <p>No tags found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 h-1/4">
              {tags.map((t: TagType) => (
                <div
                  onClick={() => {
                    Router.push(`/tag/${t.id}`);
                  }}
                  key={t.id}
                  className="bg-slate-300 shadow-md rounded-lg border-2 border-slate-800 p-4 hover:scale-105 hover:cursor-pointer transition duration-200 w-2/3 mx-auto"
                >
                  <h2 className="text-xl text-slate-800 font-bold mb-2">
                    {t.title}
                  </h2>
                  <p className="text-gray-600">Issues: {t.issues.length}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="p-4">
          <div className="flex justify-end mb-4 h-1/4">
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
            >
              Add Tag
            </button>
          </div>
          {loading ? (
            <Loader />
          ) : tags.length === 0 ? (
            <p>No tags found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 h-full">
              {tags.map((t: TagType) => (
                <div
                onClick={() => Router.push(`/tag/${t.id}`)}
                key={t.id}
                className="relative bg-slate-300 shadow-md rounded-lg border-2 border-slate-800 p-4 hover:scale-105 hover:cursor-pointer transition duration-200 w-2/3 mx-auto"
              >
              
                  <h2 className="text-xl text-slate-800 font-bold mb-2">
                    {t.title}
                  </h2>
                  <p className="text-gray-600">Issues: {t.issues.length}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent event bubbling
                      handleDeleteTag(t.id);
                    }}
                    className="absolute bottom-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <TagModal
            showModal={showModal}
            setShowModal={setShowModal}
            tagTitle={tagTitle}
            setTagTitle={setTagTitle}
            handleAddTag={handleAddTag}
          />
        </div>
      )}
    </>
  );
};

export default Dashboard;
