import React from "react";
import { IFileWithPreview } from "../../hooks/useFileUpload";
import "./ListImage.scss";

interface ListImageProps {
  files: IFileWithPreview[];
}

const ListImage: React.FC<ListImageProps> = ({ files }) => {
  return (
    <div className="list-image">
      {files.map((file, i) => (
        <img key={file.name + i} src={file.preview} alt="" />
      ))}
      <div className="upload">
        <i className="fa-solid fa-cloud-arrow-up"></i>
      </div>
    </div>
  );
};

export default ListImage;
