import React, { useState } from 'react';
import DeleteConfirmation from './component/DeleteConfirmation';

const SoundManagement = () => {
  const [sounds, setSounds] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showSoundForm, setShowSoundForm] = useState(false);
  const [showDeleteList, setShowDeleteList] = useState(false);
  const [currentSound, setCurrentSound] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [soundToDelete, setSoundToDelete] = useState(null);

  const handleAddSound = () => {
    setShowSoundForm(true);
    setShowDeleteList(false);
    setCurrentSound(null);
  };

  const handleUpdateSound = (sound) => {
    setShowSoundForm(true);
    setShowDeleteList(false);
    setCurrentSound(sound);
  };

  const handleDeleteSound = () => {
    setShowSoundForm(false);
    setShowDeleteList(true);
  };

  const handleDeleteConfirmation = (sound) => {
    setSoundToDelete(sound);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    setSounds(sounds.filter(sound => sound.id !== soundToDelete.id));
    setShowDeleteConfirmation(false);
    setSoundToDelete(null);
  };

  const handleCloseDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
    setSoundToDelete(null);
  };

  const handleSoundFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newSound = {
      id: currentSound ? currentSound.id : sounds.length + 1,
      title: formData.get('title'),
      description: formData.get('description'),
      soundFile: formData.get('soundFile'),
      thumbnail: formData.get('thumbnail'),
      categories: formData.getAll('categories'),
      status: formData.get('status')
    };
    if (currentSound) {
      setSounds(sounds.map(sound => (sound.id === currentSound.id ? newSound : sound)));
    } else {
      setSounds([...sounds, newSound]);
    }
    setShowSoundForm(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Sound Management</h1>
      <div className="flex space-x-4 mb-4">
        <button 
          onClick={handleAddSound} 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Sound
        </button>
        <button 
          onClick={handleDeleteSound} 
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete Sound
        </button>
      </div>

      {showSoundForm && (
        <form onSubmit={handleSoundFormSubmit} className="bg-white p-6 rounded shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700">Sound Title</label>
            <input 
              type="text" 
              name="title" 
              defaultValue={currentSound?.title || ''} 
              required 
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Sound Description</label>
            <input 
              type="text" 
              name="description" 
              defaultValue={currentSound?.description || ''} 
              required 
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Upload Sound</label>
            <input 
              type="file" 
              name="soundFile" 
              required={!currentSound} 
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Upload Thumbnail image</label>
            <input 
              type="file" 
              name="thumbnail" 
              required={!currentSound} 
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Assign Categories</label>
            <select 
              name="categories" 
              multiple 
              defaultValue={currentSound?.categories || []} 
              className="w-full px-3 py-2 border rounded"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Set Status</label>
            <select 
              name="status" 
              defaultValue={currentSound?.status || 'Standard'} 
              className="w-full px-3 py-2 border rounded"
            >
              <option value="Premium">Premium user</option>
              <option value="Standard">Standard user</option>
            </select>
          </div>
          <button 
            type="submit" 
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Save
          </button>
        </form>
      )}

      {showDeleteList && (
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4">Delete Sound</h2>
          <input 
            type="text" 
            placeholder="Search by name or category" 
            className="w-full px-3 py-2 mb-4 border rounded"
          />
          <ul className="space-y-2">
            {sounds.map(sound => (
              <li key={sound.id} className="flex justify-between items-center p-2 bg-gray-100 rounded">
                {sound.title}
                <div>
                  <button 
                    onClick={() => handleUpdateSound(sound)} 
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-700 mr-2"
                  >
                    Update
                  </button>
                  <button 
                    onClick={() => handleDeleteConfirmation(sound)} 
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showDeleteConfirmation && (
        <DeleteConfirmation 
          category={soundToDelete} 
          onConfirm={handleConfirmDelete} 
          onClose={handleCloseDeleteConfirmation} 
        />
      )}
    </div>
  );
};

export default SoundManagement;