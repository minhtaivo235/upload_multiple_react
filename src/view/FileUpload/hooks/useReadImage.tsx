import { useEffect, useRef, useState } from "react";
import { FileUploadType } from "./useFileUpload";

export interface IImageSize {
  height: number;
  width: number;
}

export default function useReadImage(file: FileUploadType | undefined) {
  const [imageSize, setImageSize] = useState<IImageSize>({
    height: 0,
    width: 0,
  });
  const getHeightAndWidthFromDataUrl = () => {
    const img = new Image();
    img.src = file?.preview ?? "";

    img.onload = () => {
      setImageSize({
        height: img.height,
        width: img.width,
      });
    };
  };
  useEffect(() => {
    getHeightAndWidthFromDataUrl();
  }, [file]);
  return imageSize;
}
