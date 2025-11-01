import React from 'react';

const Modal = ({ post, onClose }) => {
  if (!post) return null;  // إذا لم يكن هناك "post" لا يتم عرض الـ modal

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-lg w-full shadow-lg relative">
        <h2 className="text-2xl font-semibold mb-4 text-blue-900">{post.title}</h2>
        <p className="mb-2"><strong>Company:</strong> {post.company}</p>
        <p className="mb-2"><strong>Location:</strong> {post.location}</p>
        <p className="mb-2"><strong>Description:</strong> {post.description}</p>
        <p className="mb-2"><strong>Posting Date:</strong> {post.date}</p>
        <p className="mb-2"><strong>Type:</strong> {post.type}</p>
        <p className="mb-2"><strong>Status:</strong> {post.status}</p>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;


