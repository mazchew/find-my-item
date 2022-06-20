import React, { useState, useRef } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { ArrowUpIcon } from '@heroicons/react/outline';


const ImageUpload = ({
    objectFit = "cover",
    accept = ".png, .jpg, .jpeg,",
    sizeLimit = 5000000,
}) => {

    const imageRef = useRef();
    const [image, setImage] = useState(null);
    const [updatingImage, setUpdatingImage] = useState(false);
    const [imageError, setImageError] = useState(null);

    const handleChangeImage = e => {
        const file = e.target.files[0];
        const reader = new FileReader();

        const fileName = file?.name?.split('.')?.[0] ?? 'New file';

        reader.addEventListener("load",
        async function () {
            try {
                setImage({ src: reader.result, alt: fileName });
                if (typeof onChangePicture === 'function') {
                    await onChangePicture(reader.result);
                }
            } catch (error) {
                toast.error('Unable to update image')
            } finally {
                setUpdatingImage(false);
            }
        },
        false
        );

        if (file) {
            if (file.size <= sizeLimit) {
                setUpdatingImage(true);
                setPictureError("");
                reader.readAsDataURL(file);
            } else {
                setImageError("File size is over the 5MB limit.");
            }
        }
    };

    const handleOnClickImage = () => {
        if (imageRef.current) {
            imageRef.current.click();
        }
    };


    return (
        <div className="flex flex-col space-y-2">
            <label className="text-gray-600">Image</label>
            <button 
                onClick={handleOnClickImage}
                disabled={updatingImage}
                className="relative aspect-w-16 aspect-h-9 overflow-hidden rounded-md transition group focus:outline-none hover:opacity-50">
                {image?.src ? (
                    <Image
                    src={image.src}
                    alt={image?.alt ?? ""}
                    layout="fill"
                    objectFit={objectFit}
                    />
                ) : null}

                <div className="flex items-center justify-center">
                    {!image?.src ? (
                        <div>
                            <ArrowUpIcon className="h-4 w-4 text-gray-500 transition"/>
                            <span className="text-gray-500 transition">Upload</span>
                        </div>
                    ) : null}
                    <input
                        ref={imageRef}
                        type="file"
                        accept={accept}
                        onChange={handleChangeImage}
                    />
                </div>   
            </button>
                        
            {imageError ? (<span>{imageError}</span>) : null}
        </div>
    );
};



export default ImageUpload;