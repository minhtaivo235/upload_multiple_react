import { useCallback, useEffect, useState } from "react";

export default function useTransformBase64ToFile(
  base64Url: string,
  fileName: string
) {
  const [fileResult, setFileResult] = useState<File>();
  const dataURLtoFile = (dataurl: any, filename: string) => {
    if (!dataurl) return;
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };
  const handleChange = useCallback(() => {
    const file = dataURLtoFile(base64Url, fileName);
    let fileResult: File;
    if (file) {
      fileResult = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
    }
    setFileResult(file);
  }, [base64Url, fileName]);

  useEffect(() => {
    handleChange();
  }, [base64Url, fileName]);

  return fileResult;
}
