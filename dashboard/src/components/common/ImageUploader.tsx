import {ChangeEvent, useState} from 'react';
import {Modal} from "./Modal";
import {MdOutlineUploadFile} from "react-icons/all";
import {AiOutlineCloseCircle} from "react-icons/ai";

/**
 * Props for the ImageUploader component.
 * @param {File[]} images - The images to be uploaded.
 * @param {(image: File[]) => void} setImages - The function to set the images.
 * @param {number} maxImages - The maximum number of images to be uploaded.
 * @param {string} label - The label of the component.
 */
interface ImageUploaderProps {
    images: File[];
    setImages: (image: File[]) => void;
    maxImages: number;
    label: string;
    inputId: string;
}

export const ImageUploader = ({maxImages, images, setImages, label, inputId}: ImageUploaderProps) => {

    // Handle the image upload.
    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        // Get the files.
        const files = event.target.files;

        // If there are no files, return.
        if (!files) return;

        // Check if the files are valid.

        // New images array.
        const newImages: File[] = [];

        // Error flag.
        let hasError = false;

        // Iterate over the files.
        for (const file of files) {
            // Check if the file has a valid size.
            if (file.size > import.meta.env.VITE_MAX_IMAGE_SIZE) {
                setErrorMessage('El tamaño de la imagen no puede ser mayor a 2MB.');
                hasError = true;
            }

            // Check if the number of images is not greater than the maximum.
            if (newImages.length + images.length >= maxImages) {
                setErrorMessage(`No se puede subir más de ${maxImages} ${maxImages > 1 ? 'imágenes' : 'imágen'}.`);
                hasError = true;
                break;
            }
            // Add the file to the new images array.
            newImages.push(file);
        }

        // If there is no error, add the new images to the images array.
        if (!hasError) {
            setImages([...images, ...newImages]);
        } else {
            // Show the error modal.
            setShowError(true);
        }
    }

    // Error modal state.
    const [errorMessage, setErrorMessage] = useState<string>('');

    // Show error modal state.
    const [showError, setShowError] = useState(false);

    return (
        <div>
            <div className={'flex items-center justify-between'}>
                <label
                    className={"block text-sm font-medium pb-1 w-full"}>
                    {label}
                </label>
                <div className={'w-full flex justify-end'}>
                    <input id={inputId} name={inputId} type="file" accept="image/*" multiple
                           onChange={handleImageUpload} className={'hidden'}/>
                    <label htmlFor={inputId} className={'cursor-pointer w-fit text-sm'}>
                        <div
                            className={'flex gap-2 items-center bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-full m-1'}>
                            <MdOutlineUploadFile className={'text-xl'}/>
                            <span>Subir</span>
                        </div>
                    </label>
                </div>
            </div>
            <div
                className={"border border-slate-300 py-2 px-3 rounded-md w-full overflow-y-auto max-h-56"}
            >
                {
                    images.length > 0
                        ? (
                            <div
                                className={'grid gap-12 place-items-center grid-cols-[repeat(auto-fit,minmax(250px,250px))] '}
                            >
                                {
                                    images.map((image, index) => (
                                        <div key={index}
                                             className={'w-full h-full rounded-md shadow-sm object-cover overflow-hidden relative border border-gray-200'}>
                                    <span
                                        className={'text-white drop-shadow shadow-black absolute top-0 right-0 p-1 text-4xl cursor-pointer hover:text-red-500'}
                                        onClick={() => setImages(images.filter((_, i) => i !== index))}
                                    >
                                        <AiOutlineCloseCircle/>
                                    </span>
                                            <img src={URL.createObjectURL(image)} alt={`Image ${index + 1}`}
                                                 className={'w-full h-full'}/>
                                            <div
                                                className={'bg-black bg-opacity-60 w-full h-1/3 absolute bottom-0 text-white text-sm font-medium flex flex-col items-center justify-center p-2'}>
                                                <span>{image.name}</span>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                        : (
                            <div className={'text-gray-400 h-36 w-full flex items-center justify-center'}>
                                <span>No hay imágenes</span>
                            </div>
                        )
                }
            </div>
            <Modal
                title={'Atención'}
                message={errorMessage}
                buttonText={'Aceptar'}
                isOpen={showError}
                onClose={() => setShowError(false)}
                onButtonClick={() => setShowError(false)}
                type={'warning'}
            />
        </div>
    );
}
