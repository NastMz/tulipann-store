import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {
    Category,
    Feature,
    Image,
    NewFeature,
    NewProduct,
    Product,
    Subcategory,
    UpdateProduct
} from "../../models/interfaces";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createProduct, updateProduct} from "../../api/data";
import {createBlurhash, createFileFromImageUrl, getBase64FromFile, getErrors, ScrollToTop} from "../../utils";
import {ImageUploader} from "../common";
import {AiOutlineAppstoreAdd, BiShoppingBag, FiEdit, MdAddCircleOutline} from "react-icons/all";
import {AiOutlineCloseCircle} from "react-icons/ai";
import {useSelector} from "react-redux";
import {selectCategories, selectSubcategories} from "../../redux/selector";
import {ProductFeatureForm} from "./ProductFeatureForm";
import {FeatureCard} from "../utils";
import {CategoryForm} from "./CategoryForm";
import {SubcategoryForm} from "./SubcategoryForm";

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
 * Interface for ProductForm component props.
 *
 * @interface ProductFormProps
 * @property {Product} product - The product information.
 * @property {boolean} isOpen - Whether the modal is open or closed.
 * @property {() => void} onClose - The function to close the modal.
 * @property {(value: boolean) => void} setLoading - The function to set the loading state.
 * @property {(value: boolean) => void} setShowSuccess - The function to set the show success state.
 * @property {(value: string) => void} setSuccessMessage - The function to set the success message.
 * @property {(value: boolean) => void} setShowError - The function to set the show error state.
 * @property {(value: string) => void} setErrorMessage - The function to set the error message.
 */
interface ProductFormProps {
    product: Product | null;
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
 * ProductForm component.
 *
 * This component displays a form to update a product's information.
 *
 * @param {ProductFormProps} props - Props for the component.
 * @returns {ReactNode} The rendered component.
 */
export const ProductForm = ({
                                product,
                                isOpen,
                                setLoading,
                                setShowSuccess,
                                setSuccessMessage,
                                setShowError,
                                setErrorMessage,
                                onClose,
                                context
                            }: ProductFormProps) => {

    // Handle click on cancel button
    const closeForm = () => {
        formik.resetForm();
        setSelectedSubcategories([]);
        onClose();
    };

    const queryClient = useQueryClient();

    const addProductMutation = useMutation({
        mutationFn: createProduct,
        onSuccess: (response) => {
            queryClient.invalidateQueries(['apiProducts']).then(r => {
                if (response.status === 201) {
                    setSuccessMessage('Producto creado exitosamente');
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
        onError: (error) => {
            setErrorMessage('Ocurrio un error inesperado');
            setShowError(true);
            setLoading(false);
        }
    });

    const updateProductMutation = useMutation({
        mutationFn: updateProduct,
        onSuccess: (response) => {
            queryClient.invalidateQueries(['apiProducts']).then(r => {
                if (response.status === 200) {
                    setSuccessMessage('Producto actualizado exitosamente');
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
        onError: (error: any) => {
            setLoading(false);
            setShowError(true);
            let errorMsg = getErrors(error.response.data.Errors);

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
            images: [] as File[],
            description: '',
            price: '',
            stock: '',
            category: '',
            subcategories: [] as string[],
            specification: {
                summary: '',
                features: [] as NewFeature[]
            }
        },

        // Validate form
        validationSchema: Yup.object({
            name: Yup.string().required('Por favor ingrese un nombre'),
            images: Yup.array().required('Por favor suba una imagen').min(1, 'Por favor suba una imagen'),
            description: Yup.string().required('Por favor ingrese una descripción'),
            price: Yup.number().required('Por favor ingrese un precio').min(0, 'El precio debe ser mayor a 0'),
            stock: Yup.number().required('Por favor ingrese un stock').min(0, 'El stock debe ser mayor a 0'),
            category: Yup.string().required('Por favor seleccione una categoria'),
            subcategories: Yup.array().required('Por favor seleccione una subcategoria').min(1, 'Por favor seleccione una subcategoria'),
            specification: Yup.object().shape({
                summary: Yup.string().required('Por favor ingrese un resumen'),
                features: Yup.array().required('Por favor ingrese una característica').min(1, 'Por favor ingrese una característica')
            })
        }),

        // Submit form
        onSubmit: async (values) => {
            setLoading(true);
            const images: Image[] = await Promise.all(values.images.map(async (image) => {
                return {
                    src: await getBase64FromFile(image),
                    hash: await createBlurhash(image)
                }
            }));

            if (context === 'edit' && product) {
                const updatedProduct: UpdateProduct = {
                    name: values.name,
                    images: images,
                    description: values.description,
                    price: Number(values.price),
                    stock: Number(values.stock),
                    categoryId: values.category,
                    subcategories: values.subcategories.map((subcategory) => {
                        return {subcategoryId: subcategory}
                    }),
                    specification: values.specification
                };

                updateProductMutation.mutate({id: product.id, product: updatedProduct});
            } else {
                const newProduct: NewProduct = {
                    name: values.name,
                    images: images,
                    description: values.description,
                    price: Number(values.price),
                    stock: Number(values.stock),
                    categoryId: values.category,
                    subcategories: values.subcategories.map((subcategory) => {
                        return {subcategoryId: subcategory}
                    }),
                    specification: values.specification
                };
                addProductMutation.mutate(newProduct);
            }
        },
    });

    useEffect(() => {
        if (context === 'edit' && product) {
            const setFormValues = async () => {
                const imageFiles = await Promise.all(product.images.map(async (image: any) => {
                    return await createFileFromImageUrl(image.image.src);
                }));
                setSpecSummary(product.specification.summary);
                const productCategories = product.subcategories.map((subcategory: any) => {
                    return subcategories.find((sub) => sub.id === subcategory.subcategoryId);
                });

                setSelectedSubcategories(productCategories?.filter((category) => category !== undefined) as Subcategory[]);

                await formik.setValues({
                    name: product.name,
                    images: imageFiles,
                    description: product.description,
                    price: product.price.toString(),
                    stock: product.stock.toString(),
                    category: product.categoryId,
                    subcategories: product.subcategories.map((subcategory: any) => {
                        return subcategory.subcategoryId;
                    }),
                    specification: {
                        summary: product.specification.summary,
                        features: product.specification.features.map((feature: Feature) => {
                            return {
                                featureName: feature.featureName,
                                title: feature.title,
                                description: feature.description,
                                image: feature.image
                            }
                        })
                    }
                });
            };
            setFormValues();
        }
    }, [context, product]);

    // Subcategories from redux store
    const subcategories = useSelector(selectSubcategories);

    // Categories from redux store
    const categories = useSelector(selectCategories);

    // Subcategories by categoryId id (selected by the user)
    const [subcategoriesByCategory, setSubcategoriesByCategory] = useState<Subcategory[]>([]);

    // Subcategories selected by the user
    const [selectedSubcategories, setSelectedSubcategories] = useState<Subcategory[]>([]);

    // Selected subcategory id
    const [selectedOption, setSelectedOption] = useState('');

    // Add selected subcategory to selectedSubcategories array
    const handleSubcategorySelect = (subcategory: Subcategory) => {
        // Check if subcategory is already in selectedSubcategories array
        if (!selectedSubcategories.find((t) => t.id === subcategory.id)) {
            setSelectedSubcategories([...selectedSubcategories, subcategory]);
        }
    }

    // Remove selected subcategory from selectedSubcategories array
    const handleRemoveSubcategory = (subcategory: Subcategory) => {
        setSelectedSubcategories(selectedSubcategories.filter((t) => t.id !== subcategory.id));
    }

    // Handle select change event to add subcategory to selectedSubcategories array
    const handleSelectChange = (e: any) => {
        const selectedSubcategoryId = e.target.value;
        setSelectedOption(selectedSubcategoryId);
        const selectedSubcategory = subcategoriesByCategory.find(
            (subcategory) => subcategory.id === selectedSubcategoryId
        );
        if (selectedSubcategory) {
            handleSubcategorySelect(selectedSubcategory);
        }
        setSelectedOption('');
    };

    // Set subcategories array to formik values
    useEffect(() => {
        formik.setFieldValue('subcategories', selectedSubcategories.map(subcategory => subcategory.id));
    }, [selectedSubcategories]);

    // Set subcategoriesByCategory array to subcategories that match the selected categoryId
    useEffect(() => {
        if (formik.values.category !== '') {
            setSubcategoriesByCategory(subcategories.filter(subcategory => subcategory.categoryId === formik.values.category));
        } else {
            setSubcategoriesByCategory([]);
        }
    }, [formik.values.category, subcategories]);

    // Specification summary input value
    const [specSummary, setSpecSummary] = useState('');

    // Set specSummary to formik values
    useEffect(() => {
        formik.setFieldValue('specification.summary', specSummary);
    }, [specSummary]);


    // NewFeature form is open or not (to show/hide the form)
    const [featureFormIsOpen, setNewFeatureFormIsOpen] = useState(false);

    // Feature to edit (if the user clicks on the edit button)
    const [featureToEdit, setFeatureToEdit] = useState<NewFeature | null>(null);

    // Feature form context (create or edit) to show the correct title and button text in the form
    const [featureFormContext, setFeatureFormContext] = useState<'create' | 'edit'>('create');

    // Handle add feature button click
    const handleAddNewFeature = (feature: NewFeature) => {
        formik.setFieldValue('specification.features', [...formik.values.specification.features, feature]);
    }

    // Handle remove feature button click
    const handleRemoveFeature = (feature: NewFeature) => {
        formik.setFieldValue('specification.features', formik.values.specification.features.filter(f => f !== feature));
    }

    // Handle close feature form button click
    const handleCloseFeatureForm = () => {
        setFeatureFormContext('create');
        setNewFeatureFormIsOpen(false);
        setLoading(false);
    }

    // Handle feature form edit button click
    const handleEditFeature = (feature: NewFeature) => {
        setFeatureFormContext('edit');
        setNewFeatureFormIsOpen(true);
        setFeatureToEdit(feature);
        formik.setFieldValue('specification.features', formik.values.specification.features.filter(f => f !== feature));
    }


    // NewCategory form is open or not (to show/hide the form)
    const [categoryFormIsOpen, setCategoryFormIsOpen] = useState(false);

    // Category to edit (if the user clicks on the edit button)
    const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);

    // Category form context (create or edit) to show the correct title and button text in the form
    const [categoryFormContext, setCategoryFormContext] = useState<'create' | 'edit'>('create');

    // Handle edit category button click
    const handleEditCategory = (category: Category) => {
        setCategoryToEdit(category);
        setCategoryFormContext('edit');
        setTimeout(() => {
            setCategoryFormIsOpen(true);
        }, 500);
    }

    // NewCategory form is open or not (to show/hide the form)
    const [subcategoryFormIsOpen, setSubcategoryFormIsOpen] = useState(false);

    // Category to edit (if the user clicks on the edit button)
    const [subcategoryToEdit, setSubcategoryToEdit] = useState<Subcategory | null>(null);

    // Category form context (create or edit) to show the correct title and button text in the form
    const [subcategoryFormContext, setSubcategoryFormContext] = useState<'create' | 'edit'>('create');

    // Handle add category button click
    const handleAddCategory = () => {
        setCategoryFormContext('create');
        setCategoryFormIsOpen(true);
    }

    // Handle add subcategory button click
    const handleAddSubcategory = () => {
        setSubcategoryFormContext('create');
        setSubcategoryFormIsOpen(true);
    }

    // Check if the selected subcategory are related to the selected category, if not, remove them
    useEffect(() => {
        const subcategoriesToRemove = selectedSubcategories.filter(subcategory => subcategory.categoryId !== formik.values.category);
        if (subcategoriesToRemove.length > 0) {
            setSelectedSubcategories(selectedSubcategories.filter(subcategory => subcategory.categoryId === formik.values.category));
        }
    }, [formik.values.category]);

    return (
        <motion.div
            initial="closed"
            animate={isOpen ? 'open' : 'closed'}
            exit="closed"
            variants={backgroundVariants}
            className={`${
                isOpen ? 'block' : 'hidden'
            } fixed inset-0 z-20 bg-black bg-opacity-75 flex items-center justify-center`}
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
                        <BiShoppingBag size={48}/>
                        <div className={"ml-4 font-semibold text-lg leading-tight"}>
                            {context === 'edit' ? 'Editar producto' : 'Crear producto'}
                        </div>
                    </div>

                    <form onSubmit={formik.handleSubmit} className="px-4 pb-4 flex flex-col gap-2">

                        <div className={'grid md:grid-cols-2 gap-x-4 lg:gap-x-8'}>
                            {/* Name input field*/}
                            <div className={"pb-4 w-full"}>
                                <label
                                    className={"block text-sm font-medium pb-4"}
                                    htmlFor="name">
                                    Nombre del producto
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Cajas de cartón para mudanza"
                                    className={"border border-slate-300 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 py-2 px-3 rounded-md shadow-sm placeholder-slate-400 w-full"}
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <span className={"text-sm text-red-600 italic"}>
                                    {formik.touched.name && formik.errors.name ? formik.errors.name : ''}
                                </span>
                            </div>

                            {/* Stock input field*/}
                            <div className={"pb-4 w-full"}>
                                <label
                                    className={"block text-sm font-medium pb-4"}
                                    htmlFor="stock">
                                    Stock
                                </label>
                                <input
                                    type="number"
                                    id="stock"
                                    name="stock"
                                    placeholder="99"
                                    className={"border border-slate-300 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 py-2 px-3 rounded-md shadow-sm placeholder-slate-400 w-full"}
                                    value={formik.values.stock}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <span className={"text-sm text-red-600 italic"}>
                                    {formik.touched.stock && formik.errors.stock ? formik.errors.stock : ''}
                                </span>
                            </div>

                        </div>

                        <div className={'grid md:grid-cols-2 gap-x-4 lg:gap-x-8'}>

                            {/* Price input field*/}
                            <div className={"pb-4 w-full"}>
                                <label
                                    className={"block text-sm font-medium pb-4"}
                                    htmlFor="price">
                                    Precio
                                </label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    placeholder="9999"
                                    className={"border border-slate-300 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 py-2 px-3 rounded-md shadow-sm placeholder-slate-400 w-full"}
                                    value={formik.values.price}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <span className={"text-sm text-red-600 italic"}>
                                    {formik.touched.price && formik.errors.price ? formik.errors.price : ''}
                                </span>
                            </div>

                            {/* Category select field*/}
                            <div className={"pb-4 w-full"}>
                                <div className={'font-medium pb-4 flex gap-2 items-center'}>
                                    <label
                                        className={"block text-sm"}
                                        htmlFor="category"
                                    >
                                        Categoria
                                    </label>

                                    {
                                        formik.values.category !== '' ? (
                                                <div
                                                    className={'hover:text-purple-500 cursor-pointer'}
                                                    onClick={() => handleEditCategory(categories.find((category) => category.id === formik.values.category) as Category)}
                                                >
                                                    <FiEdit/>
                                                </div>
                                            )
                                            : (
                                                <div
                                                    className={'hover:text-blue-500 cursor-pointer'}
                                                    onClick={() => handleAddCategory()}
                                                >
                                                    <MdAddCircleOutline/>
                                                </div>
                                            )
                                    }
                                </div>
                                {
                                    categories.length > 0 ? (
                                            <select
                                                id="category"
                                                name="category"
                                                className={"border border-slate-300 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 py-2 px-3 rounded-md shadow-sm placeholder-slate-400 w-full"}
                                                value={formik.values.category}
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
                                    {formik.touched.category && formik.errors.category ? formik.errors.category : ''}
                                </span>
                            </div>
                        </div>

                        <div className={'grid md:grid-cols-2 gap-x-4 lg:gap-x-8'}>
                            {/* Subcategories input field*/}
                            <div className={"pb-4 w-full"}>
                                <div className={'font-medium pb-4 flex gap-2 items-center'}>
                                    <label
                                        className={"block text-sm font-medium"}
                                    >
                                        Subcategorias
                                    </label>
                                    <div
                                        className={'hover:text-blue-500 cursor-pointer'}
                                        onClick={() => handleAddSubcategory()}
                                    >
                                        <MdAddCircleOutline/>
                                    </div>
                                </div>

                                {
                                    subcategoriesByCategory.length > 0
                                        ? (
                                            <div>
                                                <select
                                                    id="subcategories"
                                                    name="subcategories"
                                                    className={"border border-slate-300 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 py-2 px-3 rounded-md shadow-sm placeholder-slate-400 w-full"}
                                                    value={selectedOption}
                                                    onChange={handleSelectChange}
                                                    onBlur={formik.handleBlur}
                                                >
                                                    <option value={''}>Seleccione una subcategoria</option>
                                                    {
                                                        subcategoriesByCategory.map((subcategory, index) => (
                                                            <option key={index}
                                                                    value={subcategory.id}>{subcategory.name}</option>
                                                        ))
                                                    }
                                                </select>

                                                <span className={"text-sm text-red-600 italic"}>
                                    {formik.touched.subcategories && formik.errors.subcategories ? formik.errors.subcategories : ''}
                                </span>

                                                <div className={'flex gap-2 flex-wrap p-4'}>
                                                    {selectedSubcategories.map((subcategory) => (
                                                        <div key={subcategory.id}
                                                             className={'flex gap-1 items-center text-white bg-red-500 rounded-xl py-1 px-2 text-sm'}
                                                        >
                                                            <span>{subcategory.name}</span>
                                                            <div
                                                                className={'cursor-pointer hover:text-gray-100'}
                                                                onClick={() => handleRemoveSubcategory(subcategory)}
                                                            >
                                                                <AiOutlineCloseCircle/>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                        : (
                                            <div className={'flex gap-2 flex-wrap p-4'}>
                                                {
                                                    formik.values.category === '' ? (
                                                        <span className={'text-sm text-gray-500'}>Seleccione una categoria para ver las subcategorias disponibles</span>
                                                    ) : (
                                                        <span className={'text-sm text-gray-500'}>No hay subcategorias disponibles, por favor cree una nueva</span>
                                                    )
                                                }
                                            </div>
                                        )
                                }
                            </div>

                            {/* Description input field*/}
                            <div className={"pb-4 w-full flex flex-col h-full"}>
                                <label
                                    className={"block text-sm font-medium pb-4"}
                                    htmlFor="description">
                                    Descripción
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    placeholder="Cajas de cartón para mudanza de 1.5m x 1.5m x 1.5m con capacidad para 20kg."
                                    className={"resize-none border border-slate-300 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 py-2 px-3 rounded-md shadow-sm placeholder-slate-400 w-full flex-grow"}
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <span className={"text-sm text-red-600 italic"}>
                                    {formik.touched.description && formik.errors.description ? formik.errors.description : ''}
                                </span>
                            </div>

                        </div>

                        <div className={'grid md:grid-cols-1 gap-x-4 lg:gap-x-8'}>
                            {/* Specs summary input field*/}
                            <div className={"pb-4 w-full"}>
                                <label
                                    className={"block text-sm font-medium pb-4"}
                                    htmlFor="summary">
                                    Resumen de especificaciones
                                </label>
                                <input
                                    type="text"
                                    id="summary"
                                    name="summary"
                                    placeholder="Con capacidad para 20kg. Estas cajas son ideales para mudanzas. Ademas, son reutilizables y reciclables."
                                    className={"border border-slate-300 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 py-2 px-3 rounded-md shadow-sm placeholder-slate-400 w-full"}
                                    value={specSummary}
                                    onChange={(e) => setSpecSummary(e.target.value)}
                                    onBlur={formik.handleBlur}
                                />
                                <span className={"text-sm text-red-600 italic"}>
                                    {formik.touched.specification?.summary && formik.errors.specification?.summary ? formik.errors.specification?.summary : ''}
                                </span>
                            </div>

                        </div>

                        <div className={'flex items-center justify-between'}>
                            <label
                                className={"block text-sm font-medium pb-1 w-full"}>
                                Caracteristicas
                            </label>
                            <div className={'w-full flex justify-end items-center'}>
                                <div
                                    className={'flex gap-2 items-center bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-full m-1 text-sm cursor-pointer'}
                                    onClick={() => setNewFeatureFormIsOpen(true)}
                                >
                                    <AiOutlineAppstoreAdd className={'text-xl'}/>
                                    <span>Añadir</span>
                                </div>
                            </div>
                        </div>

                        <div className={'grid md:grid-cols-1 gap-x-4 lg:gap-x-8 mb-4'}>
                            <div
                                className={"border border-slate-300 py-2 px-3 rounded-md w-full overflow-y-auto max-h-56"}
                            >
                                {
                                    formik.values.specification.features.length > 0 ? (
                                        <div
                                            className={'grid gap-4 grid-cols-1'}
                                        >
                                            {
                                                formik.values.specification.features.map((feature, index) => (
                                                    <div key={index}
                                                         className={'flex gap-2 items-center justify-between p-4 border rounded-xl border-gray-200 relative bg-gray-100 h-80 lg:h-48'}
                                                    >
                                                        <div className={'flex gap-2 items-center h-full w-full'}>
                                                            <FeatureCard feature={feature}/>
                                                        </div>
                                                        <div
                                                            className={'absolute top-0 right-0 text-3xl z-10 flex gap-4'}>
                                                            <div
                                                                className={'cursor-pointer text-white hover:text-purple-500 drop-shadow shadow-black'}
                                                                onClick={() => handleEditFeature(feature)}
                                                            >
                                                                <FiEdit/>
                                                            </div>
                                                            <div
                                                                className={'cursor-pointer text-white hover:text-red-500 drop-shadow shadow-black'}
                                                                onClick={() => handleRemoveFeature(feature)}
                                                            >
                                                                <AiOutlineCloseCircle/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    ) : (
                                        <div className={'text-gray-400 h-36 w-full flex items-center justify-center'}>
                                        <span
                                            className={'text-sm text-gray-500'}>No hay caracteristicas agregadas</span>
                                        </div>
                                    )
                                }
                            </div>
                            <span className={"text-sm text-red-600 italic"}>
                                    {formik.touched.specification?.features && formik.errors.specification?.features ? formik.errors.specification?.features.toString() : ''}
                                </span>
                        </div>

                        <div className={'grid md:grid-cols-1 gap-x-4 lg:gap-x-8'}>
                            {/* Image input field*/}
                            <ImageUploader
                                images={formik.values.images}
                                setImages={files => formik.setFieldValue('images', files)}
                                maxImages={8}
                                label={'Imagenes del producto'}
                                inputId={'product-images'}
                            />
                            <span className={"text-sm text-red-600 italic"}>
                                    {formik.touched.images && formik.errors.images ? formik.errors.images.toString() : ''}
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

                    <ProductFeatureForm
                        isOpen={featureFormIsOpen}
                        onClose={() => handleCloseFeatureForm()}
                        handleSubmit={handleAddNewFeature}
                        setIsLoading={setLoading}
                        feature={featureToEdit}
                        context={featureFormContext}
                    />

                    <CategoryForm
                        category={categoryToEdit}
                        isOpen={categoryFormIsOpen}
                        onClose={() => setCategoryFormIsOpen(false)}
                        setLoading={setLoading}
                        setShowSuccess={setShowSuccess}
                        setSuccessMessage={setSuccessMessage}
                        setShowError={setShowError}
                        setErrorMessage={setErrorMessage}
                        context={categoryFormContext}
                    />

                    <SubcategoryForm
                        subcategory={subcategoryToEdit}
                        isOpen={subcategoryFormIsOpen}
                        onClose={() => setSubcategoryFormIsOpen(false)}
                        setLoading={setLoading}
                        setShowSuccess={setShowSuccess}
                        setSuccessMessage={setSuccessMessage}
                        setShowError={setShowError}
                        setErrorMessage={setErrorMessage}
                        context={subcategoryFormContext}
                    />
                </div>
            </motion.div>
        </motion.div>
    );
};

