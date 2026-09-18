'use client';
import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name }) {
    const [pickedImage, setPickedImage] = useState();
    const imageInput = useRef();

    const handlePickClick = () => {
        imageInput.current.click();
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (!file) {
            setPickedImage(null);
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPickedImage(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }

    return <div className={classes.picker} >
        <label htmlFor={name} >{label}</label>
        <div className={classes.controls} >
            <div className={classes.preview}>
                {!pickedImage && <p>No image picked yet.</p>}
                {pickedImage && <Image src={pickedImage} alt="The image selected by the user." fill ></Image>}
            </div>
            <input required ref={imageInput} onChange={handleImageChange} className={classes.input} type="file" id={name} accept="image/png, image/jpeg" name={name} />
        </div>
        <button onClick={handlePickClick} type="button" className={classes.button}>
            Pick an Image
        </button>
    </div>
}