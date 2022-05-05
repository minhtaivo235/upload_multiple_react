import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { IFileWithPreview } from "../hooks/useFileUpload";
import "./PopupConFirm.scss";
import ListImage from "./ListImage/ListImage";

interface PopupConfirmProps {
  files: IFileWithPreview[];
  show: boolean;
  setShow: (status: boolean) => void;
  cancel: (index: number) => void;
}

const RightSide = () => {
  return <div className="col-3">b</div>;
};
const MainContent = () => {
  return <div className="col-6">c</div>;
};
const PopupConfirm: React.FC<PopupConfirmProps> = ({
  files,
  show,
  setShow,
  cancel,
}) => {
  const ActionClose = () => {
    cancel(files.length - 1);
    setShow(false);
  };

  const ActionConfirmed = () => {
    setShow(false);
  };

  return (
    <>
      <Modal show={show} size="xl" onHide={ActionConfirmed} centered>
        <Modal.Body>
          <div className="row justify-content-between gx-2">
            <div className="col-3 p-1 backgroung-gray">
              <div className="row g-5">
                <div className="col-12 left-side_img">
                  <ListImage files={files} />
                </div>
                <div className="col-12 left-side_content">
                  <h5>Thông tin ảnh</h5>
                  <p>Kích thước gốc: </p>
                  <p>Tên File: </p>
                  <p>Dung lượng: </p>
                  <p>Dung lượng: </p>
                  <p>Dung lượng: </p>
                  <p>Dung lượng: </p>
                  <p>Dung lượng: </p>
                </div>
              </div>
            </div>
            <div className="col-6 p-1 backgroung-gray">
              <div className="d-flex flex-column justify-content-between">
                <div className="main_control">
                  <select>
                    <option value="">Tự do</option>
                  </select>
                </div>
                <div className="main_content">
                  <img src={files[0]?.preview} alt="" />
                </div>
              </div>
            </div>
            <div className="col-2 p-1 backgroung-gray">
              <div className="d-flex flex-column justify-content-between">
                <div className="left-side_img">
                  <ListImage files={files} />
                </div>
                <div className="left-side_content"></div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ActionClose}>
            Close
          </Button>
          <Button variant="primary" onClick={ActionConfirmed}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PopupConfirm;
