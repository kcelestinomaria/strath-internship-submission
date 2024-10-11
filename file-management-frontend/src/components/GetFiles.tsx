import React, { useState } from "react";
import { fetchFiles } from "@/hooks/fetchFiles";
import Image from "next/image";
import fileIcons from "@/components/fileIcons";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSession } from "next-auth/react";
import FileDropDown from "./FileDropDown";
import { fetchAllFiles } from "@/hooks/fetchAllFiles";
import Rename from "./Rename";

interface GetFilesProps {
  folderId: string;
  select: string;
}

function GetFiles({ folderId, select }: GetFilesProps) {
  const [openMenu, setOpenMenu] = useState<string>("");
  const [renameToggle, setRenameToggle] = useState<string>("");

  const { data: session } = useSession();

  // Fetch the appropriate file list based on the folder and selection
  let fileList = fetchFiles(folderId, session?.user.email!);
  if (select) fileList = fetchAllFiles(session?.user.email!);

  const openFile = (fileLink: string) => {
    window.open(fileLink, "_blank");
  };

  const handleMenuToggle = (fileId: string) => {
    setRenameToggle("");
    setOpenMenu((prevOpenMenu) => (prevOpenMenu === fileId ? "" : fileId));
  };

  const renderFileIcon = (file: any) => {
    return fileIcons[file.fileExtension as keyof typeof fileIcons] ?? fileIcons["any"];
  };

  const renderFileContent = (file: any) => {
    const icon = renderFileIcon(file);
    const isImageFile = ["jpg", "ico", "webp", "png", "jpeg", "gif", "jfif"].includes(file.fileExtension);
    
    if (isImageFile) {
      return (
        <Image
          src={file.fileLink}
          alt={file.fileName}
          height={500}
          width={500}
          draggable={false}
          className="h-full w-full rounded-sm object-cover object-center"
        />
      );
    }

    if (file.fileExtension === "mp3") {
      return (
        <div className="flex flex-col items-center justify-center">
          <div className="h-24 w-24">{icon}</div>
          <audio controls className="w-44">
            <source src={file.fileLink} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      );
    }

    if (file.fileExtension === "mp4") {
      return (
        <video controls className="h-36 w-36">
          <source src={file.fileLink} type="video/mp4" />
          <div className="h-36 w-36">{icon}</div>
        </video>
      );
    }

    return <div className="h-36 w-36">{icon}</div>;
  };

  const shouldDisplayFile = (file: any) => {
    let condition = !file?.isFolder && !file?.isTrashed;
    if (select === "starred") condition = !file?.isFolder && file?.isStarred && !file?.isTrashed;
    else if (select === "trashed") condition = !file?.isFolder && file?.isTrashed;
    return condition;
  };

  const list = fileList
    .filter(shouldDisplayFile)
    .map((file) => (
      <div
        key={file.id}
        onDoubleClick={() => openFile(file.fileLink)}
        className="hover:cursor-alias"
      >
        <div className="flex w-full flex-col items-center justify-center overflow-hidden rounded-xl bg-darkC2 px-2.5 hover:bg-darkC">
          <div className="relative flex w-full items-center justify-between px-1 py-3">
            <div className="flex items-center space-x-4">
              <div className="h-6 w-6">{renderFileIcon(file)}</div>
              <span className="w-32 truncate text-sm font-medium text-textC">
                {file.fileName}
              </span>
            </div>
            <BsThreeDotsVertical
              onClick={() => handleMenuToggle(file.id)}
              className="h-6 w-6 cursor-pointer rounded-full p-1 hover:bg-[#ccc]"
            />
            {openMenu === file.id && (
              <FileDropDown
                file={file}
                setOpenMenu={setOpenMenu}
                isFolderComp={false}
                select={select}
                folderId=""
                setRenameToggle={setRenameToggle}
              />
            )}
            {renameToggle === file.id && (
              <Rename
                setRenameToggle={setRenameToggle}
                fileId={file.id}
                isFolder={file.isFolder}
                fileName={file.fileName}
                fileExtension={file.fileExtension}
              />
            )}
          </div>
          <div className="flex h-44 w-48 items-center justify-center pb-2.5">
            {renderFileContent(file)}
          </div>
        </div>
      </div>
    ));

  return <>{list}</>;
}

export default GetFiles;
