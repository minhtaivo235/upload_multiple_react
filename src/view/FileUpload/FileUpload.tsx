import React from "react";
import { FileUploader } from "react-drag-drop-files";
import useFileUpload from "./hooks/useFileUpload";
import PopupConfirm from "./PopupConfirm/PopupConfirm";
import ShowImage from "./ShowImage";

const fileTypes = ["JPG", "PNG", "GIF"];

const FileUpload = () => {
  const {
    files,
    handleChangeFiles,
    setConfirm,
    deleteFile,
    confirm,
    filePreview,
    uploadFile,
  } = useFileUpload([]);

  return (
    <>
      <div className="file-upload">
        <h1>Hello To Drag & Drop Files</h1>
        <FileUploader
          handleChange={handleChangeFiles}
          name="file"
          types={fileTypes}
          fileOrFiles={files}
        >
          <div></div>
        </FileUploader>

        <div className="upload-zone">
          {files && <ShowImage files={files} deleteCb={deleteFile} />}
          <i className="fa-solid fa-cloud-arrow-up"></i>
          <p>
            <span>Tải ảnh </span>hoặc kéo thả để thêm ảnh
          </p>
        </div>
      </div>
      {confirm && (
        <PopupConfirm
          show={confirm}
          file={filePreview}
          setShow={setConfirm}
          uploadFile={uploadFile}
        />
      )}
    </>
  );
};

export default FileUpload;
