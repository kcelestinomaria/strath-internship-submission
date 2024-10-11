import { useRouter } from "next/router";
import React from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { BsArrowLeftCircle } from "react-icons/bs";

interface FileHeaderProps {
  headerName: string;
}

const FileHeader: React.FC<FileHeaderProps> = ({ headerName }) => {
  const router = useRouter();
  const isNestedDirectory = router.route === "/drive/[...Directory]"; // Changed 'Folder' to 'Directory'

  return (
    <div className="flex flex-col space-y-6 p-5 pb-2">
      <div className="flex items-center space-x-2 text-2xl text-textC">
        {isNestedDirectory && ( // Changed from isNestedFolder to isNestedDirectory
          <BsArrowLeftCircle
            className="h-6 w-6 cursor-pointer"
            onClick={() => router.back()}
            aria-label="Go back to the previous directory"
          />
        )}
        <h2 className="font-bold">{headerName}</h2> {/* Added font-bold for better visibility */}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button className="flex items-center space-x-2 rounded-lg border border-textC px-4 py-1 text-sm font-medium hover:bg-gray-100">
          <span>Type</span>
          <AiFillCaretDown className="mt-0.5 h-3 w-3" />
        </button>
        <button className="flex items-center space-x-2 rounded-lg border border-textC px-4 py-1 text-sm font-medium hover:bg-gray-100">
          <span>People</span>
          <AiFillCaretDown className="mt-0.5 h-3 w-3" />
        </button>
        <button className="flex items-center space-x-2 rounded-lg border border-textC px-4 py-1 text-sm font-medium hover:bg-gray-100">
          <span>Modified</span>
          <AiFillCaretDown className="mt-0.5 h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

export default FileHeader;
