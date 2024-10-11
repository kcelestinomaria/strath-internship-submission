import React, { useState } from "react";
import { renameFileInBackend } from "../api"; // Ensure you import the correct API function

interface RenameProps {
  setRenameToggle: (value: string) => void;
  fileId: string;
  fileName: string;
  isFolder: boolean;
  fileExtension: string;
}

const Rename: React.FC<RenameProps> = ({
  setRenameToggle,
  fileId,
  fileName,
  isFolder,
  fileExtension,
}) => {
  const [newName, setNewName] = useState<string>(fileName);
  const [error, setError] = useState<string | null>(null);

  const rename = async () => {
    // Check if the file name is empty
    if (newName.trim() === "") {
      setError("File name cannot be empty.");
      return;
    }

    try {
      // Format the new name if it's not a folder and doesn't have an extension
      const formatName = isFolder || newName.includes(".")
        ? newName
        : `${newName}.${fileExtension}`;

      // Call the renameFileInBackend function to rename the file or directory
      await renameFileInBackend(fileId, formatName, isFolder);

      setRenameToggle(""); // Close the rename pop-up
      setError(null); // Clear any previous errors
    } catch (err) {
      setError("Failed to rename the file. Please try again.");
    }
  };

  return (
    <div className="absolute top-9 z-10 space-y-2 rounded-xl bg-white p-3 shadow-lg shadow-[#bbb]">
      <h2 className="text-xl">Rename</h2>
      <input
        className="w-full rounded-md border border-textC py-1.5 indent-2 outline-textC2"
        type="text"
        placeholder="Rename"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        aria-label="Rename input"
        aria-required="true"
      />
      {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
      <div className="flex w-full justify-between font-medium text-textC2">
        <button
          type="button"
          onClick={() => setRenameToggle("")}
          className="rounded-full px-3 py-2 hover:bg-darkC2"
          aria-label="Cancel rename"
        >
          Cancel
        </button>
        <button
          onClick={rename}
          className={`rounded-full px-3 py-2 ${newName ? "hover:bg-darkC2" : "cursor-not-allowed opacity-50"}`}
          disabled={!newName} // Disable button if input is empty
          aria-label="Rename file"
        >
          Rename
        </button>
      </div>
    </div>
  );
};

export default Rename;
