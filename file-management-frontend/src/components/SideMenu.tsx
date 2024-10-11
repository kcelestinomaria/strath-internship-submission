"use client";
import React, { useState, ChangeEvent } from "react";
import { HiOutlinePlusSm } from "react-icons/hi";
import DropDown from "./addBtnComponents/DropDown";
import AddDirectory from "./addBtnComponents/AddDirectory"; // Consider renaming this to AddDirectory
import Navbar from "./Navbar";
import fileUpload from "../api";
import ProgressIndicator from "./ProgressIndicator";
import { createDirectory } from "../api"; // Updated to createDirectory
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

function SideMenu() {
  const [isDropDown, setIsDropDown] = useState(false);
  const [progress, setProgress] = useState<number[]>([]);
  const [fileName, setFileName] = useState<string[]>([]);
  const [directoryName, setDirectoryName] = useState<string>(""); // Renamed from folderName
  const [directoryToggle, setDirectoryToggle] = useState(false); // Renamed from folderToggle

  const router = useRouter();
  const { Folder } = router.query;

  const { data: session } = useSession();
  const userEmail = session?.user.email;

  // Add new file
  const uploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files || [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file) return;

      // Avoid duplicate filenames
      setFileName((prev) => [...prev, file.name]);
      fileUpload(file, setProgress, Folder?.[1] || "", userEmail!);
    }
  };

  // Add new directory
  const uploadDirectory = async () => {
    if (!directoryName && !userEmail) {
      console.error("Directory name or user email is not defined.");
      return;
    }

    const payload = {
      directoryName: directoryName.trim() || "Untitled directory", // Renamed from folderName
      isDirectory: true, // Renamed from isFolder
      isStarred: false,
      isTrashed: false,
      FileList: [],
      folderId: Folder?.[1] || "",
      userEmail,
    };

    try {
      await createDirectory(payload); // Updated to createDirectory
      setDirectoryName(""); // Renamed from folderName
    } catch (error) {
      console.error("Error adding directory:", error);
    }
  };

  return (
    <section className="relative h-[90vh] w-16 space-y-4 duration-500 tablet:w-60">
      <button
        onClick={() => setIsDropDown(true)}
        className="mt-1 flex w-fit items-center justify-center space-x-2 rounded-2xl bg-white p-3 text-textC shadow-md shadow-[#ddd] duration-300 hover:bg-darkC2 hover:shadow-[#bbb] tablet:px-5 tablet:py-4"
      >
        <HiOutlinePlusSm className="h-6 w-6" />
        <span className="hidden text-sm font-medium tablet:block">New</span>
      </button>
      {/* Add new file or directory drop down */}
      {isDropDown && (
        <DropDown
          setDirectoryToggle={setDirectoryToggle} // Renamed from setFolderToggle
          uploadFile={uploadFile}
          setIsDropDown={setIsDropDown}
        />
      )}
      {/* Progress Indicator */}
      <ProgressIndicator
        progress={progress}
        fileName={fileName}
        setFileName={setFileName}
      />
      {/* New directory */}
      {directoryToggle && (
        <<AddDirectory></AddDirectory> // Consider renaming this to AddDirectory
          setDirectoryToggle={setDirectoryToggle} // Renamed from setFolderToggle
          setDirectoryName={setDirectoryName} // Renamed from setFolderName
          uploadDirectory={uploadDirectory} // Renamed from uploadFolder
        />
      )}
      {/* navbar */}
      <Navbar />
    </section>
  );
}

export default SideMenu;
