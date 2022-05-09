import React, { FC, useEffect, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { IFileWithPreview } from "../hooks/useFileUpload";
import ListImage from "./ListImage/ListImage";
import useReadImage from "../hooks/useReadImage";
import useTransformToKb from "../hooks/useTransformToKb";

import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./PopupConFirm.scss";

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
  const [image, setImage] = useState(files[files.length - 1]?.preview);
  const [cropper, setCropper] = useState<any>();
  const [cropData, setCropData] = useState("");
  const [cropBoxData, setCropBoxData] = useState<any>(null);
  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      console.log(cropper);

      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };

  console.log(cropData);
  const onChange = (e: any) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    reader.readAsDataURL(files[0]);
  };
  function dataURLtoFile(dataurl: any, filename: any) {
    if (!dataurl) return;
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }
  const file = dataURLtoFile(cropData, "hello.txt");
  console.log(file);

  useEffect(() => {
    if (typeof cropper !== "undefined") {
      setCropBoxData(cropper.cropBoxData);
    }
  }, [cropper]);

  return (
    <>
      <Modal show={show} size="xl" onHide={ActionClose} centered>
        <Modal.Body>
          <div className="popup-confirm">
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
                        <span>
                          {cropBoxData && cropBoxData.width.toFixed()}
                        </span>
                      </div>
                      <div style={{ fontWeight: "500" }}>X</div>
                      <div className="main-control_size-height">
                        <span>H</span>
                        <span>
                          {cropBoxData && cropBoxData.height.toFixed()}
                        </span>
                      </div>
                    </div>
                    <div
                      className="main-control_cut backgroung-gray"
                      onClick={getCropData}
                    >
                      <i className="fa-solid fa-crop-simple"></i>
                      <span>Cắt</span>
                    </div>
                  </div>
                  <div className="main_content">
                    {/* <img src={files[files.length - 1]?.preview} alt="" /> */}
                    <Cropper
                      // style={{ height: 400, width: "100%" }}
                      // zoomTo={0.5}
                      initialAspectRatio={1}
                      preview=".img-preview"
                      src={files[files.length - 1]?.preview}
                      // viewMode={0}
                      minCropBoxHeight={10}
                      minCropBoxWidth={10}
                      // background={false}
                      responsive={true}
                      // autoCropArea={1}
                      checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                      onInitialized={(instance) => {
                        setCropper(instance);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-3 p-1">
                <div className="right-side h-100">
                  <div className="right-side_top w-100">
                    <h5 className="mb-1">Preview</h5>
                    <div
                      className="img-preview mb-3"
                      style={{ width: "100%", float: "left", height: "300px" }}
                    ></div>
                    {cropData && (
                      <div className="preview_img">
                        <img
                          style={{ width: "100%" }}
                          src={cropData}
                          alt="cropped"
                        />
                      </div>
                    )}
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
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PopupConfirm;
