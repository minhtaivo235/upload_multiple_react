import "cropperjs/dist/cropper.css";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import Cropper from "react-cropper";
import useConfirmFile from "../hooks/useConfirmFile";
import useCropperPopup from "../hooks/useCropperPopup";
import { FileUploadType } from "../hooks/useFileUpload";
import useReadImage from "../hooks/useReadImage";
import useTransformToKb from "../hooks/useTransformToKb";

interface PopupConfirmProps {
  file: FileUploadType | undefined;
  show: boolean;
  setShow: (status: boolean) => void;
  uploadFile: (file: FileUploadType | undefined) => void;
}

const PopupConfirm: React.FC<PopupConfirmProps> = ({
  file,
  show,
  setShow,
  uploadFile,
}) => {
  const { width, height } = useReadImage(file);
  const sizeImage = useTransformToKb(file?.size);

  const { cropImage, getCropData, cropFile, initCropper } = useCropperPopup(
    file?.name
  );
  const { ActionConfirm, ActionClose } = useConfirmFile(
    file,
    cropFile,
    uploadFile,
    setShow
  );

  return (
    <>
      <Modal show={show} size="xl" onHide={ActionClose} centered>
        <Modal.Body>
          <div className="popup-confirm">
            <div className="row justify-content-between">
              <div className="col-3 p-1 backgroung-gray">
                <div className="row align-content-between left-side">
                  <div className="col-12 left-side_img">
                    <img src={file?.preview} alt="" />
                    <div className="upload">
                      <i className="fa-solid fa-cloud-arrow-up"></i>
                    </div>
                  </div>
                  <div className="col-12 left-side_content mt-3">
                    <h5>Thông tin ảnh</h5>
                    <p>
                      Kích thước gốc: {width} x {height}
                    </p>
                    <p>Tên File: {file?.name}</p>
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
                    <div
                      className="main-control_cut backgroung-gray"
                      onClick={getCropData}
                    >
                      <i className="fa-solid fa-crop-simple"></i>
                      <span>Cắt</span>
                    </div>
                  </div>
                  <div className="main_content">
                    <Cropper
                      initialAspectRatio={1}
                      preview=".img-preview"
                      src={file?.preview}
                      viewMode={0}
                      minCropBoxHeight={10}
                      minCropBoxWidth={10}
                      background={false}
                      responsive={true}
                      autoCropArea={1}
                      checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                      onInitialized={(instance) => {
                        initCropper(instance);
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
                    {cropImage && (
                      <div className="preview_img">
                        <img
                          style={{ width: "100%" }}
                          src={cropImage}
                          alt="cropped"
                        />
                      </div>
                    )}
                  </div>
                  <div className="right-side_bottom">
                    <Button
                      variant="primary"
                      onClick={ActionConfirm}
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
