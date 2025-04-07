import { useState } from "react";

export const useUploadFile = (maxFiles = 10) => {
  const [files, setFile] = useState([]);
  const [message, setMessage] = useState();

  const handleFile = (e) => {
    setMessage("");
    const fileArr = e.target.files;
    setFile(files);

    for (let i = 0; i < fileArr.length; i++) {
      const fileType = fileArr[i]["type"];
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (validImageTypes.includes(fileType)) {
        if (files.length < maxFiles) {
          setFile([...files, fileArr[i]]);
        } else {
          console.log("Max files reached");
          setMessage("max files reached");
        }
      } else {
        setMessage("only images accepted");
      }
    }
  };
  const removeImage = (i) => {
    setFile(files.filter((x) => x.name !== i));
  };

  return [files, setFile, message, handleFile, removeImage];
};
