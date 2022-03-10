import React from "react";

const MessageShowMediaUpload = ({ files, removeFile }) => {
  return (
    <div className="chat-bottom-contain-media">
      {files.map((file, index) => (
        <div className="chat-bottom-contain-media-show">
          {file.type.includes("image") ? (
            <img key={index} src={URL.createObjectURL(file)} alt="" />
          ) : (
            <video
              key={index}
              src={URL.createObjectURL(file)}
              className="media"
              controls
            ></video>
          )}
          <i
            className="fas fa-times"
            onClick={removeFile.bind(this, file.lastModified)}
          ></i>
        </div>
      ))}
    </div>
  );
};

export default React.memo(MessageShowMediaUpload);
