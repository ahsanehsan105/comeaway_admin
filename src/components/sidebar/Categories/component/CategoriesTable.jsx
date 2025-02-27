import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';

const CategoriesTable = ({ categories, onEdit, onDelete }) => {
  const [searchSrNoQuery, setSearchSrNoQuery] = useState('');
  const [searchNameQuery, setSearchNameQuery] = useState('');
  const [searchSlugQuery, setSearchSlugQuery] = useState('');
  const [searchAssignedSoundsQuery, setSearchAssignedSoundsQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  // Dummy categories data
  const dummyCategories = [
    { id: 1, name: 'Category 1', slug: '2387r23ry', assignedSounds: 2 },
    { id: 2, name: 'Category 2', slug: 'duu3dh2', assignedSounds: 3 },
    { id: 3, name: 'Category 3', slug: '2df383f2', assignedSounds: 1 },
    { id: 4, name: 'Category 4', slug: '2dfu23hf98', assignedSounds: 4 },
    { id: 5, name: 'Category 5', slug: '2fu3fu', assignedSounds: 5 },
    { id: 6, name: 'Category 6', slug: '23ufh23f', assignedSounds: 6 },
    { id: 7, name: 'Category 7', slug: 'f23u3fh', assignedSounds: 6 },
  ];

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    if (name === 'srNo') setSearchSrNoQuery(value);
    if (name === 'name') setSearchNameQuery(value);
    if (name === 'slug') setSearchSlugQuery(value);
    if (name === 'assignedSounds') setSearchAssignedSoundsQuery(value);
    setCurrentPage(0); // Reset to first page on search
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const filteredCategories = dummyCategories.filter(category => 
    category.id.toString().includes(searchSrNoQuery) &&
    category.name.toLowerCase().includes(searchNameQuery.toLowerCase()) &&
    category.slug.toLowerCase().includes(searchSlugQuery.toLowerCase()) &&
    category.assignedSounds.toString().includes(searchAssignedSoundsQuery)
  );

  const offset = currentPage * itemsPerPage;
  const currentPageData = filteredCategories.slice(offset, offset + itemsPerPage);

  return (
    <div className="container mx-auto p-4 bg-white rounded shadow-md">
      <div className="mb-4 grid grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Search Sr No."
          name="srNo"
          value={searchSrNoQuery}
          onChange={handleSearchChange}
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="text"
          placeholder="Search Category Name"
          name="name"
          value={searchNameQuery}
          onChange={handleSearchChange}
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="text"
          placeholder="Search Category Slug"
          name="slug"
          value={searchSlugQuery}
          onChange={handleSearchChange}
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="text"
          placeholder="Search Assigned Sounds"
          name="assignedSounds"
          value={searchAssignedSoundsQuery}
          onChange={handleSearchChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-300 text-left bg-gray-100">Sr No.</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left bg-gray-100">Category Name</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left bg-gray-100">Category Slug</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left bg-gray-100">Assigned Sounds</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left bg-gray-100">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((category, index) => (
              <tr key={category.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b border-gray-300">{offset + index + 1}</td>
                <td className="py-2 px-4 border-b border-gray-300">{category.name}</td>
                <td className="py-2 px-4 border-b border-gray-300">{category.slug}</td>
                <td className="py-2 px-4 border-b border-gray-300">{category.assignedSounds}</td>
                <td className="py-2 px-4 border-b border-gray-300">
                  <button
                    onClick={() => onEdit(category)}
                    className="text-yellow-500 hover:text-yellow-700 mr-2"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => onDelete(category)}
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
          pageCount={Math.ceil(filteredCategories.length / itemsPerPage)}
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
  );
};

export default CategoriesTable;