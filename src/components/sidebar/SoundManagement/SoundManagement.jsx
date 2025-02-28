"use client"

import { useState, useRef, useEffect } from "react"
import { Search, Plus, Edit, Trash2, ArrowLeft, ChevronDown } from "lucide-react"

// Mock data for demonstration
const mockSounds = [
  {
    id: 1,
    title: "Ocean Waves",
    description: "Calming ocean waves sound",
    category: "Nature",
    status: "Premium",
    thumbnail: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    title: "Forest Birds",
    description: "Morning forest birds chirping",
    category: "Nature",
    status: "Standard",
    thumbnail: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    title: "Rain Storm",
    description: "Heavy rain and thunder",
    category: "Weather",
    status: "Premium",
    thumbnail: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    title: "Meditation Bell",
    description: "Tibetan meditation bell",
    category: "Meditation",
    status: "Standard",
    thumbnail: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 5,
    title: "White Noise",
    description: "Consistent white noise for focus",
    category: "Focus",
    status: "Premium",
    thumbnail: "/placeholder.svg?height=100&width=100",
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
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)
  const [isSelectOpen, setIsSelectOpen] = useState(false)
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("All")
  const [filteredSounds, setFilteredSounds] = useState(mockSounds) // Added state for filtered sounds
  const [filteredCategories, setFilteredCategories] = useState(mockCategories) // Added state for filtered categories
  const selectRef = useRef(null)
  const [soundPreview, setSoundPreview] = useState(null)
  const [thumbnailPreview, setThumbnailPreview] = useState(null)

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

  // Filter categories based on search term
  useEffect(() => {
    const filtered = mockCategories.filter((category) => category.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setFilteredCategories(filtered)
  }, [searchTerm])

  const handleDeleteConfirm = () => {
    if (itemToDelete) {
      if ("title" in itemToDelete) {
        // It's a sound
        const updatedSounds = mockSounds.filter((sound) => sound.id !== itemToDelete.id)
        // In a real app, you would update the database here
        console.log(`Deleted sound with ID: ${itemToDelete.id}`)
        // Update the filteredSounds state
        setFilteredSounds(updatedSounds)
      } else {
        // It's a category
        const updatedCategories = mockCategories.filter((category) => category.id !== itemToDelete.id)
        // In a real app, you would update the database here
        console.log(`Deleted category with ID: ${itemToDelete.id}`)
        // Update the filteredCategories state
        setFilteredCategories(updatedCategories)
      }
    }
    setShowDeleteConfirm(false)
    setItemToDelete(null)
  }

  const handleSoundUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSoundPreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleThumbnailUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setThumbnailPreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const renderMainView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
        <div className="p-6 bg-gray-50 border-b border-gray-200 rounded-t-lg">
          <h3 className="text-xl font-bold">Categories Management</h3>
          <p className="text-gray-500 mt-1">Manage your sound categories</p>
        </div>
        <div className="p-6">
          <div className="flex justify-center">
            <button
              className="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md text-white transition-colors text-sm font-medium"
              onClick={() => setCurrentView("categoriesOptions")}
              style={{ backgroundColor: '#439AB8' }}

            >
              <Plus className="h-5 w-5" />
              Manage Categories
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
        <div className="p-6 bg-gray-50 border-b border-gray-200 rounded-t-lg">
          <h3 className="text-xl font-bold">Sounds Management</h3>
          <p className="text-gray-500 mt-1">Manage your sound library</p>
        </div>
        <div className="p-6">
          <div className="flex justify-center">
            <button
              className="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md text-white transition-colors text-sm font-medium"
              onClick={() => setCurrentView("soundsOptions")}
              style={{ backgroundColor: '#439AB8' }}
            >
              <Plus className="h-5 w-5" />
              Manage Sounds
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderCategoriesOptions = () => (
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
            <h3 className="text-xl font-bold">Categories Management</h3>
            <p className="text-gray-500 mt-1">Choose an action to perform</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            className="h-24 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-sm font-medium"
            onClick={() => setCurrentView("updateCategories")}
          >
            Add/Update Categories
          </button>
          <button
            className="h-24 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors text-sm font-medium"
            onClick={() => setCurrentView("deleteCategories")}
          >
            Delete Categories
          </button>
        </div>
      </div>
    </div>
  )

  const renderSoundsOptions = () => (
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
            <h3 className="text-xl font-bold">Sounds Management</h3>
            <p className="text-gray-500 mt-1">Choose an action to perform</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            className="h-24 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-sm font-medium"
            onClick={() => {
              setSelectedSound(null)
              setCurrentView("updateSound")
            }}
          >
            Add/Update Sounds
          </button>
          <button
            className="h-24 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors text-sm font-medium"
            onClick={() => setCurrentView("deleteSounds")}
          >
            Delete Sounds
          </button>
        </div>
      </div>
    </div>
  )

  const renderUpdateSound = () => (
    <div className="bg-white rounded-lg border border-gray-200 shadow-md">
      <div className="p-6 bg-gray-50 border-b border-gray-200 rounded-t-lg">
        <div className="flex items-center">
          <button
            className="mr-2 p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={() => setCurrentView("soundsOptions")}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h3 className="text-xl font-bold">{selectedSound ? "Update Sound" : "Add New Sound"}</h3>
            <p className="text-gray-500 mt-1">Fill in the details below</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <form className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Sound Title
            </label>
            <input
              id="title"
              type="text"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter sound title"
              defaultValue={selectedSound?.title || ""}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Sound Description
            </label>
            <textarea
              id="description"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter sound description"
              rows={3}
              defaultValue={selectedSound?.description || ""}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="sound-file" className="block text-sm font-medium text-gray-700">
                Upload Sound
              </label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="sound-file"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:border-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">MP3, WAV or OGG</p>
                  </div>
                  <input
                    id="sound-file"
                    type="file"
                    className="hidden"
                    accept=".mp3,.wav,.ogg"
                    onChange={handleSoundUpload}
                  />
                </label>
              </div>
              {soundPreview && (
                <div className="mt-2">
                  <audio controls src={soundPreview} className="w-full">
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">
                Upload Thumbnail
              </label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="thumbnail"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:border-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG or GIF</p>
                  </div>
                  <input
                    id="thumbnail"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleThumbnailUpload}
                  />
                </label>
              </div>
              {thumbnailPreview && (
                <div className="mt-2">
                  <img
                    src={thumbnailPreview || "/placeholder.svg"}
                    alt="Thumbnail preview"
                    className="max-w-full h-auto rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Assign Categories</label>
            <div className="border border-gray-300 rounded-md p-4 space-y-2">
              {mockCategories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <div className="relative flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id={`category-${category.id}`}
                        type="checkbox"
                        defaultChecked={selectedSound?.category === category.name}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor={`category-${category.id}`} className="font-medium text-gray-700">
                        {category.name}
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Set Status</label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  id="standard"
                  name="status"
                  type="radio"
                  defaultChecked={!selectedSound || selectedSound?.status === "Standard"}
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="standard" className="ml-3 block text-sm font-medium text-gray-700">
                  Standard User
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="premium"
                  name="status"
                  type="radio"
                  defaultChecked={selectedSound?.status === "Premium"}
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="premium" className="ml-3 block text-sm font-medium text-gray-700">
                  Premium User
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="p-6 bg-gray-50 border-t border-gray-200 rounded-b-lg flex justify-end gap-2">
        <button
          className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => setCurrentView("soundsOptions")}
        >
          Cancel
        </button>
        <button
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => {
            // In a real app, you would save the form data
            setCurrentView("soundsOptions")
          }}
          style={{ backgroundColor: '#439AB8' }}
        >
          Save Sound
        </button>
      </div>
    </div>
  )

  const renderDeleteSounds = () => (
    <div className="bg-white rounded-lg border border-gray-200 shadow-md">
      <div className="p-6 bg-gray-50 border-b border-gray-200 rounded-t-lg">
        <div className="flex items-center">
          <button
            className="mr-2 p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={() => setCurrentView("soundsOptions")}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h3 className="text-xl font-bold">Delete Sounds</h3>
            <p className="text-gray-500 mt-1">Search and select sounds to delete</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title or category..."
              className="pl-8 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative" ref={selectRef}>
            <button
              type="button"
              className="inline-flex w-[180px] justify-between items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={() => setIsSelectOpen(!isSelectOpen)}
            >
              {selectedCategoryFilter}
              <ChevronDown className="h-4 w-4 ml-2" />
            </button>
            {isSelectOpen && (
              <div className="absolute right-0 z-10 mt-1 w-[180px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
        </div>

        <div className="rounded-md border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Thumbnail
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
                filteredSounds.map((sound) => (
                  <tr key={sound.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={sound.thumbnail || "/placeholder.svg"}
                        alt={sound.title}
                        className="h-10 w-10 rounded-md object-cover"
                      />
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
  )

  const renderUpdateCategories = () => (
    <div className="bg-white rounded-lg border border-gray-200 shadow-md">
      <div className="p-6 bg-gray-50 border-b border-gray-200 rounded-t-lg">
        <div className="flex items-center">
          <button
            className="mr-2 p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={() => setCurrentView("categoriesOptions")}
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
          onClick={() => setCurrentView("categoriesOptions")}
        >
          Cancel
        </button>
        <button
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => {
            setCurrentView("categoriesOptions")
          }}
          style={{ backgroundColor: '#439AB8' }}
        >
          Save Category
        </button>
      </div>
    </div>
  )

  const renderDeleteCategories = () => (
    <div className="bg-white rounded-lg border border-gray-200 shadow-md">
      <div className="p-6 bg-gray-50 border-b border-gray-200 rounded-t-lg">
        <div className="flex items-center">
          <button
            className="mr-2 p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={() => setCurrentView("categoriesOptions")}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h3 className="text-xl font-bold">Delete Categories</h3>
            <p className="text-gray-500 mt-1">Search and select categories to delete</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by category name..."
              className="pl-8 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
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
                            setCurrentView("updateCategories")
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
                      Are you sure you want to delete "{itemToDelete?.title || itemToDelete?.name}"? This action cannot
                      be undone.
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
      {currentView === "categoriesOptions" && renderCategoriesOptions()}
      {currentView === "soundsOptions" && renderSoundsOptions()}
      {currentView === "updateSound" && renderUpdateSound()}
      {currentView === "deleteSounds" && renderDeleteSounds()}
      {currentView === "updateCategories" && renderUpdateCategories()}
      {currentView === "deleteCategories" && renderDeleteCategories()}

      <DeleteConfirmModal />
    </div>
  )
}

