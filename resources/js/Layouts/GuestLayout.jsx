import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className='flex justify-center items-center'>
            <div className="min-h-screen max-w-md flex w-full flex-col sm:justify-center items-center bg-white">
                <div className="w-full sm:max-w-md bg-white shadow-md overflow-hidden sm:rounded-lg">
                    {children}
                </div>
            </div>
        </div>
    );
}
