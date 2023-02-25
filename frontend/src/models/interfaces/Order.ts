/**
 * Interface for Order details.
 *
 * This interface is used to represent the details of an order.
 *
 * @interface
 * @param {string} date - Date of order.
 *
 */
export interface OrderDetails {
    date: string;
    pse_reference3: string;
    payment_method_type: string;
    pse_reference2: string;
    franchise: string;
    commision_pol: string;
    pse_reference1: string;
    shipping_city: string;
    bank_referenced_name: string;
    sign: string;
    extra2: string;
    extra3: string;
    operation_date: string;
    payment_request_state: string;
    billing_address: string;
    extra1: string;
    administrative_fee: string;
    administrative_fee_tax: string;
    bank_id: string;
    nickname_buyer: string;
    payment_method: string;
    attempts: string;
    transaction_id: string;
    transaction_date: string;
    test: string;
    exchange_rate: string;
    ip: string;
    reference_pol: string;
    cc_holder: string;
    tax: string;
    antifraudMerchantId: string;
    pse_bank: string;
    transaction_type: string;
    state_pol: string;
    billing_city: string;
    phone: string;
    error_message_bank: string;
    shipping_country: string;
    error_code_bank: string;
    cus: string;
    commision_pol_currency: string;
    customer_number: string;
    description: string;
    merchant_id: string;
    administrative_fee_base: string;
    authorization_code: string;
    currency: string;
    shipping_address: string;
    nickname_seller: string;
    cc_number: string;
    installments_number: string;
    value: string;
    transaction_bank_id: string;
    billing_country: string;
    cardType: string;
    response_code_pol: string;
    payment_method_name: string;
    office_phone: string;
    email_buyer: string;
    payment_method_id: string;
}


/**
 * Interface for Shipping Address.
 *
 * This interface is used to represent the shipping address of an order.
 *
 * @interface ShippingAddress
 * @property {string} id - The id of the shipping address.
 * @property {string} address - The address of the shipping address.
 * @property {string} cityId - The cityId of the shipping address.
 * @property {string} departmentId - The departmentId of the shipping address.
 * @property {string} zipCode - The zip code of the shipping address.
 * @property {string} neighborhood - The neighborhood of the shipping address.
 */
export interface ShippingAddress {
    id: string;
    address: string;
    cityId: string;
    departmentId: string;
    zipCode: string;
    neighborhood: string;

}

/**
 * Interface for Product at the Order.
 *
 * This interface is used to represent a product at the order.
 *
 * @interface
 * @property {string} productId - The id of the product.
 * @property {number} quantity - The quantity of the product.
 */
export interface OrderProduct {
    productId: string;
    quantity: number;
}

/**
 * Interface for Order object.
 *
 * This interface is used to represent an order.
 *
 * @interface Order
 * @property {string} id - The id of the order.
 * @property {string} userId - The id of the user who created the order.
 * @property {Array<any>} products - List of products in the order.
 * @property {string} stateId - The status of the order.
 * @property {object} details - The details of the order.
 * @property {object} shippingAddress - The shipping address of the order.
 * @property {number} shippingValue - The shipping value of the order.
 * @property {boolean} online - If the order was pay online.
 */
export interface Order {
    id: string;
    userId: string;
    stateId: string;
    products: Array<OrderProduct>;
    details?: OrderDetails;
    shippingAddress: ShippingAddress;
    shippingValue?: number;
    online: boolean;
}

/**
 * Interface for new Order object.
 *
 * This interface is used to create a new order.
 *
 * @interface NewOrder
 * @property {string} userId - The id of the user who created the order.
 * @property {Array<any>} products - List of products in the order.
 * @property {string} total - The total price of the order.
 */
export interface NewOrder {
    userId: string;
    shippingAddress: ShippingAddress,
    products: Array<OrderProduct>,
    total: number,
}

/**
 * Interface for Order Status.
 *
 * The status of the order is defined by the percentage of the order that has been completed.
 *
 * @interface OrderStatus
 * @property {string} id - The id of the status.
 * @property {string} name - The name of the status.
 * @property {number} percentage - The percentage of the status.
 */
export interface OrderStatus {
    id: string;
    name: string;
    percentage: number;
}