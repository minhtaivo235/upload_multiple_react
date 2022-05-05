import React from "react";
import Image from "../../components/Image/Image";
import { IFileWithPreview } from "./hooks/useFileUpload";

interface IProps {
  files: IFileWithPreview[];
  deleteCb: (i: number) => void;
}

const ShowImage: React.FC<IProps> = ({ files, deleteCb }) => {
  return (
    <div className="d-flex flex-wrap gap-2 position-relative">
      {files &&
        files.map((item, ind) => (
          <Image
            key={item.preview + " " + ind}
            src={item.preview}
            deleteCb={() => deleteCb(ind)}
          />
        ))}
    </div>
  );
};

export default ShowImage;
