interface LocalStorageProduct {
    id: number,
    count: number
}

export const loadCartState = (): Array<LocalStorageProduct> => {
    try {
        const serializedState = localStorage.getItem('cartState');
        if (serializedState === null) {
            return [];
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return [];
    }
};

export const saveCartState = (state: Array<LocalStorageProduct>) => {
        try {
            const serializedState = JSON.stringify(state);
            localStorage.setItem('cartState', serializedState);
        } catch {
        }
    };