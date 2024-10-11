"use client";
import React, { useState } from "react";
import { AiOutlineClose, AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoMdCheckmarkCircle,
} from "react-icons/io";
import fileIcons from "./fileIcons";

interface ProgressIndicatorProps {
  progress: number[];
  fileName: string[];
  setFileName: (fileNames: string[]) => void;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  progress,
  fileName,
  setFileName,
}) => {
  const [minimize, setMinimize] = useState(true);

  // Function to render the file names with their progress
  const renderFileNames = () => {
    return fileName.map((name, index) => {
      const fileExtension = name.split(".").pop() || "any"; // Default to 'any' if no extension
      const icon = fileIcons[fileExtension] || fileIcons["any"]; // Fallback to 'any' icon

      return (
        <div
          key={index}
          className="flex cursor-pointer items-center justify-between bg-white py-2.5 pl-4 pr-2 hover:bg-darkC"
          role="listitem"
        >
          <div className="flex items-center space-x-3">
            <div className="h-6 w-6" aria-hidden="true">
              {icon}
            </div>
            <span className="w-60 truncate" title={name} aria-label={`File name: ${name}`}>{name}</span>
          </div>
          {progress[index]! < 100 ? (
            <span className="pr-2" aria-label={`Progress: ${progress[index]}%`}>{progress[index]}%</span>
          ) : (
            <IoMdCheckmarkCircle className="h-9 w-9 p-1.5 pr-2 text-green-600" aria-label="Upload complete" />
          )}
        </div>
      );
    });
  };

  // Function to render the upload status message
  const renderStatusMessage = () => {
    return progress[0]! < 100 ? (
      <h3 className="flex items-center space-x-5 font-medium text-textC">
        <span className="animate-pulse">Uploading file</span>
        <AiOutlineLoading3Quarters className="animate-spin text-green-600" />
      </h3>
    ) : (
      <h3 className="font-medium text-textC" aria-label={`${fileName.length} upload${fileName.length > 1 ? 's' : ''} complete`}>
        {fileName.length} upload{fileName.length > 1 ? "s" : ""} complete
      </h3>
    );
  };

  return (
    fileName.length > 0 && (
      <div className="absolute bottom-0 w-screen" role="dialog" aria-modal="true">
        <div
          className={`absolute right-8 z-20 w-[23rem] overflow-hidden rounded-t-2xl shadow-sm shadow-textC tablet:right-10 transition-transform duration-300 ${
            minimize ? "-bottom-4" : "-top-10"
          }`}
        >
          <div className="flex items-center justify-between bg-bgc py-2 pl-4 pr-2">
            {renderStatusMessage()}
            <div className="flex items-center">
              <div onClick={() => setMinimize(!minimize)} aria-hidden="true">
                {minimize ? (
                  <IoIosArrowDown className="h-9 w-9 cursor-pointer rounded-full p-2 hover:bg-darkC" />
                ) : (
                  <IoIosArrowUp className="h-9 w-9 cursor-pointer rounded-full p-2 hover:bg-darkC" />
                )}
              </div>
              <AiOutlineClose
                onClick={() => setFileName([])}
                className="h-9 w-9 cursor-pointer rounded-full p-2 hover:bg-darkC"
                aria-label="Close progress indicator"
              />
            </div>
          </div>
          <div className="flex max-h-60 flex-col overflow-y-scroll" role="list">
            {renderFileNames()}
          </div>
        </div>
      </div>
    )
  );
};

export default ProgressIndicator;
