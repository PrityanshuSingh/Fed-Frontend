import React, { useContext, useState, useRef, useEffect } from 'react';
import AvatarEditor from "react-avatar-editor";
import { FaUpload } from "react-icons/fa";
import style from "./styles/editImage.module.scss";
import AuthContext from '../../../context/AuthContext';
import { Button } from '../../../components';
import { X } from 'lucide-react';
import { Alert, MicroLoading } from "../../../microInteraction";
import { api } from "../../../services";
// import { RecoveryContext } from '../../../context/RecoveryContext';

const EditImage = (props) => {
  const{selectedFile, closeModal, setimage, updatePfp,setimgprv,setFile,fileName}=props;
  const [scale, setScale] = useState(1);
  const [alert, setAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const editorRef = useRef(null);


  useEffect(() => {
    if (alert) {
      const { type, message, position, duration } = alert;
      Alert({ type, message, position, duration });
    }
  }, [alert]);

  const handleScaleChange = (e) => {
    const scaleValue = parseFloat(e.target.value);
    setScale(scaleValue);
  };

  const handleSave = async () => {
    if (editorRef.current && selectedFile) {
      setIsLoading(true);
      const canvas = editorRef.current.getImageScaledToCanvas();
      canvas.toBlob(async (blob) => {
        const imageFile = new File([blob], "profile.jpg", { type: "image/jpeg" });
      

        if (updatePfp) {
          try {
            const formData = new FormData();
            formData.append('email', authCtx.user.email);
            formData.append('image', imageFile);

            const response = await api.post('/api/user/editProfileImage', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });

            if (response.status === 200 || response.status === 201) {
              console.log("Profile image updated successfully!", response.data);
              if(response.data.url){
           
                authCtx.user.img = response.data.url;
                     console.log("iamge in Authcontext:",authCtx.user.img);
              }
              setimage(URL.createObjectURL(blob));
              // setimage(response.data.url)
              setAlert({
                type: "success",
                message: "Profile image updated successfully.",
                position: "bottom-right",
                duration: 3000,
              });
              setTimeout(() => {
                closeModal();
                // window.location.reload();
              }, 2000);
            } else {
              setAlert({
                type: "error",
                message: "There was an error updating your profile image. Please try again.",
                position: "bottom-right",
                duration: 3000,
              });
            }
          } catch (error) {
            console.error("Error updating profile image:", error);
            setAlert({
              type: "error",
              message: "There was an error updating your profile image. Please try again.",
              position: "bottom-right",
              duration: 3000,
            });
          } finally {
            setIsLoading(false);
          }
        } else {
          // For AddMemberForm: Just update the preview image
          // setimage(URL.createObjectURL(blob));
          setimgprv(imageFile,URL.createObjectURL(blob));
          setFile(imageFile);
          closeModal();
        }
      }, "image/jpeg");
    }
  };

  const handleUpload = () => {
    if (editorRef.current && selectedFile) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      canvas.toBlob(async (blob) => {
        const imageFile = new File([blob], fileName, { type: "image/jpeg" });
        console.log("imagefile after crop", imageFile);
        authCtx.croppedImageFile =imageFile; 
        console.log("file stored in context:",authCtx.croppedImageFile);
        console.log("selected file :", selectedFile);
        setimgprv(URL.createObjectURL(blob));
        closeModal();
      }, "image/jpeg");
    }
  };

  return (
    <div style={{
      position: "fixed",
      width: "100%",
      height: "100%",
      zIndex: "10",
      left: "0",
      top: "0",
    }}>
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: "100%",
        height: "100%",
        background: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: "blur(4px)",
        zIndex: '5',
      }}>
        <div style={{
          zIndex: '10',
          borderRadius: '10px',
          padding: "2rem",
          position: "relative",
          display: 'flex',
          justifyContent: "center",
          alignItems: "center",
          marginTop: ".3rem",
        }}>
          <div className={style.container}>
            <button
              className={style.closeModal}
              onClick={closeModal}
            >
              <X />
            </button>
            <AvatarEditor
              ref={editorRef}
              image={selectedFile}
              width={150}
              height={150}
              border={50}
              style={{ borderRadius: "2rem" }}
              borderRadius={125}
              scale={scale}
            />
            <div className={style.wrapper}>
              <input
                className={style.rangeInput}
                type="range"
                value={scale}
                min="1"
                max="2"
                step="0.01"
                onChange={handleScaleChange}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>

            {updatePfp?  <Button type='button' onClick={handleSave} className={style.submit}>
                {isLoading ? (
                  <MicroLoading />
                ) : (
                  <>
                  <FaUpload /> Update Image
                
                  
                  </>
                )
              }
              </Button>: <Button type='button' onClick={handleUpload} className={style.submit}>
              {isLoading ? (
                <MicroLoading />
              ) : (
                <>
              <FaUpload /> Upload Image
                </>
              )
            }
            </Button>
}
            </div>
          </div>
        </div>
      </div>
      <Alert />
    </div>
  );
};

export default EditImage;