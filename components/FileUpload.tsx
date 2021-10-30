import { useState } from 'react';

const FileUpload = () => {
  let [promptText, setPromptText] = useState<string>("Drag a file...")
  let [videoFile, setVideoFile] = useState<string | null>(null);

  return (
    <div>
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

          let file = e.dataTransfer.files[0]
          if (file != null) {
            let src = URL.createObjectURL(file);
            setVideoFile(src)
          }
        }}
      >
        {promptText}
      </h1>
      {videoFile != null ? (
        <video controls={true} width={640} height={360}>
          <source src={videoFile} />
        </video>
      ): null}
    </div>
  )
}

export default FileUpload;