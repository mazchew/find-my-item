import React, { useState, useEffect } from 'react';
import Image from 'next/image';


const ImageUpload = ({
    label = "Image",
    initialImage = null,
    objectFit = "cover",
    accept = ".png, .jpg, .jpeg,",
    sizeLimit = 5000000,
}) => {

    const [image, setImage] = useState(null);


    return (
        <div>
            <label className="text-gray-600">Image</label>
            <button className="relative aspect-w-16 aspect-h-9 overflow-hidden rounded-md transition group focus:outline-none hover:opacity-50">
                {image?.src ? (
                    <Image
                    src={image.src}
                    alt={image?.alt ?? ""}
                    layout="fill"
                    objectFit="cover"
                    />
                ) : null}

                <div>
                    
                </div>   

            </button>
        </div>
    );
}


export default ImageUpload;