import "./SelectImage.scss"
import Upload from "../../../../assets/pictos/upload.tsx";
import React, {useEffect, useState} from "react";

type SelectImageProps = {
    setImage: (file: File) => void;
    imageDefault?: string;
}
export default function SelectImage({setImage, imageDefault}: SelectImageProps) {
    const [imagePreview, setImagePreview] = useState<string>(imageDefault || "");
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            setImage(e.target.files[0]);
            const url = URL.createObjectURL(e.target.files[0]);
            setImagePreview(url);
        }
    }

    useEffect(() => {
        setImagePreview(imageDefault || "");
    }, [imageDefault])

    return (
        <div className="select_image">
            <div className="select_image__preview">
                {imagePreview ? <img src={imagePreview} alt="image preview"/>
                    : <p>Sélectionner une image</p>}
            </div>
            <div className="select_image__input">
                <input
                    onChange={(e) => handleImageUpload(e)}
                    type='file'
                    id="imageUpload"
                    accept=".png, .jpg, .jpeg"
                />
                <label htmlFor="imageUpload" className={"button button--default button--medium svg--reverse"}>
                    <Upload/>
                </label>
            </div>
        </div>
    );
}