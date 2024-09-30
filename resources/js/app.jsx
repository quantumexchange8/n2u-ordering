import './bootstrap';
import '../css/app.css';

import "primereact/resources/themes/lara-light-blue/theme.css";
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import {LayoutProvider} from "@/Layouts/layout/context/layoutcontext.jsx";
import { PrimeReactProvider } from 'primereact/api';
import { I18nextProvider } from 'react-i18next';
import i18n from './Composables/i18';



const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <PrimeReactProvider>
                <I18nextProvider i18n={i18n}>
                    <App {...props} />
                </I18nextProvider>
                
            </PrimeReactProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
