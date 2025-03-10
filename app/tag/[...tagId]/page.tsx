"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { ThumbsUp } from "lucide-react";
import { upvotes } from "@prisma/client";
import { useSession } from "next-auth/react";

type Issue = {
  id: string;
  subject: string;
  description: string;
  upvoters: upvotes[];
};

const IssuesPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  let tagId = params.tagId;

  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [upvoteState, setUpvoteState] = useState<boolean>(false);

  async function getIssues() {
    if (!tagId) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/issues/getallissues?tagId=${tagId}`
      );
      setIssues(response.data.issues);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch issues");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getIssues();
  }, [tagId, upvoteState]);

  const handleAddIssue = () => {
    router.push(`/issue/createissue?tagId=${tagId}`);
  };

  const toggleUpvote = async (issueId: string) => {
    const { data } = await axios.get(`/api/issues/getissue?issueId=${issueId}`);

    const d = data?.issue?.upvoters?.find(
      (upvoter: upvotes) =>
        upvoter.issueId === issueId && upvoter.userId === session?.user?.id
    );

    try {
      console.log(d);
      if (d != null) {
        await axios.delete("/api/citizen/downvote", {
          data: { issueId: issueId },
        });
      } else {
        console.log(issueId);
        await axios.post("/api/citizen/upvote", {
          issueId: issueId,
        });
      }
    } catch (error) {
      console.error("Failed to update upvotes", error);
    } finally {
      setUpvoteState(!upvoteState);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Issues</h1>
        <button
          onClick={handleAddIssue}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          ADD ISSUE
        </button>
      </div>

      {loading && <p className="mt-4 text-gray-600">Loading issues...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {!loading && issues.length === 0 && (
        <p className="mt-4 text-gray-600">No issues found.</p>
      )}

      <div className="mt-6 space-y-4">
        {issues.map((issue) => (
          <div
            key={issue.id}
            onClick={() => router.push(`/issue/getissuedetails/${issue.id}`)}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200 flex justify-between items-center hover:shadow-lg transition cursor-pointer duration-300"
          >
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {issue.subject}
              </h2>
              <p className="text-gray-700">{issue.description}</p>
            </div>

            {/* Upvote Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleUpvote(issue.id);
              }}
              // disabled={loadingUpvote[issue.id]}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold transition ${
                issue?.upvoters?.find(
                  (upvoter: upvotes) =>
                    upvoter.issueId === issue.id &&
                    upvoter.userId === session?.user?.id
                ) != null
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <ThumbsUp className="h-5 w-5" />
              <span>{issue.upvoters.length}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IssuesPage;
