"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { ThumbsUp, Trash2, Pencil, X } from "lucide-react";
import { upvotes } from "@prisma/client";

type Issue = {
  id: string;
  subject: string;
  description: string;
  createdAt: string;
  upvoters: upvotes[];
  isResolved: boolean;
};

const IssuesPage = () => {
  const router = useRouter();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filterOption, setFilterOption] = useState<string>("unresolved");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIssue, setEditingIssue] = useState<Issue | null>(null);

  async function getIssues() {
    setLoading(true);
    try {
      const response = await axios.get("/api/citizen/getallissues");
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
  }, []);

  const filteredIssues = useMemo(() => {
    return issues.filter((issue) =>
      filterOption === "resolved" ? issue.isResolved : !issue.isResolved
    );
  }, [issues, filterOption]);

  async function handleDeleteIssue(issueId: string) {
    try {
      await axios.delete("/api/citizen/deleteissue", { data: { issueId } });
      getIssues();
    } catch (error) {
      console.error("Error deleting issue:", error);
    }
  }

  async function handleUpdateIssue() {
    if (!editingIssue) return;
    try {
      await axios.put("/api/citizen/updateissue", {
        issueId: editingIssue.id,
        subject: editingIssue.subject,
        description: editingIssue.description,
      });
      setIsModalOpen(false);
      getIssues();
    } catch (error) {
      console.error("Error updating issue:", error);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex flex-row gap-4 justify-evenly">
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
      {!loading && filteredIssues.length === 0 && (
        <p className="mt-4 text-gray-600">No issues found.</p>
      )}

      <div className="mt-6 space-y-4">
        {filteredIssues.map((issue) => (
          <div
            key={issue.id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200 flex justify-between items-center hover:shadow-lg transition duration-300"
          >
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {issue.subject}
              </h2>
              <p className="text-gray-700">{issue.description}</p>
            </div>
            <div className="flex space-x-2">
              <button
                title="Edit Issue"
                type="button"
                onClick={() => {
                  setEditingIssue(issue);
                  setIsModalOpen(true);
                }}
                className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition"
              >
                <Pencil className="h-5 w-5" />
              </button>
              <button
                title="Delete Issue"
                type="button"
                onClick={() => handleDeleteIssue(issue.id)}
                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && editingIssue && (
        <div className=" text-black fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <X
              onClick={() => setIsModalOpen(false)}
              className="float-end hover:bg-slate-500 rounded-full transition duration-150 cursor-pointer"
            />
            <h2 className="text-xl font-semibold mb-4">Update Issue</h2>
            <input
              type="text"
              className="w-full p-2 border rounded-lg mb-2"
              value={editingIssue.subject}
              onChange={(e) =>
                setEditingIssue((prev) =>
                  prev ? { ...prev, subject: e.target.value } : prev
                )
              }
            />
            <textarea
              className="w-full p-2 border rounded-lg mb-4"
              value={editingIssue.description}
              onChange={(e) =>
                setEditingIssue((prev) =>
                  prev ? { ...prev, description: e.target.value } : prev
                )
              }
            />
            <button
              onClick={handleUpdateIssue}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Update Issue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssuesPage;
