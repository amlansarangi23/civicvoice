"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import {
  Loader2,
  ThumbsUp,
  CheckCircle,
  XCircle,
  MessageSquare,
  X,
} from "lucide-react";

import { upvotes } from "@prisma/client";

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
  upvoters: upvotes[];
}

const IssuePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  // console.log(session);
  const params = useParams();
  const issueId: string = params.issueId as string;

  const [issue, setIssue] = useState<Issue | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adminReply, setAdminReply] = useState("");

  const handleResolveIssue = async () => {
    const { data } = await axios.put("/api/admin/resolveissue", {
      issueId: issueId,
      adminReply: adminReply || null,
    });
    console.log(data);
    setIsModalOpen(false);
    window.location.reload();
  };

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
    <div className="max-w-2xl mx-auto my-10 p-6 bg-white shadow-xl rounded-lg transition-all duration-300 hover:shadow-2xl">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">{issue.subject}</h1>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
            issue.isResolved
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {issue.isResolved ? (
            <CheckCircle className="inline-block h-5 w-5 mr-1" />
          ) : (
            <XCircle className="inline-block h-5 w-5 mr-1" />
          )}{" "}
          {issue.isResolved ? "Resolved" : "Unresolved"}
        </span>
        <X
          onClick={() => {
            router.back();
          }}
          className="text-black hover:bg-gray-400 rounded-full "
        ></X>
      </div>

      <p className="text-gray-500 text-sm mt-1">
        Reported on {format(new Date(issue.createdAt), "dd MMM yyyy, h:mm a")}
      </p>
      <p className="mt-4 text-gray-700 leading-relaxed">{issue.description}</p>

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

      <div className="mt-6 flex items-center space-x-2">
        <ThumbsUp className="h-6 w-6 text-gray-600" />
        <p className="text-gray-700 font-medium">
          {issue.upvoters.length} Upvotes
        </p>
      </div>

      {issue.adminReply && (
        <div className="mt-6 p-4 border-l-4 border-blue-500 bg-blue-50">
          <h3 className="text-lg font-semibold text-blue-800">Admin Reply:</h3>
          <p className="text-gray-700 mt-2">{issue.adminReply}</p>
        </div>
      )}
      {session && session?.user?.type === "ADMIN" && (
        <div className="mt-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            <MessageSquare className="mr-2 h-5 w-5" /> Update Issue
          </button>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-black">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Resolve Issue</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter admin reply here..."
              value={adminReply}
              onChange={(e) => setAdminReply(e.target.value)}
            />
            <button
              onClick={handleResolveIssue}
              className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg shadow hover:bg-green-700 transition"
            >
              Resolve Issue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssuePage;
