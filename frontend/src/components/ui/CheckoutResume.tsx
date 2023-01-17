import { useEffect, useState } from "react";
import { store } from "../../redux/store";
import { useDispatch } from "react-redux";
import { decreaseCount, increaseCount, removeFromCart } from "../../redux/actions";
import { ShoppingCartCard } from "../layout";
import { Navigate } from "react-router-dom";
import { routes } from "../../config/routes";

/**
 * Interface for CheckoutResume component props.
 *
 * @interface CheckoutResumeProps
 * @property {Function} setOrder - Function to set the order object.
 * @property {string} [className] - Optional class name for the component.
 */
interface CheckoutResumeProps {
  setOrder: (order: {
      products: any[],
      subtotal: number,
      shipping: number,
      taxes: number,
      total: number,
  }) => void;
  className?: string;
}

/**
 * CheckoutResume component.
 *
 * This component displays the shopping cart items and the order summary, and also allows
 * the user to update the item quantities and remove items from the cart.
 *
 * @param {CheckoutResumeProps} props - Props for the component.
 * @returns {ReactNode} The rendered component.
 */
export const CheckoutResume = (props: CheckoutResumeProps) => {
  // Get the dispatch function to dispatch actions to the store
  const dispatch = useDispatch();

  // Initialize the order state with an empty array
  const [order, setOrder] = useState<Array<any>>([]);

  // Initialize the subtotal, taxes, shipping and total states with 0
  const [subtotal, setSubtotal] = useState<number>(0);
  const [taxes, setTaxes] = useState<number>(0);
  const [shipping, setShipping] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  // Use effect to set the order and subtotal states when the component mounts
  useEffect(() => {
    setOrder(store.getState().cart.list);
    setSubtotal(store.getState().cart.subtotal);
  }, []);

  // Increase the count of the product with the given ID
  const increaseProduct = (id: string) => {
    dispatch(increaseCount(id));
  };

  // Decrease the count of the product with the given ID
  const decreaseProduct = (id: string) => {
    dispatch(decreaseCount(id));
  };

  // Remove the product with the given ID from the cart
  const remove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  // Subscribe to the store to update the order and subtotal states when the cart changes
  store.subscribe(() => {
    setOrder(store.getState().cart.list);
    setSubtotal(store.getState().cart.subtotal);
  });

  // Use effect to calculate the shipping cost based on the subtotal
    useEffect(() => {
        setShipping(Math.round(subtotal * 0.05));
        }, [subtotal]);

    // Use effect to calculate the taxes based on the subtotal
    useEffect(() => {
        setTaxes(Math.round(subtotal * 0.19));
        }, [subtotal]);

    // Use effect to calculate the total based on the subtotal, taxes and shipping
    useEffect(() => {
        setTotal(subtotal + taxes + shipping);
        }, [taxes]);

    // Use effect to set the order object in the parent component
    useEffect(() => {
        props.setOrder({
            products: order,
            subtotal: subtotal,
            shipping: shipping,
            taxes: taxes,
            total: total,
        });
        }, [total]);

    // If the cart is not empty, render the component
    if (store.getState().cart.list.length > 0) {
        return (
                <div
                    className={`h-full w-full max-w-full flex gap-4 flex-col ${props.className}`}
                    >
                    <div
                        className={`w-full h-fit max-h-96 lg:h-96 overflow-y-auto`}
                        >
                        <div className={`grid px-4 w-full divide-y divide-solid divide-gray-200`}>
                            {order.map((product) => (
                                    <ShoppingCartCard
                                        id={product.id}
                                        name={product.name}
                                        price={product.price}
                                        image={product.images[0]}
                                        count={product.count}
                                        increaseFunction={increaseProduct}
                                        decreaseFunction={decreaseProduct}
                                        removeProductFromCart={remove}
                                        key={product.id}
                                        className={`h-24`}
                                    />
                                    ))}
                        </div>
                    </div>
                    <div
                        className={`max-w-full flex-shrink text-sm flex flex-col gap-2 divide-y divide-solid divide-gray-200`}
                        >
                        <div className={`flex flex-col gap-2`}>
                            <div className={`flex justify-between px-4 font-medium`}>
                                <span className={`text-gray-500`}>Subtotal</span>
                                <span className={``}>${subtotal}</span>
                            </div>
                            <div className={`flex justify-between px-4 font-medium`}>
                                <span className={`text-gray-500`}>Impuestos</span>
                                <span className={``}>${taxes}</span>
                            </div>
                            <div className={`flex justify-between px-4 font-medium`}>
                                <span className={`text-gray-500`}>Envío</span>
                                <span className={``}>${shipping}</span>
                            </div>
                            <div className={`flex justify-between px-4 font-medium`}>
                                <span className={`text-gray-500 font-medium`}>Total</span>
                                <span className={`font-medium`}>${total}</span>
                            </div>
                        </div>
                    </div>
                </div>
            );
    }
    // If the cart is empty, navigate to the home page
    return <Navigate to={routes.home.path} />;
};
