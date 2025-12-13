/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Muted Teal / Blue Palette
                brand: {
                    50: '#f0f9fa',
                    100: '#d5f0f3',
                    200: '#aee0e6',
                    300: '#7cc7d1',
                    400: '#4da6b4',
                    500: '#318998', // Primary
                    600: '#266e7d',
                    700: '#225a67',
                    800: '#214b56',
                    900: '#1e3f49',
                    950: '#0f2831',
                },
                accent: {
                    // Warmer tone for CTAs (Soft Orange/Coral)
                    50: '#fff8f1',
                    500: '#f97316',
                    600: '#ea580c',
                },
                surface: '#ffffff',
                background: '#f8fafc', // Very light gray-blue
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'], // Headings
            },
            animation: {
                'blob': 'blob 7s infinite',
                'float': 'float 6s ease-in-out infinite',
                'spin-slow': 'spin 12s linear infinite',
            },
            keyframes: {
                blob: {
                    '0%': {
                        transform: 'translate(0px, 0px) scale(1)',
                    },
                    '33%': {
                        transform: 'translate(30px, -50px) scale(1.1)',
                    },
                    '66%': {
                        transform: 'translate(-20px, 20px) scale(0.9)',
                    },
                    '100%': {
                        transform: 'translate(0px, 0px) scale(1)',
                    },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
                'glass-hover': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
            }
        },
    },
    plugins: [],
}
