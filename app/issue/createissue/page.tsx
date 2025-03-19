"use client";
export const dynamic = "force-dynamic";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { X } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";

const CreateIssuePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tagId, setTagId] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [subTags, setSubTags] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sensitiveContentError, setSensitiveContentError] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  // Ensure tagId is set properly
  useEffect(() => {
    const id = searchParams.get("tagId");
    if (id) {
      setTagId(id);
    }
  }, [searchParams]);

  const handleAddSubtag = () => setSubTags([...subTags, ""]);

  const handleSubtagChange = (index: number, value: string) => {
    const updatedSubTags = [...subTags];
    updatedSubTags[index] = value;
    setSubTags(updatedSubTags);
  };

  const handleImageUpload = (result: any) => {
    if (result.event === "success") {
      setImageUrls([...imageUrls, result.info.secure_url]);
    }
  };

  //-----IMPORTANT-----
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSensitiveContentError("");
    try {
      const body = { subject, description, tagId, subTags, imageUrls };
      await axios.post("/api/citizen/createissue", body);
      router.push(`/tag/${tagId}`);
    } catch (err: any) {
      if (err.response && err.response.status === 400) {
        setSensitiveContentError(
          "Issue contains sensitive content and cannot be created."
        );
      } else {
        setError("Error creating issue");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto my-10 p-6 bg-white rounded shadow text-black">
      {/* Ensure tagId is included in redirect */}
      <X
        onClick={() => router.push(tagId ? `/tag/${tagId}` : "/")}
        className="float-end hover:bg-slate-500 rounded-full transition duration-150 cursor-pointer"
      />
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

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Upload Images:
          </label>

          {/* Prevent form submission when clicking Upload Image */}
          <CldUploadWidget
            uploadPreset="dhaxrkotq"
            onSuccess={handleImageUpload}
          >
            {({ open }) => (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  open();
                }}
                className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition"
              >
                Upload an Image
              </button>
            )}
          </CldUploadWidget>

          <div className="mt-4">
            {imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Uploaded ${index}`}
                className="w-full h-auto mt-2"
              />
            ))}
          </div>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {sensitiveContentError && (
          <p className="text-red-500 mb-4">{sensitiveContentError}</p>
        )}

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
