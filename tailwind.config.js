/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,ts}'],
    theme: {
        extend: {
            colors: {
                transparent: 'transparent',
                white: '#FFFFFF',
                black: '#000000',
                primary: {
                    25: '#FFF9F5',
                    50: '#FFF4ED',
                    100: '#FFE6D5',
                    200: '#FFD6AE',
                    300: '#FF9C66',
                    400: '#FF692E',
                    500: '#FF4405',
                    600: '#E62E05',
                    700: '#BC1B06',
                    800: '#97180C',
                    900: '#771A0D',
                },
                gray: {
                    25: '#FCFCFD',
                    50: '#F9FAFB',
                    100: '#F2F4F7',
                    200: '#EAECF0',
                    300: '#D0D5DD',
                    400: '#98A2B3',
                    500: '#667085',
                    600: '#475467',
                    700: '#344054',
                    800: '#1D2939',
                    900: '#101828',
                },
                error: {
                    25: '#FFFBFA',
                    50: '#FEF3F2',
                    100: '#FEE4E2',
                    200: '#FECDCA',
                    300: '#FDA29B',
                    400: '#F97066',
                    500: '#F04438',
                    600: '#D92D20',
                    700: '#B42318',
                    800: '#912018',
                    900: '#7A271A',
                },
                warning: {
                    25: '#FFFCF5',
                    50: '#FFFAEB',
                    100: '#FEF0C7',
                    200: '#FEDF89',
                    300: '#FEC84B',
                    400: '#FDB022',
                    500: '#F79009',
                    600: '#DC6803',
                    700: '#B54708',
                    800: '#93370D',
                    900: '#7A2E0E',
                },
                success: {
                    25: '#F6FEF9',
                    50: '#ECFDF3',
                    100: '#D1FADF',
                    200: '#A6F4C5',
                    300: '#6CE9A6',
                    400: '#32D583',
                    500: '#12B76A',
                    600: '#039855',
                    700: '#027A48',
                    800: '#05603A',
                    900: '#054F31',
                },
            },
        },
    },
    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: '#FF4405',

                    secondary: '#fff4ed',

                    accent: '#1fb2a6',

                    neutral: '#2a323c',

                    'base-100': '#F9FAFB',

                    info: '#3abff8',

                    success: '#12B76A',

                    warning: '#F79009',

                    error: '#F04438',
                },
            },
        ],
    },
    plugins: [require('daisyui')],
};
