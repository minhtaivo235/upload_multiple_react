import { useState } from "react";
export interface IFileWithPreview extends File {
  preview?: string;
}
export class FileUploadType extends File {
  preview?: string;
}

export default function useFileUpload(defaultValue: IFileWithPreview[]) {
  const [files, setFile] = useState<IFileWithPreview[]>(defaultValue);
  const [confirm, setConfirm] = useState(false);
  const [filePreview, setFilePreview] = useState<FileUploadType>();

  const handleChangeFiles = (file: File) => {
    const fileResult = Object.assign(file, {
      preview: URL.createObjectURL(file),
    });
    setFilePreview(fileResult);
    setConfirm(true);
  };
  const uploadFile = (file: FileUploadType | undefined) => {
    if (file) setFile([...files, file]);
  };

  const deleteFile = (index: number) => {
    setFile(files.filter((item, ind) => ind !== index));
    setConfirm(false);
  };

  return {
    files,
    handleChangeFiles,
    setConfirm,
    deleteFile,
    confirm,
    filePreview,
    uploadFile,
  };
}
