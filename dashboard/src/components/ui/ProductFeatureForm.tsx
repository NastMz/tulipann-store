import {motion} from "framer-motion";
import {NewFeature} from "../../models/interfaces";
import {useFormik} from "formik";
import * as Yup from "yup";
import {createBlurhash, createFileFromImageUrl, getBase64FromFile, ScrollToTop} from "../../utils";
import {ImageUploader} from "../common";
import {AiOutlineAppstoreAdd} from "react-icons/all";
import {useEffect} from "react";

/**
 * Variants for animating the modal.
 *
 * @type {import('framer-motion').Variants}
 */
const modalVariants = {
    open: {scale: 1},
    closed: {scale: 0},
};

/**
 * Variants for animating the background.
 *
 * @type {import('framer-motion').Variants}
 */
const backgroundVariants = {
    open: {opacity: 1},
    closed: {opacity: 0},
};


/**
 * Interface for ProductFeatureForm component props.
 *
 * @interface ProductFeatureFormProps
 * @property {boolean} isOpen - Whether the modal is open or closed.
 * @property {NewFeature} feature - The feature to edit.
 * @property {'create' | 'edit'} context - The context of the form.
 * @property {() => void} onClose - The function to close the modal.
 * @property {(values: NewFeature) => void} handleSubmit - The function to handle the form submission.
 * @property {(isLoading: boolean) => void} setIsLoading - The function to set the loading state.
 */
interface ProductFeatureFormProps {
    isOpen: boolean;
    feature: NewFeature | null;
    context: 'create' | 'edit';
    onClose: () => void;
    handleSubmit: (values: NewFeature) => void;
    setIsLoading: (isLoading: boolean) => void;
}


/**
 * ProductFeatureForm component.
 *
 * This component displays a form to update a categoryId's information.
 *
 * @param {ProductFeatureFormProps} props - Props for the component.
 * @returns {ReactNode} The rendered component.
 */
export const ProductFeatureForm = ({
                                       isOpen,
                                       feature,
                                       context,
                                       onClose,
                                       handleSubmit,
                                       setIsLoading,
                                   }: ProductFeatureFormProps) => {

    // Handle click on cancel button
    const closeForm = () => {
        formik.resetForm();
        onClose();
    };

    // Formik logics
    const formik = useFormik({
        initialValues: {
            featureName: '',
            featureImage: [] as File[],
            featureDescription: '',
            title: '',
        },

        // Validate form
        validationSchema: Yup.object({
            featureName: Yup.string().required('Por favor ingrese un nombre'),
            featureImage: Yup.array().required('Por favor suba una imagen').min(1, 'Por favor suba una imagen'),
            featureDescription: Yup.string().required('Por favor ingrese una descripción'),
            title: Yup.string().required('Por favor ingrese un título'),
        }),

        // Submit form
        onSubmit: async (values) => {
            setIsLoading(true);
            Promise.all([createBlurhash(values.featureImage[0]), getBase64FromFile(values.featureImage[0])])
                .then(([hash, src]) => {
                    const feature = {
                        featureName: values.featureName,
                        image: {hash, src},
                        description: values.featureDescription,
                        title: values.title,
                    };
                    handleSubmit(feature);
                    closeForm();
                })
                .catch((error) => console.log(error));
        },
    });

    useEffect(() => {
        if (context === 'edit' && feature) {
            const setFormValues = async () => {
                const imageFiles = await createFileFromImageUrl(feature.image.src);

                await formik.setFieldValue('featureName', feature.featureName);
                await formik.setFieldValue('featureDescription', feature.description);
                await formik.setFieldValue('title', feature.title);
                await formik.setFieldValue('featureImage', [imageFiles]);
            }
            setFormValues();
        }
    }, [feature, context]);

    return (
        <motion.div
            initial="closed"
            animate={isOpen ? 'open' : 'closed'}
            exit="closed"
            variants={backgroundVariants}
            className={`${
                isOpen ? 'block' : 'hidden'
            } fixed inset-0 z-30 bg-black bg-opacity-75 flex items-center justify-center`}
        >
            <motion.div
                initial="closed"
                animate={isOpen ? 'open' : 'closed'}
                exit="closed"
                transition={{delay: 0.2}}
                variants={modalVariants}
                className="rounded-lg bg-white relative w-[90%] lg:w-[60%] mx-auto max-h-[90%] overflow-y-auto rounded-lg shadow-lg overflow-x-hidden"
            >
                <ScrollToTop/>
                <div className="relative">
                    <div className={`flex items-center px-4 py-4 text-red-500`}>
                        <AiOutlineAppstoreAdd size={48}/>
                        <div className={"ml-4 font-semibold text-lg leading-tight"}>
                            {context === 'create' ? 'Crear' : 'Editar'} característica
                        </div>
                    </div>

                    <form onSubmit={formik.handleSubmit} className="px-4 pb-4 flex flex-col gap-2">

                        <div className={'grid md:grid-cols-2 gap-x-4 lg:gap-x-8'}>
                            {/* Name input field*/}
                            <div className={"pb-4 w-full"}>
                                <label
                                    className={"block text-sm font-medium pb-4"}
                                    htmlFor="featureName">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    id="featureName"
                                    name="featureName"
                                    placeholder="Medidas"
                                    className={"border border-slate-300 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 py-2 px-3 rounded-md shadow-sm placeholder-slate-400 w-full"}
                                    value={formik.values.featureName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <span className={"text-sm text-red-600 italic"}>
                                    {formik.touched.featureName && formik.errors.featureName ? formik.errors.featureName : ''}
                                </span>
                            </div>

                            {/* Title input field*/}
                            <div className={"pb-4 w-full"}>
                                <label
                                    className={"block text-sm font-medium pb-4"}
                                    htmlFor="title">
                                    Título
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="Medidas de la caja: "
                                    className={"border border-slate-300 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 py-2 px-3 rounded-md shadow-sm placeholder-slate-400 w-full"}
                                    value={formik.values.title}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <span className={"text-sm text-red-600 italic"}>
                                    {formik.touched.title && formik.errors.title ? formik.errors.title : ''}
                                </span>
                            </div>

                        </div>

                        <div className={'grid md:grid-cols-1 gap-x-4 lg:gap-x-8'}>
                            {/* Description input field*/}
                            <div className={"pb-4 w-full flex flex-col h-full"}>
                                <label
                                    className={"block text-sm font-medium pb-4"}
                                    htmlFor="featureDescription">
                                    Descripción
                                </label>
                                <textarea
                                    id="featureDescription"
                                    name="featureDescription"
                                    placeholder="Largo: 30cm&#10;Alto: 20cm&#10;Ancho: 15cm"
                                    className={"resize-none border border-slate-300 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 py-2 px-3 rounded-md shadow-sm placeholder-slate-400 w-full flex-grow h-56"}
                                    value={formik.values.featureDescription}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <span className={"text-sm text-red-600 italic"}>
                                    {formik.touched.featureDescription && formik.errors.featureDescription ? formik.errors.featureDescription : ''}
                                </span>
                            </div>
                        </div>

                        <div className={'grid md:grid-cols-1 gap-x-4 lg:gap-x-8'}>
                            {/* Image input field*/}
                            <ImageUploader
                                images={formik.values.featureImage}
                                setImages={files => formik.setFieldValue('featureImage', files)}
                                maxImages={1}
                                label={'Imagen'}
                                inputId={'featureImage'}
                            />
                            <span className={"text-sm text-red-600 italic"}>
                                    {formik.touched.featureImage && formik.errors.featureImage ? formik.errors.featureImage.toString() : ''}
                            </span>
                        </div>

                        <div className="px-4 py-4 flex gap-8 justify-center">
                            <button
                                type={'button'}
                                className="px-4 py-2 rounded-md text-sm font-semibold bg-slate-400 hover:bg-slate-500 focus:outline-none focus:bg-slate-500"
                                onClick={closeForm}
                            >
                                Cancelar
                            </button>
                            <button
                                type={'submit'}
                                className="ml-4 px-4 py-2 rounded-md text-white text-sm font-semibold bg-red-600 hover:bg-red-500 focus:outline-none focus:bg-red-500"
                            >
                                {context === 'create' ? 'Agregar' : 'Actualizar'}
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </motion.div>
    );
};

