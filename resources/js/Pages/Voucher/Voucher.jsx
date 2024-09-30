import { ChevronLeft } from "@/Components/Icon/Outline";
import { Link } from "@inertiajs/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import AllVoucher from "./Partials/AllVoucher";
import UserVoucher from "./Partials/UserVoucher";
import { useTranslation } from "react-i18next";

export default function Voucher({ user }) {
    const { t } = useTranslation();

    return (
        <>
            <div className="w-full flex justify-center">
                <div className="max-w-md w-full flex flex-col min-h-[80vh] overflow-auto">
                    <div className="bg-white py-3 px-3 flex justify-between items-center gap-3 shadow-box">
                        <Link href={route('profile')}>
                            <div className="rounded-full bg-white w-6 h-6 p-1 flex justify-center items-center">
                                <ChevronLeft />
                            </div>
                        </Link>
                        <div className="text-neutral-900 font-bold text-sm">
                            {t('vouchers')}
                        </div>
                        <div className="w-6 h-6">
                                
                        </div>
                    </div>

                    <div className="py-3">
                        <TabGroup className='flex flex-col'>
                            <TabList className="flex justify-center px-3 w-full">
                                <div className='bg-transparent w-full'>
                                    <Tab
                                        className="w-1/2 py-2 px-3 text-xs text-neutral-300 font-bold focus:outline-none data-[selected]:bg-white data-[selected]:text-primary-500 data-[selected]:border-b-2 data-[selected]:border-primary-500"
                                    >
                                        <span className='px-1.5'>N2U {t('vouchers')}</span>
                                    </Tab>
                                    <Tab
                                        className="w-1/2 py-2 px-3 text-xs text-neutral-300 font-bold focus:outline-none data-[selected]:bg-white data-[selected]:text-primary-500 data-[selected]:border-b-2 data-[selected]:border-primary-500"
                                    >
                                        <span className='px-2.5'>{t('my_vouchers')}()</span>
                                    </Tab>
                                </div>
                            </TabList>
                            <TabPanels>
                                    <TabPanel className="p-4">
                                        <AllVoucher user={user} />
                                    </TabPanel>
                                    <TabPanel className="bg-neutral-100 p-4">
                                        <UserVoucher />
                                    </TabPanel>
                                </TabPanels>
                        </TabGroup>
                    </div>
                </div>
            </div>
        </>
    )
}