import {EditableTable, LoaderModal, Modal} from "../common";
import {selectCategories, selectProducts, selectSubcategories} from "../../redux/selector";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useDispatch, useSelector} from "react-redux";
import {Product} from "../../models/interfaces";
import {useState} from "react";
import {deleteProduct} from "../../api/data/product";
import {removeAllProducts} from "../../redux/actions";
import {ProductForm} from "../ui";
import {formatPrice, getErrors} from "../../utils";

export const ProductPage = () => {

    const products = useSelector(selectProducts);

    const categories = useSelector(selectCategories);

    const subcategories = useSelector(selectSubcategories);

    // Loading state
    const [loading, setLoading] = useState<boolean>(false);

    // Show success modal state
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Show error modal state
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Show delete alert state (for the delete confirmation modal)
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);

    // Product state for the edit form.
    const [product, setProduct] = useState<Product | null>(null);

    // Product form modal state (open or closed).
    const [formIsOpen, setFormIsOpen] = useState(false);

    // Function to close the product form modal.
    const onFormClose = () => {
        setFormIsOpen(false);
    }

    // Context state (edit or create) for the product form.
    const [context, setContext] = useState<'edit' | 'create'>('create');

    const queryClient = useQueryClient();

    const dispatch = useDispatch();

    // Mutation for deleting a product.
    const deleteProductMutate = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            dispatch(removeAllProducts());
            queryClient.invalidateQueries(['apiProducts']);
            setLoading(false);
            setShowSuccess(true);
            setSuccessMessage('Producto eliminado correctamente.');
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

    // Function to handle the delete product action.
    const handleDeleteProduct = (product: Product) => {
        setShowDeleteAlert(true);
        setProductToDelete(product);
    }

    // Function to close delete confirmation modal when the user clicks outside the modal or on the cancel button.
    const onDeleteAlertClose = () => {
        setShowDeleteAlert(false);
        setProductToDelete(null);
    }

    // State for the product to delete (for the delete confirmation modal).
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);

    // Function to handle delete product confirmation.
    const handleDeleteProductConfirmation = () => {
        if (!productToDelete) {
            return;
        }

        setLoading(true);
        deleteProductMutate.mutate(productToDelete.id);
    }

    const tableProducts = products.map((product) => {
        return {
            id: product.id,
            name: product.name,
            description: product.description,
            stock: product.stock,
            price: formatPrice(product.price),
            category: categories.find((category) => category.id === product.categoryId)?.name,
            subcategories: product.subcategories.map((subcategory) => subcategories.find((subcategoryItem) => subcategoryItem.id === subcategory.subcategoryId)?.name).join(', '),
            specifications: product.specification.features.map((specification) => specification.description).join(', '),
        }
    });

    const setSelectedProduct = (product: any) => {
        const productToSet = products.find((productItem) => productItem.id === product.id);

        if (productToSet) {
            setProduct(productToSet);
        }
    }

    return (
        <div
            className={'h-full w-full'}
        >
            <EditableTable
                headersMap={{
                    id: 'ID',
                    name: 'Producto',
                    stock: 'Stock',
                    price: 'Precio',
                    category: 'Categoría',
                    subcategories: 'Subcategorías',
                    specifications: 'Especificaciones',
                }}
                data={tableProducts}
                setContext={setContext}
                setShowForm={setFormIsOpen}
                setSelectedRecord={setSelectedProduct}
                deleteRecord={handleDeleteProduct}
                itemsPerPage={5}
            />

            <ProductForm
                product={product}
                isOpen={formIsOpen}
                onClose={onFormClose}
                setLoading={setLoading}
                setShowSuccess={setShowSuccess}
                setSuccessMessage={setSuccessMessage}
                setShowError={setShowError}
                setErrorMessage={setErrorMessage}
                context={context}
            />

            <Modal
                title={'Exito'}
                message={successMessage}
                buttonText={'Aceptar'}
                isOpen={showSuccess}
                onClose={() => setShowSuccess(false)}
                onButtonClick={() => setShowSuccess(false)}
                type={'success'}
            />


            <Modal
                title={'Error'}
                message={errorMessage}
                buttonText={'Aceptar'}
                isOpen={showError}
                onClose={() => setShowError(false)}
                onButtonClick={() => setShowError(false)}
                type={'error'}
            />

            <Modal
                title={'Atención'}
                message={'¿Está seguro que desea eliminar este producto?'}
                buttonText={'Confirmar'}
                isOpen={showDeleteAlert}
                onClose={onDeleteAlertClose}
                onButtonClick={handleDeleteProductConfirmation}
                type={'warning'}
            />

            <LoaderModal isOpen={loading}/>
        </div>
    )
}