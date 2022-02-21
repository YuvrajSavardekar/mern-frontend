import React, { useRef, useState, useEffect } from "react";

import Button from "./Button";

import "./ImageUpload.css";

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  // when we change image this useEffect() triggers
  useEffect(() => {
    if(!file) {
      return;
    }

    const fileReader = new FileReader();
    //this run after fileReader.readDataUrl() finished
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    }
    fileReader.readAsDataURL(file);
    console.log(previewUrl);
  }, [file]);

  const pickerHandler = e => {
    e.preventDefault();

    let pickedFile;
    let fileIsValid = isValid;
    if(e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files[0];
      setFile(pickedFile);
      setIsValid(true);      // because setIsValid not trigger immedietely
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }

    props.onInput(props.id, pickedFile, fileIsValid);   // to validate entire form
  };

  const pickImageHandler = e => {
    filePickerRef.current.click();
  }
  return (
    <div className="form-control">
      <input
      id={props.id}
      ref={filePickerRef}
      style={{ display: 'none'}}
      type='file'
      accept=".jpg, .png, .jpeg"
      onChange={pickerHandler}
      />
      <div className={`image-upload ${props.center && 'center'}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} style={{ width: '13rem', height: '13rem' }} alt="Preview" />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>PICK IMAGE</Button>
      </div>
    </div>
  ) 
};

export default ImageUpload;