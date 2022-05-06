import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { IFileWithPreview } from "../hooks/useFileUpload";
import "./PopupConFirm.scss";
import ListImage from "./ListImage/ListImage";
import useReadImage from "../hooks/useReadImage";
import useTransformToKb from "../hooks/useTransformToKb";

interface PopupConfirmProps {
  files: IFileWithPreview[];
  show: boolean;
  setShow: (status: boolean) => void;
  cancel: (index: number) => void;
}

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
  const { width, height } = useReadImage(files[files.length - 1]);
  const sizeImage = useTransformToKb(files[files.length - 1]?.size);

  const ActionConfirmed = () => {
    setShow(false);
  };

  return (
    <>
      <Modal show={show} size="xl" onHide={ActionClose} centered>
        <Modal.Body>
          <div className="row justify-content-between">
            <div className="col-3 p-1 backgroung-gray">
              <div className="row align-content-between left-side">
                <div className="col-12 left-side_img">
                  <ListImage files={files} />
                </div>
                <div className="col-12 left-side_content mt-3">
                  <h5>Thông tin ảnh</h5>
                  <p>
                    Kích thước gốc: {width} x {height}
                  </p>
                  <p>Tên File: {files[files.length - 1]?.name}</p>
                  <p>Dung lượng: {sizeImage}</p>
                </div>
              </div>
            </div>
            <div className="col-6 p-1">
              <div className="d-flex flex-column justify-content-between">
                <div className="main-control mb-3">
                  <select>
                    <option value="">Tự do</option>
                  </select>
                  <div className="main-control_size">
                    <div className="main-control_size-width ">
                      <span>W</span>
                      <span>{width}</span>
                    </div>
                    <div style={{ fontWeight: "500" }}>X</div>
                    <div className="main-control_size-height">
                      <span>H</span>
                      <span>{height}</span>
                    </div>
                  </div>
                  <div className="main-control_cut backgroung-gray">
                    <i className="fa-solid fa-crop-simple"></i>
                    <span>Cắt</span>
                  </div>
                </div>
                <div className="main_content">
                  <img src={files[files.length - 1]?.preview} alt="" />
                </div>
              </div>
            </div>
            <div className="col-3 p-1">
              <div className="right-side h-100">
                <div className="right-side_top">
                  <h5 className="mb-1">Preview</h5>
                  <div className="preview_img">
                    <img />
                  </div>
                </div>
                <div className="right-side_bottom">
                  <Button
                    variant="primary"
                    onClick={ActionConfirmed}
                    className="w-100 mb-2 d-flex justify-content-between align-items-center"
                  >
                    <span>Tải lên</span>
                    <i className="fa-solid fa-arrow-up-from-bracket"></i>
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={ActionClose}
                    className="w-100 mb-2 d-flex justify-content-between align-items-center"
                  >
                    <span>Hủy</span> <i className="fa-solid fa-xmark"></i>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PopupConfirm;
