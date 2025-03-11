"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { X } from "lucide-react";

const CreateIssuePage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tagId = searchParams.get("tagId") || "";

  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [subTags, setSubTags] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sensitiveContentError, setSensitiveContentError] = useState(""); // New state

  const handleAddSubtag = () => {
    setSubTags([...subTags, ""]);
  };

  const handleSubtagChange = (index: number, value: string) => {
    const updatedSubTags = [...subTags];
    updatedSubTags[index] = value;
    setSubTags(updatedSubTags);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSensitiveContentError(""); // Clear any previous sensitive content errors
    try {
      const body = { subject, description, tagId, subTags };
      const response = await axios.post("/api/citizen/createissue", body);
      console.log(response.data);
      router.push(`/tag/${tagId}`);
    } catch (err: any) {
      console.error(err);
      if (err.response && err.response.status === 400) {
        setSensitiveContentError("Issue contains sensitive content and cannot be created.");
      } else {
        setError("Error creating issue");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto my-10 p-6 bg-white rounded shadow text-black">
      <X onClick={() => router.push(`/tag/${tagId}`)} className="float-end hover:bg-slate-500 rounded-full transition duration-150 cursor-pointer" />
      <h1 className="text-3xl font-semibold text-center mb-6">Create Issue</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="subject"
            className="block text-gray-700 font-medium mb-2"
          >
            Subject:
          </label>
          <input
            id="subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium mb-2"
          >
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Subtags:
          </label>
          {subTags.map((subtag, index) => (
            <input
              key={index}
              type="text"
              value={subtag}
              onChange={(e) => handleSubtagChange(index, e.target.value)}
              placeholder={`Subtag ${index + 1}`}
              className="w-full p-3 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
          <button
            type="button"
            onClick={handleAddSubtag}
            className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition"
          >
            Add Subtag
          </button>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {sensitiveContentError && <p className="text-red-500 mb-4">{sensitiveContentError}</p>} {/* Display sensitive content error */}
        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Issue"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateIssuePage;