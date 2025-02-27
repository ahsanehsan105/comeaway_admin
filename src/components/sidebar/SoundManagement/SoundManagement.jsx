import React, { useState } from 'react';
import DeleteConfirmation from './component/DeleteConfirmation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';

const SoundManagement = () => {
  const [sounds, setSounds] = useState([
    { id: 1, title: 'Sound 1', categories: ['Category 1'], status: 'Standard' },
    { id: 2, title: 'Sound 2', categories: ['Category 2'], status: 'Premium' },
    { id: 3, title: 'Sound 3', categories: ['Category 3'], status: 'Standard' },
    { id: 4, title: 'Sound 4', categories: ['Category 4'], status: 'Premium' },
    { id: 5, title: 'Sound 5', categories: ['Category 5'], status: 'Standard' },
    { id: 6, title: 'Sound 6', categories: ['Category 6'], status: 'Premium' },
    { id: 7, title: 'Sound 7', categories: ['Category 7'], status: 'Standard' },
    { id: 8, title: 'Sound 8', categories: ['Category 8'], status: 'Premium' },
  ]);
  const [categories, setCategories] = useState([]);
  const [showSoundForm, setShowSoundForm] = useState(false);
  const [showDeleteList, setShowDeleteList] = useState(true);
  const [currentSound, setCurrentSound] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [soundToDelete, setSoundToDelete] = useState(null);
  const [searchNameQuery, setSearchNameQuery] = useState('');
  const [searchCategoryQuery, setSearchCategoryQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

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
    toast.error("Sound deleted successfully!");
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
      categories: formData.get('categories').split(',').map(cat => cat.trim()), // Convert comma-separated string to array
      status: formData.get('status')
    };
    if (currentSound) {
      setSounds(sounds.map(sound => (sound.id === currentSound.id ? newSound : sound)));
    } else {
      setSounds([...sounds, newSound]);
    }
    setShowSoundForm(false);
    setShowDeleteList(true);
    toast.success(currentSound ? "Sound updated successfully!" : "Sound added successfully!");
  };

  const filteredSounds = sounds.filter(sound =>
    sound.title.toLowerCase().includes(searchNameQuery.toLowerCase()) &&
    sound.categories.some(category => category.toLowerCase().includes(searchCategoryQuery.toLowerCase()))
  );

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentPageData = filteredSounds.slice(offset, offset + itemsPerPage);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-center mt-6">Sound Management</h1>
      </div>
      <div className="flex justify-between items-center mb-4">
        {showSoundForm && (
          <button
            onClick={handleDeleteSound}
            className="text-white px-4 py-2 rounded hover:bg-blue-700"
            style={{ backgroundColor: '#439AB8' }}
          >
            Back
          </button>
        )}
        {!showSoundForm && (
          <button
            onClick={handleAddSound}
            className="text-white px-4 py-2 rounded hover:bg-blue-700 ml-auto"
            style={{ backgroundColor: '#439AB8' }}
          >
            Add Sound
          </button>
        )}
      </div>
      {showSoundForm && (
        <form onSubmit={handleSoundFormSubmit} className="bg-white p-6 rounded shadow-md mb-4">
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
            <label className="block text-gray-700">Upload Sound (only .mp3)</label>
            <input
              type="file"
              name="soundFile"
              accept=".mp3"
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
            <label className="block text-gray-700">Assign Categories (comma-separated)</label>
            <input
              type="text"
              name="categories"
              defaultValue={currentSound?.categories.join(', ') || ''}
              required
              className="w-full px-3 py-2 border rounded"
            />
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
            style={{ backgroundColor: '#439AB8' }}
          >
            {currentSound ? 'Save' : 'Add Sound'}
          </button>
        </form>
      )}

      {showDeleteList && (
        <div className="bg-white p-6 rounded shadow-md">
          <div className="mb-4 grid grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder="Search by name" 
              value={searchNameQuery}
              onChange={(e) => setSearchNameQuery(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
            <input 
              type="text" 
              placeholder="Search by category" 
              value={searchCategoryQuery}
              onChange={(e) => setSearchCategoryQuery(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-300 text-left bg-gray-100">Sound Title</th>
                  <th className="py-2 px-4 border-b border-gray-300 text-left bg-gray-100">Categories</th>
                  <th className="py-2 px-4 border-b border-gray-300 text-left bg-gray-100">Actions</th> {/* Empty header for actions */}
                </tr>
              </thead>
              <tbody>
                {currentPageData.map(sound => (
                  <tr key={sound.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b border-gray-300">{sound.title}</td>
                    <td className="py-2 px-4 border-b border-gray-300">{sound.categories.join(', ')}</td>
                    <td className="py-2 px-4 border-b border-gray-300">
                      <button
                        onClick={() => handleUpdateSound(sound)}
                        className="text-yellow-500 hover:text-yellow-700 mr-2"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteConfirmation(sound)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-end">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={Math.ceil(filteredSounds.length / itemsPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination flex space-x-2"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link px-3 py-1 border rounded"}
              previousLinkClassName={"page-link px-3 py-1 border rounded"}
              nextLinkClassName={"page-link px-3 py-1 border rounded"}
              breakLinkClassName={"page-link px-3 py-1 border rounded"}
              activeClassName={"active"}
              activeLinkClassName={"bg-gray-300 text-white"}
            />
          </div>
        </div>
      )}

      {showDeleteConfirmation && (
        <DeleteConfirmation
          category={soundToDelete}
          onConfirm={handleConfirmDelete}
          onClose={handleCloseDeleteConfirmation}
        />
      )}

      <ToastContainer />
    </div>
  );
};

export default SoundManagement;