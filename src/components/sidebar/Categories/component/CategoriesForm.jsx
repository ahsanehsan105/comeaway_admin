import React, { useState, useEffect } from 'react';

const CategoryForm = ({ category, onSave, onClose, isEditMode }) => {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');

  useEffect(() => {
    if (category) {
      setName(category.name);
      setSlug(category.slug);
    }
  }, [category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id: category ? category.id : null, name, slug, assignedSounds: category ? category.assignedSounds : 0 });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">{category ? 'Edit Category' : 'Add New Category'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 pb-1">Category Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1" 
              style={{ borderColor: '#439AB8' }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 pb-1">Category Slug</label>
            <input 
              type="text" 
              value={slug} 
              onChange={(e) => setSlug(e.target.value)} 
              required 
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1" 
              style={{ borderColor: '#439AB8' }}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button 
              type="submit" 
              className="text-white py-2 px-4 rounded-md transition duration-300 ease-in-out" 
              style={{ backgroundColor: '#439AB8' }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#367A94'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#439AB8'}
            >
              {isEditMode ? 'Save' : 'Add Category'}
            </button>
            <button 
              type="button" 
              onClick={onClose} 
              className="bg-gray-300 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300 ease-in-out"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;