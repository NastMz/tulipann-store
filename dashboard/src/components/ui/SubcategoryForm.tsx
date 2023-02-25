import {useEffect} from "react";
import {motion} from "framer-motion";
import {NewSubcategory, Subcategory, UpdateSubcategory} from "../../models/interfaces";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {BiCategoryAlt} from "react-icons/bi";
import {createSubcategory, updateSubcategory} from "../../api/data";
import {getErrors} from "../../utils";
import {useSelector} from "react-redux";
import {selectCategories} from "../../redux/selector";

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
 * Interface for SubcategoryForm component props.
 *
 * @interface SubcategoryFormProps
 * @property {Subcategory} subcategory - The categoryId information.
 * @property {boolean} isOpen - Whether the modal is open or closed.
 * @property {() => void} onClose - The function to close the modal.
 * @property {(value: boolean) => void} setLoading - The function to set the loading state.
 * @property {(value: boolean) => void} setShowSuccess - The function to set the show success state.
 * @property {(value: string) => void} setSuccessMessage - The function to set the success message.
 * @property {(value: boolean) => void} setShowError - The function to set the show error state.
 * @property {(value: string) => void} setErrorMessage - The function to set the error message.
 */
interface SubcategoryFormProps {
    subcategory: Subcategory | null;
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
 * SubcategoryForm component.
 *
 * This component displays a form to update a categoryId's information.
 *
 * @param {SubcategoryFormProps} props - Props for the component.
 * @returns {ReactNode} The rendered component.
 */
export const SubcategoryForm = ({
                                    subcategory,
                                    isOpen,
                                    setLoading,
                                    setShowSuccess,
                                    setSuccessMessage,
                                    setShowError,
                                    setErrorMessage,
                                    onClose,
                                    context
                                }: SubcategoryFormProps) => {

    // Handle click on cancel button
    const closeForm = () => {
        formik.resetForm();
        onClose();
    };

    const queryClient = useQueryClient();

    const addSubcategoryMutation = useMutation({
        mutationFn: createSubcategory,
        onSuccess: (response) => {
            queryClient.invalidateQueries(['apiSubcategories']).then(r => {
                if (response.status === 201) {
                    setSuccessMessage('Subcategoria creada exitosamente');
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

    const updateSubcategoryMutation = useMutation({
        mutationFn: updateSubcategory,
        onSuccess: (response) => {
            queryClient.invalidateQueries(['apiSubcategories']).then(r => {
                if (response.status === 200) {
                    setSuccessMessage('Subcategoria actualizada exitosamente');
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
            categoryId: '',
            name: '',
        },

        // Validate form
        validationSchema: Yup.object({
            categoryId: Yup.string().required('Por favor seleccione una categoria'),
            name: Yup.string().required('Por favor ingrese un nombre'),
        }),

        // Submit form
        onSubmit: async (values) => {
            setLoading(true);
            if (context === 'edit' && subcategory) {
                const updatedSubcategory: UpdateSubcategory = {
                    name: values.name,
                    categoryId: values.categoryId,
                };

                updateSubcategoryMutation.mutate({id: subcategory.id, subcategory: updatedSubcategory});
            } else {
                const newSubcategory: NewSubcategory = {
                    name: values.name,
                    categoryId: values.categoryId,
                };
                addSubcategoryMutation.mutate(newSubcategory);
            }
        },
    });

    useEffect(() => {
        if (context === 'edit' && subcategory) {
            const setFormValues = () => {
                formik.setValues({
                    name: subcategory.name,
                    categoryId: subcategory.categoryId,
                });
            };
            setFormValues();
        }
    }, [context, subcategory]);

    // Categories from redux store
    const categories = useSelector(selectCategories);

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
                            {/* Category input field*/}

                            <label
                                className={"block text-sm"}
                                htmlFor="categoryId"
                            >
                                Categoria
                            </label>

                            {
                                categories.length > 0 ? (
                                        <select
                                            id="categoryId"
                                            name="categoryId"
                                            className={"border border-slate-300 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 py-2 px-3 rounded-md shadow-sm placeholder-slate-400 w-full"}
                                            value={formik.values.categoryId}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        >
                                            <option value=''>Selecciona una categoria</option>
                                            {
                                                categories.map((department) => {
                                                    return (
                                                        <option key={department.id}
                                                                value={department.id}>{department.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    )
                                    : (
                                        <div className={'flex gap-2 flex-wrap p-4'}>
                                            <span className={'text-sm text-gray-500'}>No hay categorias disponibles, por favor cree una nueva</span>
                                        </div>
                                    )
                            }
                            <span className={"text-sm text-red-600 italic"}>
                                    {formik.touched.categoryId && formik.errors.categoryId ? formik.errors.categoryId : ''}
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

