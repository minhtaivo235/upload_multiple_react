import React from "react";
import "./Image.scss";
interface IProps {
  src: string | undefined;
  deleteCb: () => void;
}

const Image: React.FC<IProps> = ({ src, deleteCb }) => {
  return (
    <div className="component-image">
      <img src={src} alt="" />
      <div className="group_icon">
        <span className="p-2">
          <i className="fa-solid fa-pen-to-square"></i>
        </span>
        <span className="p-2" onClick={deleteCb}>
          <i className="fa-solid fa-trash"></i>
        </span>
      </div>
    </div>
  );
};

export default Image;
