import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CategoriesTable from './component/CategoriesTable';
import CategoryForm from './component/CategoriesForm';
import DeleteConfirmation from './component/DeleteConfirmation';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleAddCategory = () => {
    setSelectedCategory(null);
    setIsFormOpen(true);
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setIsFormOpen(true);
  };

  const handleDeleteCategory = (category) => {
    setSelectedCategory(category);
    setIsDeleteOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedCategory(null);
  };

  const handleDeleteClose = () => {
    setIsDeleteOpen(false);
    setSelectedCategory(null);
  };

  const handleSaveCategory = (category) => {
    if (selectedCategory) {
      // Update existing category
      setCategories(categories.map(cat => cat.id === category.id ? category : cat));
      toast.success('Category updated successfully!');
    } else {
      // Add new category
      setCategories([...categories, { ...category, id: categories.length + 1 }]);
      toast.success('Category added successfully!');
    }
    handleFormClose();
  };

  const handleConfirmDelete = () => {
    setCategories(categories.filter(cat => cat.id !== selectedCategory.id));
    toast.error('Category deleted successfully!');
    handleDeleteClose();
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-4xl font-bold text-center mb-4 mt-6">Categories</h1>
      <div className="flex justify-end mb-4">
        <button 
          onClick={handleAddCategory} 
          className="text-white py-2 px-4 rounded"
          style={{ backgroundColor: '#439AB8' }}
        >
          Add New Category
        </button>
      </div>
      <CategoriesTable 
        categories={categories}
        onEdit={handleEditCategory}
        onDelete={handleDeleteCategory}
      />
      {isFormOpen && (
        <CategoryForm 
          category={selectedCategory}
          onSave={handleSaveCategory}
          onClose={handleFormClose}
          isEditMode={!!selectedCategory}
        />
      )}
      {isDeleteOpen && (
        <DeleteConfirmation 
          category={selectedCategory}
          onConfirm={handleConfirmDelete}
          onClose={handleDeleteClose}
        />
      )}
    </div>
  );
};

export default Categories;