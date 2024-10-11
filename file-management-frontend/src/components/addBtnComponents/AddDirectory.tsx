import React from "react";
import { createDirectory } from '../../api'; // Import the createDirectory function

// Define the prop types for better type checking and clarity
interface directoryToggleProps {
  setDirectoryToggle: React.Dispatch<React.SetStateAction<boolean>>;
  setDirectoryName: React.Dispatch<React.SetStateAction<string>>;
  fetchDirectories: () => Promise<void>; // Ensure to fetch directories after creating one
}

// The AddDirectory component displays a pop-up for creating a new directory.
function AddDirectory({
  setDirectoryToggle,
  setDirectoryName,
  fetchDirectories,
}: directoryToggleProps) {
  const addDirectory = async () => {
    const directoryName = ""; // Default value can be set or passed from the input
    try {
      await createDirectory({ name: directoryName }); // Create the directory with the name
      setDirectoryToggle(false); // Close the pop-up after creation
      await fetchDirectories(); // Fetch the updated list of directories
    } catch (error) {
      console.error("Failed to create directory:", error);
      // Optionally, show an error message to the user
    }
  };

  return (
    // Background overlay for the pop-up
    <div
      onClick={() => setDirectoryToggle(false)} // Close the pop-up when clicking outside
      className="absolute -left-5 -top-20 z-20 flex h-screen w-screen items-center justify-center bg-darkC2/40"
    >
      {/* Pop-up form for creating a new directory */}
      <div
        onClick={(e) => {
          e.stopPropagation(); // Prevent clicks inside the form from closing the pop-up
        }}
        className="w-96 space-y-6 rounded-xl bg-white p-5 shadow-lg shadow-[#bbb]"
      >
        <h2 className="text-2xl">New Directory</h2>
        <input
          className="w-full rounded-md border border-textC py-2 indent-5 outline-textC2"
          type="text"
          placeholder="Untitled directory"
          onChange={(e) => setDirectoryName(e.target.value)}
        />
        <div className="flex w-full justify-end space-x-5 pr-3 font-medium text-textC2">
          <button
            type="button"
            onClick={() => setDirectoryToggle(false)}
            className="rounded-full px-3 py-2 hover:bg-darkC2"
          >
            Cancel
          </button>
          <button
            onClick={addDirectory}
            className="rounded-full px-3 py-2 hover:bg-darkC2"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddDirectory;
