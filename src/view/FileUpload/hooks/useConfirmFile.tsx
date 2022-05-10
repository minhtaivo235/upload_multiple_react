import { FileUploadType } from "./useFileUpload";

export interface IImageSize {
  height: number;
  width: number;
}

export default function useConfirmFile(
  file: FileUploadType | undefined,
  cropFile: File | undefined,
  confirmCb: (file: FileUploadType | undefined) => void,
  changeStateShow: (status: boolean) => void
) {
  const ActionConfirm = () => {
    if (cropFile) {
      confirmCb(cropFile);
    } else confirmCb(file);
    changeStateShow(false);
  };
  const ActionClose = () => {
    changeStateShow(false);
  };
  return {
    ActionConfirm,
    ActionClose,
  };
}
