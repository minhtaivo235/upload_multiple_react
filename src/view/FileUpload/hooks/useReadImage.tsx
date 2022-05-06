import { useState } from "react";
export interface IFileWithPreview extends File {
  preview?: string;
}

export interface IImageSize {
  height: number;
  width: number;
}

export default function useReadImage(file: IFileWithPreview[]) {
  const [imageSize, setImageSize] = useState<IImageSize>({
    height: 0,
    width: 0,
  });
  const getHeightAndWidthFromDataUrl = (dataURL: string) => {
    const img = new Image();
    img.onload = () => {
      setImageSize({
        height: img.height,
        width: img.width,
      });
    };
    img.src = dataURL;
  };
  getHeightAndWidthFromDataUrl(file[file.length - 1]?.preview ?? "");
  return { width: imageSize.width, height: imageSize.height };
  // console.log(file);
  // console.log(img.width);
  // console.log(img.height);
}
