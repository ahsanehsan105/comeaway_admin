"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"

const mockCategories = [
  { id: 1, name: "Nature", description: "Natural sounds from the environment", count: 2 },
  { id: 2, name: "Weather", description: "Weather related sounds", count: 1 },
  { id: 3, name: "Meditation", description: "Sounds for meditation and relaxation", count: 1 },
  { id: 4, name: "Focus", description: "Sounds to improve concentration", count: 1 },
]

export default function AddOrUpdateSound({ setCurrentView, selectedSound = null }) {
  const [soundPreview, setSoundPreview] = useState(null)
  const [thumbnailPreview, setThumbnailPreview] = useState(null)

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

  return (
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
          onClick={() => setCurrentView("main")}
        >
          Cancel
        </button>
        <button
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => {
            // In a real app, you would save the form data
            setCurrentView("main")
          }}
          style={{ backgroundColor: '#439AB8' }}
        >
          Save Sound
        </button>
      </div>
    </div>
  )
}