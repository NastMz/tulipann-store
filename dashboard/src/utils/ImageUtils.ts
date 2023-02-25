import {encode} from 'blurhash';

/**
 * Creates a Blurhash string from an image.
 *
 * @param {HTMLImageElement} image - Image to create the Blurhash string from.
 * @returns {string} The Blurhash string.
 */
export async function createBlurhash(file: File): Promise<string> {
    const componentX = 4;
    const componentY = 3;

    // Create an Image object from the file
    const image = await createImageFromFile(file);

    // Create a canvas with the same dimensions as the image
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;

    // Draw the image on the canvas
    const context = canvas.getContext('2d');
    context!.drawImage(image, 0, 0, canvas.width, canvas.height);

    // Get the pixel data of the image
    const imageData = context!.getImageData(0, 0, canvas.width, canvas.height).data;

    // Create the Blurhash string
    const blurhash = encode(imageData, canvas.width, canvas.height, componentX, componentY);

    return blurhash;
}

/**
 * Creates an Image object from a file.
 *
 * @param {File} file - File to create the Image object from.
 * @returns {Promise<HTMLImageElement>} The Image object.
 */
function createImageFromFile(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => {
            resolve(image);
        };
        image.onerror = () => {
            reject(new Error('Failed to load image'));
        };
        image.src = URL.createObjectURL(file);
    });
}

/**
 * Creates a base64 string from a file.
 *
 * @param {File} file - File to create the base64 string from.
 * @returns {Promise<string>} The base64 string.
 */
export function getBase64FromFile(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            const base64 = reader.result as string;
            const base64WithoutHeader = base64.split(',')[1]; // Obtain the base64 string without the header
            resolve(base64WithoutHeader);
        };

        reader.onerror = () => {
            reject(reader.error);
        };

        reader.readAsDataURL(file);
    });
}


/**
 * Creates a File object from an image URL.
 *
 * @param {string} imageUrl - URL of the image.
 * @returns {Promise<File>} The File object.
 */
export async function createFileFromImageUrl(imageUrl: string): Promise<File> {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const imageName = imageUrl.split('/').pop() ?? 'image';
    return new File([blob], imageName, { type: blob.type });
}

