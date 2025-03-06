import React from "react";
import { X } from "lucide-react";

const TagModal = ({ showModal, setShowModal, tagTitle, setTagTitle, handleAddTag }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>
        <h2 className="text-xl text-slate-700 font-semibold mb-4">Add New Tag</h2>
        <form onSubmit={handleAddTag}>
          <div className="mb-4 text-slate-800">
            <label htmlFor="tagTitle" className="block text-gray-700 font-semibold mb-2">
              Tag Title
            </label>
            <input
              id="tagTitle"
              type="text"
              value={tagTitle}
              onChange={(e) => setTagTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Enter tag title"
              autoFocus
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Add Tag
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TagModal;
