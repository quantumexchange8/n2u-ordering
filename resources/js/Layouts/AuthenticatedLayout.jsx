import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">

            <Navbar showingNavigationDropdown={showingNavigationDropdown}/>
            
            <main className='w-full flex justify-center'>
                <div className='max-w-md w-full'>
                    {children}
                </div>
                
            </main>
        </div>
    );
}
