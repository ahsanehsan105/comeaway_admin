"use client"

import { useState, useRef, useEffect } from "react"
import { Search, Plus, Edit, Trash2, ArrowLeft } from "lucide-react"

// Mock data for demonstration
const mockCategories = [
  { id: 1, name: "Nature", description: "Natural sounds from the environment", count: 2 },
  { id: 2, name: "Weather", description: "Weather related sounds", count: 1 },
  { id: 3, name: "Meditation", description: "Sounds for meditation and relaxation", count: 1 },
  { id: 4, name: "Focus", description: "Sounds to improve concentration", count: 1 },
]

export default function CategoryManagement() {
  const [currentView, setCurrentView] = useState("main")
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)
  const [filteredCategories, setFilteredCategories] = useState(mockCategories)
  const selectRef = useRef(null)

  // Filter categories based on search term
  useEffect(() => {
    const filtered = mockCategories.filter((category) => category.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setFilteredCategories(filtered)
  }, [searchTerm])

  const handleDeleteConfirm = () => {
    if (itemToDelete) {
      const updatedCategories = mockCategories.filter((category) => category.id !== itemToDelete.id)
      // In a real app, you would update the database here
      console.log(`Deleted category with ID: ${itemToDelete.id}`)
      // Update the filteredCategories state
      setFilteredCategories(updatedCategories)
    }
    setShowDeleteConfirm(false)
    setItemToDelete(null)
  }

  const renderMainView = () => (
    <div className="grid grid-cols-1 gap-6">
      <div className="flex justify-end">
        <button
          className="w-400 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md text-white transition-colors text-sm font-medium"
          onClick={() => {
            setSelectedCategory(null)
            setCurrentView("updateCategory")
          }}
          style={{ backgroundColor: '#439AB8' }}
        >
          <Plus className="h-5 w-5" />
          Add New Category
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
        <div className="p-6 bg-gray-50 border-b border-gray-200 rounded-t-lg">
          <h3 className="text-xl font-bold">Categories</h3>
          <p className="text-gray-500 mt-1">List of categories</p>
        </div>
        <div className="p-6">
          <div className="relative mb-6">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by category name..."
              className="pl-8 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="rounded-md border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
                  >
                    Sound Count
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCategories.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-6 text-center text-gray-500">
                      No categories found matching your search
                    </td>
                  </tr>
                ) : (
                  filteredCategories.map((category) => (
                    <tr key={category.id}>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{category.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500 hidden md:table-cell">
                        {category.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500 hidden md:table-cell">{category.count}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            className="inline-flex items-center p-1.5 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            onClick={() => {
                              setSelectedCategory(category)
                              setCurrentView("updateCategory")
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            className="inline-flex items-center p-1.5 border border-transparent rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            onClick={() => {
                              setItemToDelete(category)
                              setShowDeleteConfirm(true)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )

  const renderUpdateCategory = () => (
    <div className="bg-white rounded-lg border border-gray-200 shadow-md">
      <div className="p-6 bg-gray-50 border-b border-gray-200 rounded-t-lg">
        <div className="flex items-center">
          <button
            className="mr-2 p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={() => setCurrentView("main")}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h3 className="text-xl font-bold">{selectedCategory ? "Update Category" : "Add New Category"}</h3>
            <p className="text-gray-500 mt-1">Fill in the details below</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <form className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="category-name" className="block text-sm font-medium text-gray-700">
              Category Name
            </label>
            <input
              id="category-name"
              type="text"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter category name"
              defaultValue={selectedCategory?.name || ""}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="category-description" className="block text-sm font-medium text-gray-700">
              Category Description
            </label>
            <textarea
              id="category-description"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter category description"
              rows={3}
              defaultValue={selectedCategory?.description || ""}
            />
          </div>
        </form>
      </div>
      <div className="p-6 bg-gray-50 border-t border-gray-200 rounded-b-lg flex justify-end gap-2">
        <button
          className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => setCurrentView("main")}
        >
          Cancel
        </button>
        <button
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => {
            setCurrentView("main")
          }}
          style={{ backgroundColor: '#439AB8' }}
        >
          {selectedCategory ? "Save Category" : "Add Category"}
        </button>
      </div>
    </div>
  )

  // Delete confirmation modal
  const DeleteConfirmModal = () => {
    if (!showDeleteConfirm) return null

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>

          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <Trash2 className="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Confirm Deletion</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete "{itemToDelete?.name}"? This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={handleDeleteConfirm}
              >
                Delete
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Categories Management Module</h1>

      {currentView === "main" && renderMainView()}
      {currentView === "updateCategory" && renderUpdateCategory()}

      <DeleteConfirmModal />
    </div>
  )
}
