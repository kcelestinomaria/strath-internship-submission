import { useSession } from "next-auth/react";
import React, { useState, useEffect, useRef } from "react";
import { AiFillFolder, AiOutlineSearch } from "react-icons/ai";
import fileIcons from "../fileIcons";
import { useRouter } from "next/router";
import { fetchFiles } from "@/hooks/api"; // Make sure to import the fetchFiles function

function Search() {
  const [searchTest, setSearchTest] = useState<string>("");
  const [onFocus, setOnFocus] = useState<boolean>(false);
  const [files, setFiles] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user.email) {
        const fetchedFiles = await fetchFiles(session.user.email);
        setFiles(fetchedFiles);
      }
    };

    fetchData();
  }, [session]);

  const openFile = (fileLink: string) => {
    // Function to open a file in a new tab.
    window.open(fileLink, "_blank");
  };

  const searchList = files.filter((item) => {
    return (
      (item.fileName?.toLowerCase().includes(searchTest.toLowerCase()) &&
        searchTest &&
        !item?.isTrashed) ||
      (item.folderName?.toLowerCase().includes(searchTest.toLowerCase()) &&
        searchTest &&
        !item?.isTrashed)
    );
  });

  const result = searchList.map((item) => {
    const icon =
      fileIcons[item.fileExtension as keyof typeof fileIcons] ??
      fileIcons["any"];
    return (
      <div
        key={item.id} // Add a unique key for each item
        onClick={() => {
          item.isFolder
            ? router.push("/drive/folders/" + item.id)
            : openFile(item.fileLink);
        }}
        className="flex w-full cursor-pointer items-center space-x-3.5 border-blue-700 px-4 py-2 hover:border-l-2 hover:bg-darkC2"
      >
        <span className="h-6 w-6">
          {item.isFolder ? (
            <AiFillFolder className="h-full w-full text-textC" />
          ) : (
            icon
          )}
        </span>
        <span className="w-full truncate">
          {item.fileName || item.folderName}
        </span>
      </div>
    );
  });

  const handleDocumentClick = (e: { target: any }) => {
    if (
      inputRef.current &&
      e.target &&
      !inputRef.current.contains(e.target as Node)
    ) {
      setOnFocus(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <div className="relative flex-1" onFocus={() => setOnFocus(true)}>
      <span className="absolute left-2 top-[5px] h-9 w-9 cursor-pointer rounded-full p-2 hover:bg-darkC">
        <AiOutlineSearch className="h-full w-full stroke-textC" stroke="2" />
      </span>

      <input
        ref={inputRef}
        onChange={(e) => setSearchTest(e.target.value)}
        type="text"
        placeholder="Search in Drive"
        className="w-full rounded-full bg-darkC2 px-2 py-[11px] indent-11 shadow-darkC
        placeholder:text-textC focus:rounded-b-none
        focus:rounded-t-2xl focus:bg-white focus:shadow-md focus:outline-none"
      />
      {onFocus && (
        <div
          className="absolute z-10 max-h-60 w-full overflow-scroll rounded-b-2xl border-t-[1.5px]
      border-textC bg-white pt-2 shadow-md shadow-darkC"
        >
          {result.length < 1 && searchTest ? (
            <div className="pl-5 text-sm text-gray-500">
              No result match your search.
            </div>
          ) : (
            result
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
