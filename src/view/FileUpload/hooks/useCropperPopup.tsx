import React, { useEffect, useRef, useState } from "react";
import { ReactCropperElement, ReactCropperProps } from "react-cropper";
import useTransformBase64ToFile from "./useTransformBase64ToFile";

export default function useCropperPopup(fileName: string | undefined = "") {
  const [cropper, setCropper] = useState<Cropper>();
  const [cropImage, setCropImage] = useState("");
  const cropFile = useTransformBase64ToFile(cropImage, fileName);

  const [cropBoxData, setCropBoxData] = useState<
    Object & { width: number; height: number; top: number; left: number }
  >();

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropImage(cropper.getCroppedCanvas().toDataURL());
    }
  };

  const initCropper = (cropper: Cropper) => {
    setCropper(cropper);
  };
  useEffect(() => {}, [cropImage]);
  useEffect(() => {
    if (typeof cropper !== "undefined") {
      setCropBoxData(cropper.getCropBoxData());
    }
    return () => {
      setCropImage("");
    };
  }, [cropper]);

  return {
    cropper,
    cropImage,
    getCropData,
    cropBoxData,
    initCropper,
    cropFile,
  };
}
