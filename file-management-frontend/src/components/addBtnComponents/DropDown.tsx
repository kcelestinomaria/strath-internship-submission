import React from "react";
import { MdDriveFolderUpload, MdOutlineCreateNewFolder } from "react-icons/md";
import UploadFileBtn from "./UploadFileBtn.tsx";

interface DropDownProps {
  setDirectoryToggle: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDropDown: React.Dispatch<React.SetStateAction<boolean>>;
  uploadFile: (files: FileList | null) => Promise<void>; // Accept FileList or null
  directoryId: string; // Add directoryId prop
}

// The DropDown component renders a dropdown menu for creating new directories and uploading files.
const DropDown: React.FC<DropDownProps> = ({
  setDirectoryToggle,
  setIsDropDown,
  uploadFile,
  directoryId, // Accept directoryId as a prop
}) => {
  return (
    <div
      onClick={() => setIsDropDown(false)} // Close the pop-up when clicking outside
      className="absolute -left-5 -top-20 flex h-screen w-screen items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside the form from closing the pop-up
        className="absolute left-6 top-[68px] w-72 rounded-md bg-white text-textC shadow-md shadow-[#bbb]"
      >
        {/* New directory section */}
        <div className="border-b py-2">
          <button
            onClick={() => setDirectoryToggle(true)} // Trigger the "New Directory" action
            className="flex w-full items-center space-x-3 px-4 py-1.5 hover:bg-darkC"
          >
            <MdOutlineCreateNewFolder className="h-5 w-5" />
            <span>New Directory</span>
          </button>
        </div>
        {/* File upload section */}
        <div className="border-b py-2">
          <UploadFileBtn uploadFile={uploadFile} directoryId={directoryId} /> {/* Pass directoryId */}
        </div>
      </div>
    </div>
  );
};

export default DropDown;
