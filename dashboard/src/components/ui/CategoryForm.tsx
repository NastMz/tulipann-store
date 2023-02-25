import {useEffect} from "react";
import {motion} from "framer-motion";
import {Category, NewCategory, UpdateCategory} from "../../models/interfaces";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {BiCategoryAlt} from "react-icons/bi";
import {createCategory, updateCategory} from "../../api/data";
import {createBlurhash, createFileFromImageUrl, getBase64FromFile, getErrors} from "../../utils";
import {ImageUploader} from "../common";

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
 * Interface for CategoryForm component props.
 *
 * @interface CategoryFormProps
 * @property {Category} category - The categoryId information.
 * @property {boolean} isOpen - Whether the modal is open or closed.
 * @property {() => void} onClose - The function to close the modal.
 * @property {(value: boolean) => void} setLoading - The function to set the loading state.
 * @property {(value: boolean) => void} setShowSuccess - The function to set the show success state.
 * @property {(value: string) => void} setSuccessMessage - The function to set the success message.
 * @property {(value: boolean) => void} setShowError - The function to set the show error state.
 * @property {(value: string) => void} setErrorMessage - The function to set the error message.
 */
interface CategoryFormProps {
    category: Category | null;
    isOpen: boolean;
    onClose: () => void;
    setLoading: (value: boolean) => void;
    setShowSuccess: (value: boolean) => void;
    setSuccessMessage: (value: string) => void;
    setShowError: (value: boolean) => void;
    setErrorMessage: (value: string) => void;
    context: 'edit' | 'create';
}


/**
 * CategoryForm component.
 *
 * This component displays a form to update a categoryId's information.
 *
 * @param {CategoryFormProps} props - Props for the component.
 * @returns {ReactNode} The rendered component.
 */
export const CategoryForm = ({
                                 category,
                                 isOpen,
                                 setLoading,
                                 setShowSuccess,
                                 setSuccessMessage,
                                 setShowError,
                                 setErrorMessage,
                                 onClose,
                                 context
                             }: CategoryFormProps) => {

    // Handle click on cancel button
    const closeForm = () => {
        formik.resetForm();
        onClose();
    };

    const queryClient = useQueryClient();

    const addCategoryMutation = useMutation({
        mutationFn: createCategory,
        onSuccess: (response) => {
            queryClient.invalidateQueries(['apiCategories']).then(r => {
                if (response.status === 201) {
                    setSuccessMessage('Categoria creada exitosamente');
                    setShowSuccess(true);
                    closeForm();
                } else {
                    const errors = getErrors(response.data.Errors);
                    setErrorMessage(errors);
                    setShowError(true);
                }
                setLoading(false)
            });
        },
        onError: (error) => {
            setErrorMessage('Ocurrio un error inesperado');
            setShowError(true);
            setLoading(false);
        }
    });

    const updateCategoryMutation = useMutation({
        mutationFn: updateCategory,
        onSuccess: (response) => {
            queryClient.invalidateQueries(['apiCategories']).then(r => {
                if (response.status === 200) {
                    setSuccessMessage('Categoria actualizada exitosamente');
                    setShowSuccess(true);
                    closeForm();
                } else {
                    const errors = response.data.message;
                    setErrorMessage(errors);
                    setShowError(true);
                }
                setLoading(false)
            });
        },
        onError: (error: any) => {
            setLoading(false);
            setShowError(true);
            let errorMsg = error.response.data.message;

            if (errorMsg) {
                setErrorMessage(errorMsg);
            } else {
                setErrorMessage('Ha ocurrido un error inesperado.');
            }
        }
    });

    // Formik logics
    const formik = useFormik({
        initialValues: {
            name: '',
            image: [] as File[],
        },

        // Validate form
        validationSchema: Yup.object({
            name: Yup.string().required('Por favor ingrese un nombre'),
            image: Yup.array().required('Por favor suba una imagen').min(1, 'Por favor suba una imagen'),
        }),

        // Submit form
        onSubmit: async (values) => {
            setLoading(true);
            if (context === 'edit' && category) {
                const updatedCategory: UpdateCategory = {
                    name: values.name,
                    image: {
                        src: await getBase64FromFile(values.image[0]),
                        hash: await createBlurhash(values.image[0])
                    }
                };

                updateCategoryMutation.mutate({id: category.id, category: updatedCategory});
            } else {
                const newCategory: NewCategory = {
                    name: values.name,
                    image: {
                        src: await getBase64FromFile(values.image[0]),
                        hash: await createBlurhash(values.image[0])
                    }
                };
                addCategoryMutation.mutate(newCategory);
            }
        },
    });

    useEffect(() => {
        if (context === 'edit' && category) {
            const setFormValues = async () => {
                const imageFile = await createFileFromImageUrl(category.image.src);
                await formik.setValues({
                    name: category.name,
                    image: [imageFile],
                });
            };
            setFormValues();
        }
    }, [context, category]);

    return (
        <motion.div
            initial="closed"
            animate={isOpen ? 'open' : 'closed'}
            exit="closed"
            variants={backgroundVariants}
            className={`${
                isOpen ? 'block' : 'hidden'
            } fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center`}
        >
            <motion.div
                initial="closed"
                animate={isOpen ? 'open' : 'closed'}
                exit="closed"
                transition={{delay: 0.2}}
                variants={modalVariants}
                className="rounded-lg bg-white relative w-[90%] lg:w-[60%] mx-auto max-h-[90%] overflow-y-auto rounded-lg shadow-lg overflow-x-hidden"
            >
                <div className="relative">
                    <div className={`flex items-center px-4 py-4 text-red-500`}>
                        <BiCategoryAlt size={48}/>
                        <div className={"ml-4 font-semibold text-lg leading-tight"}>
                            {context === 'edit' ? 'Editar categoría' : 'Crear categoría'}
                        </div>
                    </div>

                    <form onSubmit={formik.handleSubmit} className="px-4 pb-4 flex flex-col gap-2">

                        <div className={'grid md:grid-cols-1 gap-x-4 lg:gap-x-8'}>
                            {/* Name input field*/}
                            <div className={"pb-4 w-full"}>
                                <label
                                    className={"block text-sm font-medium pb-4"}
                                    htmlFor="name">
                                    Nombre de la categoria
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Cajas de cartón"
                                    className={"border border-slate-300 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 py-2 px-3 rounded-md shadow-sm placeholder-slate-400 w-full"}
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <span className={"text-sm text-red-600 italic"}>
                                    {formik.touched.name && formik.errors.name ? formik.errors.name : ''}
                                </span>
                            </div>

                        </div>

                        <div className={'grid md:grid-cols-1 gap-x-4 lg:gap-x-8'}>
                            {/* Image input field*/}
                            <ImageUploader
                                images={formik.values.image}
                                setImages={files => formik.setFieldValue('image', files)}
                                maxImages={1}
                                label={'Imagen de la categoria'}
                                inputId={'category-image'}
                            />
                            <span className={"text-sm text-red-600 italic"}>
                                    {formik.errors.image ? formik.errors.image.toString() : ''}
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
                                {context === 'edit' ? 'Actualizar' : 'Crear'}
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </motion.div>
    );
};

