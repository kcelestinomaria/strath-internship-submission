import React from "react";
import { MdUploadFile } from "react-icons/md";
import { createMultipleFiles } from "../../api"; // Import the createMultipleFiles function

interface UploadFileBtnProps {
  uploadFile: (files: FileList | null) => Promise<void>; // Accept FileList or null
  directoryId: string; // Pass the directoryId to upload files
}

// The UploadFileBtn component handles file uploads.
const UploadFileBtn: React.FC<UploadFileBtnProps> = ({ uploadFile, directoryId }) => {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      await uploadFile(files); // Pass the selected files to the uploadFile function
    }
  };

  const handleMultipleUpload = async (files: FileList | null) => {
    if (files) {
      try {
        const fileArray = Array.from(files); // Convert FileList to an array
        await createMultipleFiles(directoryId, fileArray); // Call the function to upload multiple files
        // Optionally: Refresh file listing or perform other actions here
      } catch (error) {
        console.error("Error uploading files:", error);
      }
    }
  };

  return (
    <button className="relative flex w-full items-center space-x-3 px-4 py-1.5 hover:bg-darkC">
      <MdUploadFile className="h-5 w-5" />
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="absolute -left-3 top-0 h-full w-full cursor-pointer bg-slate-300 opacity-0"
        aria-label="Upload file" // Accessibility label
      />
      <span>File Upload</span>
    </button>
  );
};

export default UploadFileBtn;
