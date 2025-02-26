import React, { useState, useEffect } from 'react';

const CategoryForm = ({ category, onSave, onClose }) => {
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
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">{category ? 'Edit Category' : 'Add New Category'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Category Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Category Slug</label>
            <input 
              type="text" 
              value={slug} 
              onChange={(e) => setSlug(e.target.value)} 
              required 
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Save</button>
            <button type="button" onClick={onClose} className="bg-gray-300 py-2 px-4 rounded hover:bg-gray-400">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;