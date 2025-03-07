"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { format } from "date-fns";
import { Loader2, ThumbsUp, CheckCircle, XCircle } from "lucide-react";

interface Issue {
  id: string;
  userId: string;
  createdAt: string;
  subject: string;
  subTags: string[];
  description: string;
  isResolved: boolean;
  upvotes: number;
  adminReply: string | null;
}

const IssuePage = () => {
  const params = useParams();
  const issueId = params.issueId as string;

  const [issue, setIssue] = useState<Issue | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchIssue() {
      if (!issueId) return;
      try {
        const { data } = await axios.get(
          `/api/issues/getissue?issueId=${issueId}`
        );
        setIssue(data.issue);
        setError(null);
      } catch (err: any) {
        console.error(err);
        setError("Failed to fetch issue");
      } finally {
        setLoading(false);
      }
    }

    fetchIssue();
  }, [issueId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-10 w-10 text-gray-600" />
      </div>
    );
  }

  if (error || !issue) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg font-semibold">
          {error || "Issue not found"}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">{issue.subject}</h1>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium 
          ${
            issue.isResolved
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {issue.isResolved ? (
            <CheckCircle className="inline-block h-5 w-5 mr-1" />
          ) : (
            <XCircle className="inline-block h-5 w-5 mr-1" />
          )}
          {issue.isResolved ? "Resolved" : "Unresolved"}
        </span>
      </div>

      {/* Created At */}
      <p className="text-gray-500 text-sm mt-1">
        Reported on {format(new Date(issue.createdAt), "dd MMM yyyy, h:mm a")}
      </p>

      {/* Description */}
      <p className="mt-4 text-gray-700 leading-relaxed">{issue.description}</p>

      {/* Subtags */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-800">Tags:</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {issue.subTags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-700 px-3 py-1 text-sm font-medium rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Upvotes */}
      <div className="mt-6 flex items-center space-x-2">
        <ThumbsUp className="h-6 w-6 text-gray-600" />
        <p className="text-gray-700 font-medium">{issue.upvotes} Upvotes</p>
      </div>

      {/* Admin Reply (if available) */}
      {issue.adminReply && (
        <div className="mt-6 p-4 border-l-4 border-blue-500 bg-blue-50">
          <h3 className="text-lg font-semibold text-blue-800">Admin Reply:</h3>
          <p className="text-gray-700 mt-2">{issue.adminReply}</p>
        </div>
      )}
    </div>
  );
};

export default IssuePage;
