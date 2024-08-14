import { XIcon } from '@/Components/Icon/Outline';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';
import React from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import Login from './Login';
import Register from './Register';
import Button from '@/Components/Button';

export default function AuthAccount() {

    return (
        <GuestLayout>
            <Head title="Log In" />

            <div className='flex flex-col'>
                <div className=' sticky p-3 flex justify-center'>
                    {/* <div><XIcon /></div> */}
                    <div className='text-neutral-900 text-sm font-bold'>Member Account</div>
                    {/* <div></div> */}
                </div>
                <div className='flex flex-col gap-4 max-h-[80vh] overflow-auto'>
                    <div className="flex w-full justify-center">
                        <div className="w-full max-w-md">
                            <TabGroup className='flex flex-col'>
                                <TabList className="flex justify-center">
                                    <div className='bg-[#e4e4e780] rounded-full'>
                                        <Tab
                                            className="transition-all duration-300 rounded-full py-2 px-3 text-xs text-neutral-500 font-bold focus:outline-none data-[selected]:bg-primary-500 data-[selected]:text-white data-[focus]:outline-1 data-[focus]:outline-white"
                                        >
                                            <span className='px-1.5'>Sign Up</span>
                                        </Tab>
                                        <Tab
                                            className="transition-all duration-300 rounded-full py-2 px-3 text-xs text-neutral-500 font-bold focus:outline-none data-[selected]:bg-primary-500 data-[selected]:text-white data-[focus]:outline-1 data-[focus]:outline-white"
                                        >
                                            <span className='px-2.5'>Log In</span>
                                        </Tab>
                                    </div>
                                </TabList>
                                <TabPanels>
                                    <TabPanel className="p-4">
                                        <Register />
                                    </TabPanel>
                                    <TabPanel className="rounded-xl bg-white/5 p-3">
                                        <Login />
                                    </TabPanel>
                                </TabPanels>
                            </TabGroup>
                        </div>
                    </div>
                    <div className='py-3 px-4 flex flex-col gap-1'>
                        <div className='flex flex-col gap-3'>
                            <Button
                                variant='black'
                                size='sm'
                                className='flex justify-center'
                                disabled={true}
                            >
                                Continue as guest
                            </Button>
                            <Button
                                variant='white'
                                size='sm'
                                className='flex justify-center'
                                disabled={true}
                            >
                                Continue as staff
                            </Button>
                        </div>
                        <div className='text-neutral-500 text-xss leading-7'>
                            By continuing,  you agree to Our <span className='text-primary-500'>User Agreement</span> and <span className='text-primary-500'>Privacy Policy</span> applies.
                        </div>
                    </div>
                </div>
            </div>
            
        </GuestLayout>
    )
}