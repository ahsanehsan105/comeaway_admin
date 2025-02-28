"use client"

import { useState, useRef, useEffect } from "react"
import { Search, Plus, Edit, Trash2, ChevronDown } from "lucide-react"
import AddOrUpdateSound from './component/AddUpdateForm'

// Mock data for demonstration
const mockSounds = [
  {
    id: 1,
    title: "Ocean Waves",
    description: "Calming ocean waves sound",
    category: "Nature",
    status: "Premium",
  },
  {
    id: 2,
    title: "Forest Birds",
    description: "Morning forest birds chirping",
    category: "Nature",
    status: "Standard",
  },
  {
    id: 3,
    title: "Rain Storm",
    description: "Heavy rain and thunder",
    category: "Weather",
    status: "Premium",
  },
  {
    id: 4,
    title: "Meditation Bell",
    description: "Tibetan meditation bell",
    category: "Meditation",
    status: "Standard",
  },
  {
    id: 5,
    title: "White Noise",
    description: "Consistent white noise for focus",
    category: "Focus",
    status: "Premium",
  },
]

const mockCategories = [
  { id: 1, name: "Nature", description: "Natural sounds from the environment", count: 2 },
  { id: 2, name: "Weather", description: "Weather related sounds", count: 1 },
  { id: 3, name: "Meditation", description: "Sounds for meditation and relaxation", count: 1 },
  { id: 4, name: "Focus", description: "Sounds to improve concentration", count: 1 },
]

export default function SoundManagement() {
  const [currentView, setCurrentView] = useState("main")
  const [selectedSound, setSelectedSound] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)
  const [isSelectOpen, setIsSelectOpen] = useState(false)
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("All")
  const [filteredSounds, setFilteredSounds] = useState(mockSounds)
  const selectRef = useRef(null)

  // Close select dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsSelectOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Filter sounds based on search term
  useEffect(() => {
    const filtered = mockSounds.filter(
      (sound) =>
        (sound.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sound.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedCategoryFilter === "All" || sound.category === selectedCategoryFilter),
    )
    setFilteredSounds(filtered)
  }, [searchTerm, selectedCategoryFilter])

  const handleDeleteConfirm = () => {
    if (itemToDelete) {
      const updatedSounds = mockSounds.filter((sound) => sound.id !== itemToDelete.id)
      // In a real app, you would update the database here
      console.log(`Deleted sound with ID: ${itemToDelete.id}`)
      // Update the filteredSounds state
      setFilteredSounds(updatedSounds)
    }
    setShowDeleteConfirm(false)
    setItemToDelete(null)
  }

  const renderMainView = () => (
    <div className="grid grid-cols-1 gap-6">
      <div className="p-6">
        <div className="flex justify-end">
          <button
            className="w-400 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md text-white transition-colors text-sm font-medium"
            onClick={() => setCurrentView("addSound")}
            style={{ backgroundColor: '#439AB8' }}
          >
            <Plus className="h-5 w-5" />
            Add New Sound
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
        <div className="p-6 bg-gray-50 border-b border-gray-200 rounded-t-lg">
          <h3 className="text-xl font-bold">Sounds</h3>
          <p className="text-gray-500 mt-1">List of sounds</p>
        </div>
        <div className="p-6">
          <div className="relative mb-6">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title or category..."
              className="pl-8 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative mb-6">
            <button
              type="button"
              className="inline-flex w-full justify-between items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={() => setIsSelectOpen(!isSelectOpen)}
              ref={selectRef}
            >
              {selectedCategoryFilter}
              <ChevronDown className="h-4 w-4 ml-2" />
            </button>
            {isSelectOpen && (
              <div className="absolute right-0 mt-1 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <button
                    className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                    onClick={() => {
                      setSelectedCategoryFilter("All")
                      setIsSelectOpen(false)
                    }}
                  >
                    All Categories
                  </button>
                  {mockCategories.map((category) => (
                    <button
                      key={category.id}
                      className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                      onClick={() => {
                        setSelectedCategoryFilter(category.name)
                        setIsSelectOpen(false)
                      }}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="rounded-md border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Sr No.
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
                  >
                    Status
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
                {filteredSounds.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-6 text-center text-gray-500">
                      No sounds found matching your search
                    </td>
                  </tr>
                ) : (
                  filteredSounds.map((sound, index) => (
                    <tr key={sound.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{sound.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500 hidden md:table-cell">{sound.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            sound.status === "Premium" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
                          }`}
                        >
                          {sound.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            className="inline-flex items-center p-1.5 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            onClick={() => {
                              setSelectedSound(sound)
                              setCurrentView("updateSound")
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            className="inline-flex items-center p-1.5 border border-transparent rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            onClick={() => {
                              setItemToDelete(sound)
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
                      Are you sure you want to delete "{itemToDelete?.title}"? This action cannot be undone.
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
      <h1 className="text-3xl font-bold mb-8 text-center">Sounds Management Module</h1>

      {currentView === "main" && renderMainView()}
      {currentView === "addSound" && <AddOrUpdateSound setCurrentView={setCurrentView} />}
      {currentView === "updateSound" && <AddOrUpdateSound setCurrentView={setCurrentView} selectedSound={selectedSound} />}

      <DeleteConfirmModal />
    </div>
  )
}