import { useState, useRef } from "react";
import UploadService from "../services/FileUploadService";
interface ProgressInfo {
  fileName: string;
  percentage: number;
}
const FilesUpload: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [progressInfos, setProgressInfos] = useState<Array<ProgressInfo>>([]);
  const [message, setMessage] = useState<Array<string>>([]);
  const progressInfosRef = useRef<any>(null);
  const selectFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(event.target.files);
    setProgressInfos([]);
    setMessage([]);
  };
  const upload = (idx: number, file: File) => {
    let _progressInfos = [...progressInfosRef.current];
    return UploadService.upload(file, (event) => {
      _progressInfos[idx].percentage = Math.round(
        (100 * event.loaded) / event.total
      );
      setProgressInfos(_progressInfos);
    })
      .then(() => {
        document.location="";
        setMessage((prevMessage) => [
          ...prevMessage,
          file.name + ": Successful!"
        ]);
      })
      .catch((err: any) => {
        _progressInfos[idx].percentage = 0;
        setProgressInfos(_progressInfos);
        let msg = file.name + ": Failed!";
        if (err.response && err.response.data && err.response.data.message) {
          msg += " " + err.response.data.message;
        }
        setMessage((prevMessage) => [
          ...prevMessage,
          msg
        ]);
      });
   
  };
  const uploadFiles = () => {
    if (selectedFiles != null) {
      const files = Array.from(selectedFiles);

      let _progressInfos = files.map((file) => ({
        percentage: 0,
        fileName: file.name
      }));

      progressInfosRef.current = _progressInfos;

      files.map((file, i) => upload(i, file));

      setMessage([]);
    }
  };
  return (
    <div>
      {progressInfos &&
        progressInfos.length > 0 &&
        progressInfos.map((progressInfo: ProgressInfo, index: number) => (
          <div className="mb-2" key={index}>
            <span>{progressInfo.fileName}</span>
            <div className="progress">
              <div
                className="progress-bar progress-bar-info"
                role="progressbar"
                aria-valuenow={progressInfo.percentage}
                aria-valuemin={0}
                aria-valuemax={100}
                style={{ width: progressInfo.percentage + "%" }}
              >
                {progressInfo.percentage}%
              </div>
            </div>
          </div>
        ))}
      <div className="row my-3">
        <div className="col-8">
          <label className="btn btn-default p-0">
            <input type="file" multiple onChange={selectFiles} />
          </label>
        </div>
        <div className="col-4">
          <button
            className="btn btn-success btn-sm"
            disabled={!selectedFiles}
            onClick={uploadFiles}
          >
            Import Excel
          </button>
        </div>
      </div>
      {message.length > 0 && (
        <div className="alert alert-secondary" role="alert">
          <ul>
            {message.map((item, i) => {
              return <li key={i}>{item}</li>;
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
export default FilesUpload;
