import { useState } from 'react';
import ApprovalTable from '../Components/ApprovalTable';
import Modal from '../Components/Modal';

const mockPosts = [
  { id: 1, title: "Software Engineer", company: "Tech Corp", date: "2024-01-12", type: "Job", description: "A great job for a software engineer", location: "Remote" },
  { id: 2, title: "Marketing Intern", company: "Biz Inc", date: "2024-01-15", type: "Internship", description: "Marketing internship with hands-on experience", location: "On-site" },
];

const Dashboard = () => {
  const [posts, setPosts] = useState(mockPosts);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleApprove = (id) => {
    setPosts(posts.map(post => post.id === id ? { ...post, status: 'approved' } : post));
  };

  const handleReject = (id) => {
    setPosts(posts.map(post => post.id === id ? { ...post, status: 'rejected' } : post));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Pending Approvals</h2>
      <ApprovalTable
        posts={posts.filter(post => !post.status)}
        onApprove={handleApprove}
        onReject={handleReject}
        onViewDetails={setSelectedPost}
      />
      {selectedPost && (
        <Modal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </div>
  );
};

export default Dashboard;
