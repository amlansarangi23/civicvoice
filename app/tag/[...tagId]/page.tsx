"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { ThumbsUp } from "lucide-react";
import { upvotes } from "@prisma/client";
import { useSession } from "next-auth/react";

type Issue = {
  id: string;
  subject: string;
  description: string;
  createdAt: string;
  upvoters: upvotes[];
  isResolved: boolean;
};

const IssuesPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const tagId = params.tagId;

  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [upvoteState, setUpvoteState] = useState<boolean>(false);

  // State for sorting and filtering
  const [sortOption, setSortOption] = useState<string>("upvotes");
  const [filterOption, setFilterOption] = useState<string>("resolved");

  async function getIssues() {
    if (!tagId) return;
    setLoading(true);
    try {
      const response = await axios.get(`/api/issues/getallissues?tagId=${tagId}`);
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

  // Create a memoized list that is filtered and sorted
  const sortedAndFilteredIssues = useMemo(() => {
    let filtered = issues.filter((issue) => {
      return filterOption === "resolved" ? issue.isResolved : !issue.isResolved;
    });

    if (sortOption === "upvotes") {
      filtered.sort((a, b) => b.upvoters.length - a.upvoters.length);
    } 
    else if (sortOption === "date") {
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
    return filtered;
  }, [issues, sortOption, filterOption]);

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
      if (d != null) {
        await axios.delete("/api/citizen/downvote", { data: { issueId } });
      } else {
        await axios.post("/api/citizen/upvote", { issueId });
      }
    } catch (error) {
      console.error("Failed to update upvotes", error);
    } finally {
      setUpvoteState(!upvoteState);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <h1 className="text-3xl font-semibold mb-4 md:mb-0">Issues</h1>
        {session && session.user?.type === "CITIZEN" && (
          <button
            onClick={handleAddIssue}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            ADD ISSUE
          </button>
        )}
      </div>

      <div className="flex flex-row gap-4 justify-evenly">
        {/* Sorting Dropdown */}
      <div className="flex justify-between items-center mb-4 text-black">
        <div>
          <label htmlFor="sort" className="mr-2 font-medium text-gray-300">
            Sort:
          </label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
          >
            <option value="upvotes">By Number of Upvotes</option>
            <option value="date">By Date & Time Created</option>
          </select>
        </div>
      </div>

       {/* Filter Tabs */}
       <div className="mb-6 border-b border-gray-300">
        <nav className="flex space-x-4">
          <button
            onClick={() => setFilterOption("resolved")}
            className={`pb-2 ${
              filterOption === "resolved"
                ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Resolved Issues
          </button>
          <button
            onClick={() => setFilterOption("unresolved")}
            className={`pb-2 ${
              filterOption === "unresolved"
                ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Unresolved Issues
          </button>
        </nav>
      </div>

      </div>

      

     

      {loading && <p className="mt-4 text-gray-600">Loading issues...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {!loading && sortedAndFilteredIssues.length === 0 && (
        <p className="mt-4 text-gray-600">No issues found.</p>
      )}

      <div className="mt-6 space-y-4">
        {sortedAndFilteredIssues.map((issue) => (
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
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold transition ${
                issue?.upvoters?.find(
                  (upvoter: upvotes) =>
                    upvoter.issueId === issue.id &&
                    upvoter.userId === session?.user?.id
                )
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
