import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { FileUploader } from "react-drag-drop-files";
import "./FileUpload.scss";
import useFileUpload from "./hooks/useFileUpload";
import PopupConfirm from "./PopupConfirm/PopupConfirm";
import ShowImage from "./ShowImage";

const fileTypes = ["JPG", "PNG", "GIF"];

const FileUpload = () => {
  const { files, handleChangeFiles, setConfirm, deleteFile, confirm } =
    useFileUpload([]);

  return (
    <>
      <div className="file-upload">
        <h1>Hello To Drag & Drop Files</h1>
        <FileUploader
          handleChange={handleChangeFiles}
          name="file"
          types={fileTypes}
        >
          <div></div>
        </FileUploader>

        <div className="upload-zone">
          {!confirm && <ShowImage files={files} deleteCb={deleteFile} />}
          <i className="fa-solid fa-cloud-arrow-up"></i>
          <p>
            <span>Tải ảnh </span>hoặc kéo thả để thêm ảnh
          </p>
        </div>
      </div>
      <PopupConfirm
        show={confirm}
        files={files}
        setShow={setConfirm}
        cancel={deleteFile}
      />
    </>
  );
};

export default FileUpload;
