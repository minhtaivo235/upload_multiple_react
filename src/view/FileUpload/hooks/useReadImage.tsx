import { useEffect, useRef, useState } from "react";
export interface IFileWithPreview extends File {
  preview?: string;
}

export interface IImageSize {
  height: number;
  width: number;
}

export default function useReadImage(file: IFileWithPreview) {
  console.log(file);

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
    console.log(imageSize);
  }, [file]);
  return imageSize;
}
