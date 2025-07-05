'use client';
import { useState, useEffect } from 'react';

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '' });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: '', content: '' });

  // Load announcements on page load
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Fetch announcements
  const fetchAnnouncements = async () => {
    const res = await fetch('/api/announcements');
    const data = await res.json();
    setAnnouncements(data);
  };

  // Create new announcement
  const handleCreate = async () => {
    if (!newAnnouncement.title || !newAnnouncement.content) return;
    
    await fetch('/api/announcements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAnnouncement)
    });
    fetchAnnouncements();
    setNewAnnouncement({ title: '', content: '' });
  };

  // Delete announcement
  const handleDelete = async (id: string) => {
    await fetch(`/api/announcements?id=${id}`, {
      method: 'DELETE'
    });
    fetchAnnouncements();
  };

  // Update announcement
  const handleUpdate = async () => {
    if (!editData.title || !editData.content) return;
    
    await fetch(`/api/announcements?id=${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editData)
    });
    setEditingId(null);
    fetchAnnouncements();
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Announcements</h1>
        <button 
          onClick={handleCreate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create New
        </button>
      </div>

      {/* Create Form */}
      <div className="mb-8 p-4 border rounded-lg ">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 mb-2 border rounded"
          value={newAnnouncement.title}
          onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
        />
        <textarea
          placeholder="Content"
          className="w-full p-2 mb-2 border rounded"
          value={newAnnouncement.content}
          onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
        />
      </div>

      {/* Announcements List */}
      {announcements.length === 0 ? (
        <p className="text-gray-500">No announcements yet.</p>
      ) : (
        <div className="space-y-4">
          {announcements.map(ann => (
            <div key={ann._id} className="p-4 border rounded-lg text-white">
              {editingId === ann._id ? (
                <div className="space-y-2">
                  <input
                    value={editData.title}
                    onChange={(e) => setEditData({...editData, title: e.target.value})}
                    className="w-full p-2 border rounded"
                  />
                  <textarea
                    value={editData.content}
                    onChange={(e) => setEditData({...editData, content: e.target.value})}
                    className="w-full p-2 border rounded"
                  />
                  <div className="flex gap-2">
                    <button 
                      onClick={handleUpdate}
                      className="px-3 py-1 bg-green-500 text-white rounded"
                    >
                      Save
                    </button>
                    <button 
                      onClick={() => setEditingId(null)}
                      className="px-3 py-1 bg-gray-500 text-white rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="font-bold text-lg">{ann.title}</h2>
                  <p className="text-gray-600 mt-1">{ann.content}</p>
                  <div className="flex gap-2 mt-3">
                    <button 
                      onClick={() => {
                        setEditingId(ann._id);
                        setEditData({ title: ann.title, content: ann.content });
                      }}
                      className="px-3 py-1 text-sm bg-blue-100 rounded hover:bg-blue-200 text-black"
                      
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(ann._id)}
                      className="px-3 py-1 text-sm bg-red-100 rounded hover:bg-red-200 text-black" 
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
              <p className="text-xs text-gray-400 mt-2">
                {new Date(ann.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}