import { useState } from "react";
export interface IFileWithPreview extends File {
  preview?: string;
}

export default function useFileUpload(defaultValue: IFileWithPreview[]) {
  const [files, setFile] = useState(defaultValue);
  const [confirm, setConfirm] = useState(false);

  const handleChangeFiles = (file: IFileWithPreview) => {
    const result: IFileWithPreview[] = [...files];
    const fileResult = Object.assign(file, {
      preview: URL.createObjectURL(file),
    });
    result.push(fileResult);
    setFile(result);
    setConfirm(true);
  };

  const deleteFile = (index: number) => {
    setFile(files.filter((item, ind) => ind !== index));
  };

  return { files: files, handleChangeFiles, setConfirm, deleteFile, confirm };
}
