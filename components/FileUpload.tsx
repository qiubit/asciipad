import { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useEffect } from 'react';

const FileUpload = () => {
  let [promptText, setPromptText] = useState<string>("Drag a file...")
  let [videoFile, setVideoFile] = useState<string | null>("/ruler.mov");
  let [textOffsetX, setTextOffsetX] = useState<number>(0);
  let [progress, setProgress] = useState<number>(0);
  let [mockUpload, setMockUpload] = useState<boolean>(false);

  useEffect(() => {
    if (!mockUpload) {
      return
    }
    if (progress != 100) {
      setTimeout(() => setProgress(progress+10), 500);
    } else {
      setMockUpload(false);
    }
  }, [mockUpload, progress])

  return (
    <div>
      <ProgressBar animated now={progress} label={`${progress}%`} />
      <input
        type="range"
        min="0"
        max="200"
        value={textOffsetX}
        onChange={evt => setTextOffsetX(parseInt(evt.target.value, 10) ?? 0)}
      />
      <p>xOffset: {textOffsetX}</p>
      <h1
        onDragEnter={(e) => {
          e.preventDefault()
          e.dataTransfer.dropEffect = "none"
          setPromptText("Drop a file")
        }}
        onDragOver={(e) => {
          e.preventDefault()
        }}
        onDragLeave={() => setPromptText("Drag a file...")}
        onDragEnd={(e) => {
          e.preventDefault()
        }}
        onDrop={(e) => {
          e.preventDefault()

          setPromptText("Dropped")
          if (!mockUpload) {
            setProgress(0);
            setMockUpload(true);
          }

          let file = e.dataTransfer.files[0]
          if (file != null) {
            let src = URL.createObjectURL(file);
            setVideoFile(src)
          }
        }}
      >
        {promptText}
      </h1>
      <div style={{ position: 'relative' }}>
        {videoFile != null ? (
          <video controls={false} width={1066} height={503}>
            <source src={videoFile} />
          </video>
        ): null}
        <p
          style={{
            position: 'absolute',
            top: 0,
            left: textOffsetX,
            right: 0,
            bottom: 0,
            padding: 0,
            margin: 0,
            fontFamily: "Anton, sans-serif",
            fontSize: 64,
            color: "#09ffd3"
          }}
        >
          TEST
        </p>
      </div>
    </div>
  )
}

export default FileUpload;