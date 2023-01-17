import React from 'react';

/**
 * Loader component.
 *
 * This component displays a loading spinner.
 *
 * @returns {React.ReactNode} The rendered component.
 */
export const Loader: React.FC = () => {
    return (
        <div className="h-screen w-full flex justify-center items-center">
            <div className="loader" />
        </div>
    );
};
