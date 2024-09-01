export default function FeatureImageSelector({
  featuredImage,
  newImage,
  setNewImage,
  handleImageSubmit,
}) {
  return (
    <div className="mb-4">
      <label className="text-xs">Featured Image</label>
      <label className="relative inline-block cursor-pointer w-full">
        <img
          src={newImage ? URL.createObjectURL(newImage) : featuredImage}
          alt="Featured"
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-0 opacity-0 hover:opacity-100 hover:bg-opacity-50 transition duration-300 ease-in-out">
          <span className="text-white text-sm">Change Image</span>
        </div>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => setNewImage(e.target.files[0])}
        />
      </label>
      {newImage && (
        <div className="flex items-center gap-4 mt-2">
          <button
            type="button"
            onClick={handleImageSubmit}
            className="bg-green-500 text-white font-bold py-2 px-4 rounded"
          >
            Upload
          </button>
          <button
            type="button"
            onClick={() => setNewImage(null)}
            className="bg-red-500 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
