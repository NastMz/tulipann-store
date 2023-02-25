import { useEffect, useState } from "react";
import { store } from "../../redux/store";
import { useDispatch } from "react-redux";
import { decreaseCount, increaseCount, removeFromCart } from "../../redux/actions";
import { ShoppingCartCard } from "../layout";
import { Navigate } from "react-router-dom";
import { routes } from "../../config/routes";
import {OrderProduct} from "../../models/interfaces/Order";
import {Product} from "../../models/interfaces";

/**
 * Interface for CheckoutResume component props.
 *
 * @interface CheckoutResumeProps
 * @property {Function} setOrder - Function to set the order object.
 * @property {string} [className] - Optional class name for the component.
 */
interface CheckoutResumeProps {
  setOrder: (orderProducts: OrderProduct[]) => void;
  className?: string;
}

/**
 * Interface for add count propertie to Product interface.
 *
 * @interface ProductWithCount
 * @property {number} count - Count of the product.
 * @extends {Product} - Product interface.
 */
interface ProductWithCount extends Product {
    count: number;
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
  const [order, setOrder] = useState<Array<OrderProduct>>([]);

  const [orderProducts, setOrderProducts] = useState<Array<ProductWithCount>>([]);

  // Initialize total state with 0
  const [total, setTotal] = useState<number>(0);

  // Function to update the order state
  const setOrderAndTotal = () => {
      let orderProducts = store.getState().cart.list.map((product) => {
          return {
              productId: product.id,
              quantity: product.count
          }
      });
      setOrder(orderProducts);
      setTotal(store.getState().cart.subtotal);
  }

  // Use effect to set the order and subtotal states when the component mounts
  useEffect(() => {
      setOrderAndTotal();
      setOrderProducts(store.getState().cart.list);
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
      setOrderAndTotal();
  });

    // Use effect to set the order object in the parent component
    useEffect(() => {
        props.setOrder(order);
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
                            {orderProducts.map((product) => (
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
