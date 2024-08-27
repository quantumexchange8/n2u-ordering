import { LocationIcon, OrderListIcon, ProfileIcon, TableIcon } from '@/Components/Icon/Outline';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'

export default function Dashboard({ auth }) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="w-full flex flex-col bg-bg-image bg-center bg-cover">
                <div className='flex flex-col pt-3 gap-3'>
                    <div className='flex items-center gap-3 px-4'>
                        <div
                            className='flex items-center gap-3 py-2 px-4 bg-neutral-800 rounded-full w-full'
                        >
                            <div><LocationIcon /></div>
                            <div className='text-neutral-100 overflow-hidden overflow-ellipsis text-xs'>Nice two Meat U (Penang Branch)</div>
                        </div>

                        <div className='flex items-center gap-2'>
                            <div><OrderListIcon /></div>
                            <div>
                                <Link href={route('profile')}>
                                    <ProfileIcon />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='px-4 flex items-center justify-between'>
                        <div>
                            <TabGroup className='flex flex-col'>
                                <TabList className="flex justify-center">
                                    <div className='bg-neutral-700 rounded-full'>
                                        <Tab
                                            className="transition-all duration-300 rounded-full py-2 px-3 text-xs text-white font-bold focus:outline-none data-[selected]:bg-white data-[selected]:text-primary-500"
                                        >
                                            <span className='px-1.5'>Dine In</span>
                                        </Tab>
                                        <Tab
                                            className="transition-all duration-300 rounded-full py-2 px-3 text-xs text-white font-bold focus:outline-none data-[selected]:bg-white data-[selected]:text-primary-500"
                                        >
                                            <span className='px-2.5'>Take Away</span>
                                        </Tab>
                                    </div>
                                </TabList>
                            </TabGroup>
                        </div>
                        <div
                            className='flex justify-center items-center gap-2 p-2 bg-neutral-800 rounded-full w-[80px]'
                        >
                            <div><TableIcon /></div>
                            <div className='text-neutral-100 overflow-hidden overflow-ellipsis text-xs'>-</div>
                        </div>
                    </div>
                    <div className='w-full h-40'>
                        
                    </div>
                </div>
                <div className='min-h-full bg-black'>
                    
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
