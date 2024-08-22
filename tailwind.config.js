import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
        "./src/**/*.{js,jsx,ts,tsx,mdx}",
    ],

    theme: {
        extend: {
            backgroundImage: {
                'bg-image': "url('/assets/n2u.png')"
            },
            fontFamily: {
                sans: ['DM Sans', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: {
                    100: '#FEECD2',
                    200: '#FDD3A6',
                    300: '#FBB479',
                    400: '#F79557',
                    500: '#F26522',
                    600: '#D04718',
                    700: '#AE2F11',
                    800: '#8C1B0A',
                    900: '#740D06',
                },
                success: {
                    100: '#E9FCD8',
                    200: '#CEFAB1',
                    300: '#A9F088',
                    400: '#85E167',
                    500: '#52CE39',
                    600: '#36B129',
                    700: '#1E941C',
                    800: '#127718',
                    900: '#0A6217',
                },
                info: {
                    100: '#CFF2FF',
                    200: '#9FE1FF',
                    300: '#70CBFF',
                    400: '#4CB5FF',
                    500: '#1190FF',
                    600: '#0C6FDB',
                    700: '#0853B7',
                    800: '#053A93',
                    900: '#03297A',
                },
                warning: {
                    100: '#FFFBCC',
                    200: '#FFF699',
                    300: '#FFF066',
                    400: '#FFEA3F',
                    500: '#FFE100',
                    600: '#DBBE00',
                    700: '#B79D00',
                    800: '#937D00',
                    900: '#7A6500',
                },
                error: {
                    100: '#FEE5D6',
                    200: '#FEC5AE',
                    300: '#FD9E86',
                    400: '#FB7967',
                    500: '#F93D36',
                    600: '#D6272F',
                    700: '#B31B2F',
                    800: '#90112C',
                    900: '#770A2B',
                },
                neutral: {
                    100: '#E4E4E7',
                    200: '#D4D4D8',
                    300: '#A1A1AA',
                    400: '#71717A',
                    500: '#52525B',
                    600: '#3F3F46',
                    700: '#27272A',
                    800: '#18181B',
                    900: '#09090B',
                },
            },
            boxShadow: {
                'input': '0px 1px 2px 0px rgba(9, 9, 11, 0.05)',
            }
        },
        fontSize: {
            'xss': ['10px', {
                lineHeight: '16px'
            }],
            'xs': ['12px', {
                lineHeight: '16px'
            }],
            'sm': ['14px', {
                lineHeight: '20px'
            }],
            'base': ['16px', {
                lineHeight: '24px'
            }],
            'lg': ['20px', {
                lineHeight: '28px'
            }],
            'xl': ['24px', {
                lineHeight: '32px'
            }],
            'xxl': ['30px', {
                lineHeight: '42px'
            }],
        }
    },

    plugins: [forms],
};
