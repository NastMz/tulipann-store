/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            transitionProperty: {
                'height': 'height',
                'width': 'width',
                'spacing': 'margin, padding',
            },
            animation: {
                slideOutLeft: 'slideOutLeft 0.3s ease-out',
                slideInLeft: 'slideInLeft 0.3s ease-in',
                slideOutRight: 'slideOutRight 0.3s ease-out',
                slideInRight: 'slideInRight 0.3s ease-in',
            },
            keyframes: theme => ({
                slideOutLeft: {
                    '0%': {
                        translate: 0,
                        scale: 0.5
                    },
                    '100%': {
                        translate: '-100%'
                    },
                },
                slideOutRight: {
                    '0%': {
                        translate: 0,
                        scale: 0.5
                    },
                    '100%': {
                        translate: '100%'
                    },
                },
                slideInLeft: {
                    '0%': {
                        translate: '-100%',
                        scale: 0.5
                    },
                    '100%': {
                        translate: 0,
                        scale: 1
                    },
                },
                slideInRight: {
                    '0%': {
                        translate: '100%',
                        scale: 0.5
                    },
                    '100%': {
                        translate: 0,
                        scale: 1
                    },
                },
            }),
        },
    },
    plugins: [],
}