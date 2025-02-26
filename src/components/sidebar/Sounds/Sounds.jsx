import React, { useState } from 'react';

// Confirmation Modal
const ConfirmationModal = ({ onDelete, onCancel }) => {
  return (
    <div className="modal">
      <p>Are you sure you want to delete this sound?</p>
      <button onClick={onDelete}>Yes, Delete</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

// Sound Form Component (Add or Update)
const SoundForm = ({ soundData, onSave, categories }) => {
  const [soundTitle, setSoundTitle] = useState(soundData ? soundData.title : '');
  const [soundDescription, setSoundDescription] = useState(soundData ? soundData.description : '');
  const [soundFile, setSoundFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(soundData ? soundData.category : '');
  const [status, setStatus] = useState(soundData ? soundData.status : 'Standard');

  const handleSave = () => {
    onSave({
      title: soundTitle,
      description: soundDescription,
      soundFile,
      thumbnailFile,
      category: selectedCategory,
      status,
    });
  };

  return (
    <div className="sound-form">
      <input
        type="text"
        placeholder="Sound Title"
        value={soundTitle}
        onChange={(e) => setSoundTitle(e.target.value)}
      />
      <textarea
        placeholder="Sound Description"
        value={soundDescription}
        onChange={(e) => setSoundDescription(e.target.value)}
      />
      <input type="file" onChange={(e) => setSoundFile(e.target.files[0])} />
      <input type="file" onChange={(e) => setThumbnailFile(e.target.files[0])} />
      <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <select onChange={(e) => setStatus(e.target.value)} value={status}>
        <option value="Standard">Standard</option>
        <option value="Premium">Premium</option>
      </select>
      <button onClick={handleSave}>Save Sound</button>
    </div>
  );
};

// Sound List Component (Display Sounds)
const SoundList = ({ sounds, onDelete, onUpdate }) => {
  return (
    <div className="sound-list">
      {sounds.map((sound) => (
        <div key={sound.id} className="sound-item">
          <span>{sound.title}</span>
          <button onClick={() => onUpdate(sound)}>Update</button>
          <button onClick={() => onDelete(sound)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

// Main Admin Panel Component
const Sounds = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Music' },
    { id: 2, name: 'Podcast' },
    { id: 3, name: 'Sound Effects' },
  ]);
  const [sounds, setSounds] = useState([]);
  const [currentSound, setCurrentSound] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [soundToDelete, setSoundToDelete] = useState(null);

  const handleAddCategory = (categoryName) => {
    setCategories([...categories, { id: categories.length + 1, name: categoryName }]);
  };

  const handleDeleteCategory = (categoryId) => {
    setCategories(categories.filter((category) => category.id !== categoryId));
  };

  const handleSaveSound = (sound) => {
    if (currentSound) {
      setSounds(sounds.map((s) => (s.id === currentSound.id ? { ...s, ...sound } : s)));
    } else {
      setSounds([...sounds, { id: sounds.length + 1, ...sound }]);
    }
    setCurrentSound(null);
  };

  const handleDeleteSound = (sound) => {
    setShowConfirmation(true);
    setSoundToDelete(sound);
  };

  const confirmDeleteSound = () => {
    setSounds(sounds.filter((sound) => sound.id !== soundToDelete.id));
    setShowConfirmation(false);
  };

  const cancelDeleteSound = () => {
    setShowConfirmation(false);
    setSoundToDelete(null);
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      
      <div className="category-management">
        <h2>Manage Categories</h2>
        {/* Category Add/Update/Delete Logic */}
        <button onClick={() => handleAddCategory('New Category')}>Add Category</button>
        <button onClick={() => handleDeleteCategory(1)}>Delete Category</button>
      </div>

      <div className="sound-management">
        <h2>Manage Sounds</h2>
        <button onClick={() => setCurrentSound(null)}>Add Sound</button>
        {currentSound && <SoundForm soundData={currentSound} onSave={handleSaveSound} categories={categories} />}
        <SoundList sounds={sounds} onDelete={handleDeleteSound} onUpdate={setCurrentSound} />
      </div>

      {showConfirmation && (
        <ConfirmationModal onDelete={confirmDeleteSound} onCancel={cancelDeleteSound} />
      )}
    </div>
  );
};

export default Sounds;
