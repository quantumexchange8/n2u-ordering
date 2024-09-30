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
                    <div className='text-neutral-900 text-sm font-bold'>{t('member_account')}</div>
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
                                            <span className='px-1.5'>{t('login')}</span>
                                        </Tab>
                                        <Tab
                                            className="transition-all duration-300 rounded-full py-2 px-3 text-xs text-neutral-500 font-bold focus:outline-none data-[selected]:bg-primary-500 data-[selected]:text-white data-[focus]:outline-1 data-[focus]:outline-white"
                                        >
                                            <span className='px-2.5'>{t('sign_up')}</span>
                                        </Tab>
                                    </div>
                                </TabList>
                                <TabPanels>
                                    <TabPanel className="p-4">
                                        <Login />
                                    </TabPanel>
                                    <TabPanel className="p-4">
                                        <Register />
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
                                {t('continue_as_guest')}
                            </Button>
                            <Button
                                variant='white'
                                size='sm'
                                className='flex justify-center'
                                disabled={true}
                            >
                                {t('continue_as_staff')}
                            </Button>
                        </div>
                        <div className='text-neutral-500 text-xss leading-7'>
                            {t('by_continuing_you_agree_to_our')} <span className='text-primary-500'>{t('user_agreement')}</span> {t('and')} <span className='text-primary-500'> {t('privacy_policy')}</span> {t('applies')}.
                        </div>
                    </div>
                </div>
            </div>
            
        </GuestLayout>
    )
}