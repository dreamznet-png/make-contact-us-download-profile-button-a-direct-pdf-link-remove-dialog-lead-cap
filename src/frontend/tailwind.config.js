import typography from '@tailwindcss/typography';
import containerQueries from '@tailwindcss/container-queries';
import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: false,
    content: ['index.html', 'src/**/*.{js,ts,jsx,tsx,html,css}'],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            colors: {
                border: '#1e3a5f',
                input: '#1e3a5f',
                ring: '#E8AE20',
                background: '#0D1E35',
                foreground: '#ffffff',
                primary: {
                    DEFAULT: '#E8AE20',
                    foreground: '#0D1E35'
                },
                secondary: {
                    DEFAULT: '#1a2f50',
                    foreground: '#ffffff'
                },
                destructive: {
                    DEFAULT: '#c0392b',
                    foreground: '#ffffff'
                },
                muted: {
                    DEFAULT: '#1a2f50',
                    foreground: '#cbd5e1'
                },
                accent: {
                    DEFAULT: '#1a2f50',
                    foreground: '#ffffff'
                },
                popover: {
                    DEFAULT: '#122040',
                    foreground: '#ffffff'
                },
                card: {
                    DEFAULT: '#122040',
                    foreground: '#ffffff'
                },
                navy: {
                    DEFAULT: '#0D1E35',
                    dark: '#08121F'
                },
                charcoal: '#0f1d2e',
                'accent-yellow': '#E8AE20'
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            boxShadow: {
                xs: '0 1px 2px 0 rgba(0,0,0,0.05)'
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out'
            }
        }
    },
    plugins: [typography, containerQueries, animate]
};
