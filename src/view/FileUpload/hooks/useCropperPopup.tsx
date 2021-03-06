import { useEffect, useState } from "react";
import { FileUploadType } from "./useFileUpload";
import useTransformBase64ToFile from "./useTransformBase64ToFile";

export default function useCropperPopup(file: FileUploadType | undefined) {
  const [activeCrop, setActiveCrop] = useState(false);
  const [cropper, setCropper] = useState<Cropper>();
  const [cropImage, setCropImage] = useState("");
  const cropFile = useTransformBase64ToFile(cropImage, file?.name || "");

  const disabledCropper = () => {
    if (typeof cropper !== "undefined") {
      cropper.clear();
      cropper.disable();
    }
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropImage(cropper.getCroppedCanvas().toDataURL());
      disabledCropper();
      setActiveCrop(false);
    }
  };

  const handleActiveCrop = () => {
    if (typeof cropper !== "undefined") {
      setActiveCrop(true);
      cropper.reset();
      cropper.enable();
      cropper.setAspectRatio(1);
    }
  };

  const initCropper = (cropper: Cropper) => {
    setCropper(cropper);
  };
  useEffect(() => {
    if (typeof cropper !== "undefined") {
      if (!activeCrop) {
        disabledCropper();
      }
    }
  });

  return {
    cropper,
    cropImage,
    getCropData,
    initCropper,
    cropFile,
    activeCrop,
    handleActiveCrop,
  };
}
