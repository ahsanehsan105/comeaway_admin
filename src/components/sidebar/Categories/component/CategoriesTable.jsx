import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const CategoriesTable = ({ categories, onEdit, onDelete }) => {
  const [search, setSearch] = useState({
    srNo: '',
    name: '',
    slug: '',
    assignedSounds: ''
  });

  const handleSearchChange = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value
    });
  };

  const filteredCategories = categories.filter(category => 
    (search.srNo === '' || category.id.toString().includes(search.srNo)) &&
    (search.name === '' || category.name.toLowerCase().includes(search.name.toLowerCase())) &&
    (search.slug === '' || category.slug.toLowerCase().includes(search.slug.toLowerCase())) &&
    (search.assignedSounds === '' || category.assignedSounds.toString().includes(search.assignedSounds))
  );

  return (
    <div className="overflow-x-auto rounded-md">
      <table className="border min-w-full bg-white rounded-md" >
        <thead>
          <tr>
            <th className="py-2 px-4 border text-center">
              <input 
                type="text" 
                placeholder="Search Sr No." 
                name="srNo" 
                value={search.srNo} 
                onChange={handleSearchChange} 
                className="w-full px-2 py-1 border rounded"
              />
            </th>
            <th className="py-2 px-4 border text-center">
              <input 
                type="text" 
                placeholder="Search Category Name" 
                name="name" 
                value={search.name} 
                onChange={handleSearchChange} 
                className="w-full px-2 py-1 border rounded"
              />
            </th>
            <th className="py-2 px-4 border text-center">
              <input 
                type="text" 
                placeholder="Search Category Slug" 
                name="slug" 
                value={search.slug} 
                onChange={handleSearchChange} 
                className="w-full px-2 py-1 border rounded"
              />
            </th>
            <th className="py-2 px-4 border text-center">
              <input 
                type="text" 
                placeholder="Search Assigned Sounds" 
                name="assignedSounds" 
                value={search.assignedSounds} 
                onChange={handleSearchChange} 
                className="w-full px-2 py-1 border rounded"
              />
            </th>
            <th className="py-2 px-4 border text-center">Actions</th>
          </tr>
          <tr>
            <th className="py-2 px-4 border text-center">Sr No.</th>
            <th className="py-2 px-4 border text-center">Category Name</th>
            <th className="py-2 px-4 border text-center">Category Slug</th>
            <th className="py-2 px-4 border text-center">Assigned Sounds</th>
            <th className="py-2 px-4 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.map((category, index) => (
            <tr key={category.id}>
              <td className="py-2 px-4 border text-center">{index + 1}</td>
              <td className="py-2 px-4 border text-center">{category.name}</td>
              <td className="py-2 px-4 border text-center">{category.slug}</td>
              <td className="py-2 px-4 border text-center">{category.assignedSounds}</td>
              <td className="py-2 px-4 border text-center">
                <button 
                  onClick={() => onEdit(category)}
                  className="text-yellow-500 hover:text-yellow-600 mr-2"
                >
                  <FaEdit />
                </button>
                <button 
                  onClick={() => onDelete(category)}
                  className="text-red-500 hover:text-red-600"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesTable;