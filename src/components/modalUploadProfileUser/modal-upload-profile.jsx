import { useState } from "react";
import AvatarEditor from "react-avatar-editor";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import { RiCloseCircleLine } from "react-icons/ri";

const ModalUploadUserImage = () => {
  const userId = localStorage.getItem("userId");
  const [show, setShow] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [zoom, setZoom] = useState(1.0);
  const [editor, setEditor] = useState(null);
  const handleShow = () => setShow(true);

  const handleClose = () => {
    handleCancel();
    setShow(false);
  };

  const handleCancel = () => {
    setPreviewImage(null);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };

    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewImage(null);
    }
  };

  const handleImageLoad = (editor) => {
    setEditor(editor);
  };

  const handleCropImage = () => {
    if (editor) {
      const croppedImage = editor.getImageScaledToCanvas().toDataURL();
      setPreviewImage(croppedImage);
    }
  };

  const dataURLtoBlob = (dataURL) => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
  };

  const handleSubmitUserImage = async () => {
    if (previewImage) {
      const croppedblob = dataURLtoBlob(previewImage);
      const imageFormData = new FormData();
      imageFormData.append("image_profile", croppedblob);
      try {
        const response = await axios.put(
          `${
            import.meta.env.VITE_REACT_APP_API_URL
          }/user/${userId}/updateUserImage`,
          imageFormData
        );
        console.log("Update User Image successful", response);
        Swal.fire({
          icon: "success",
          title: "Update User Image Successful",
        });
      } catch (error) {
        console.error("Update User Error:", error.response.data);
        if (error.message && error.response.data && error.response.data.error) {
          const errorMessage = error.response.data.error;
          Swal.fire({
            icon: "error",
            title: "Format Error",
            text: errorMessage,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Update User Image Error",
            text: "An error occurred during update user. Please try again later.",
          });
        }
      }
    } else {
      console.error("No image selected");
    }
  };

  return (
    <div id="Upload Image">
      <button className="btn btn-outline-info" onClick={handleShow}>
        Upload Image
      </button>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Title style={{ margin: "0 auto", padding: "0" }}>
          Upload Image
        </Modal.Title>
        <Modal.Body style={{ height: "auto" }}>
          <div style={{ margin: "20px" }}>
            <input type="file" onChange={handleFileChange} />
          </div>
          {previewImage && (
            <div>
              <div style={{ position: "relative" }}>
                <RiCloseCircleLine
                  size={24}
                  onClick={handleCancel}
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    zIndex: "999",
                  }}
                />
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <AvatarEditor
                    ref={(editor) => handleImageLoad(editor)}
                    image={previewImage}
                    width={200}
                    height={200}
                    border={60}
                    borderRadius={360}
                    scale={zoom}
                    color={[255, 255, 255, 0.6]}
                  />
                  <div>
                    <img
                      src={previewImage}
                      alt="Preview"
                      style={{
                        marginLeft: "30px",
                        marginTop: "30px",
                        width: "125px",
                        height: "125px",
                        border: "2px solid #ccc",
                        borderRadius: "360px",
                        scale: "1.2",
                      }}
                    />
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <label style={{ marginRight: "10px" }}>Zoom:</label>
                  <input
                    type="range"
                    min="0.05"
                    max="2.0"
                    step="0.05"
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                  />
                  <span style={{ marginLeft: "10px" }}>
                    {Math.round(zoom * 100)}%
                  </span>
                </div>
              </div>
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <button
                  onClick={handleCropImage}
                  className="btn"
                  style={{
                    backgroundColor: "#009393",
                    borderRadius: 25,
                    color: "white",
                  }}
                >
                  Save
                </button>
                <button
                  className="btn"
                  style={{
                    backgroundColor: "#009393",
                    borderRadius: 25,
                    color: "white",
                  }}
                  onClick={handleSubmitUserImage}
                >
                  Upload
                </button>
                <button onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalUploadUserImage;
