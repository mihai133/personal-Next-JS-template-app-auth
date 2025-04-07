import { useState } from "react";

export const useUploadFile = (maxFiles = 10) => {
  const [files, setFile] = useState([]);
  const [message, setMessage] = useState();
  console.log(files);
  const handleFile = (e) => {
    setMessage("");
    let file = e.target.files;

    for (let i = 0; i < file.length; i++) {
      const fileType = file[i]["type"];
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (validImageTypes.includes(fileType)) {
        if (files.length < maxFiles) {
          setFile([...files, file[i]]);
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
