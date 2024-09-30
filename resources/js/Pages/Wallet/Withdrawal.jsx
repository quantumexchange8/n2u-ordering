import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { ChevronLeft, ChevronRight, ChevronRight2, CommIcon, EditIcon, LanguageIcon, LogOutIcon, MinusIcon, OrderIcon, PasswordIcon, PlusIcon, PointIcon, ProfileIcon2, QRCodeIcon, VIPIcon, VoucherIcon, WalletIcon, XIcon, XIcon2 } from "@/Components/Icon/Outline";
import Button from "@/Components/Button";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState } from "react";
import { useEffect } from "react";
import { formatDateTime } from "@/Composables";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { InputNumber } from 'primereact/inputnumber';
import toast from "react-hot-toast";
import { CustomToaster } from "@/Components/CustomToaster";
import { useTranslation } from "react-i18next";

const fixAmount = [
    {value: 10},
    {value: 50},
    {value: 100},
    {value: 300},
    {value: 500},
]

export default function Withdrawal({ cashWallet }) {
    const { t } = useTranslation();
    
    const [isLoading, setIsLoading] = useState(true);

    const handleBack = () => {
        window.history.back(); // Go back in the browser history
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        amount: '',
    });

    const handleAmountSelection = (value) => {
        setData('amount', value);
    };

    const submit = (e) => {
        e.preventDefault();
        post('submitWithdraw', {
            preserveScroll: true,
            onSuccess: () => {
                setIsLoading(false);
                reset();
                
                toast.success('Succesfully submitted.', {
                    title: 'Succesfully submitted.',
                    description: 'Withdrawal amount is being proccessing.',
                    duration: 3000,
                    variant: 'variant1',
                });
            }
        });
    }

    return (
        <>
            <CustomToaster />
            <div className="w-full flex justify-center">
                <div className="max-w-md w-full flex flex-col min-h-[80vh] overflow-auto">
                    <div className="bg-white py-3 px-3 flex justify-between items-center gap-3 shadow-box">
                        <Link href={route('profile')}>
                            <div className="rounded-full bg-white w-6 h-6 p-1 flex justify-center items-center">
                                <ChevronLeft />
                            </div>
                        </Link>
                        <div className="text-neutral-900 font-bold text-sm">
                            {t('wallet_withdrawal')}
                        </div>
                        <div className="w-6 h-6">
                                
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 p-3">
                        <div className="text-neutral-900 font-bold">
                            {t('balance')} RM <span className="text-lg">{cashWallet.balance}</span>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <div className="flex flex-row items-center gap-1">
                                <InputLabel> {t('withdraw_amount')} (RM) </InputLabel> <span className="text-red-500">*</span>
                            </div>
                            <div>
                                <InputNumber 
                                    inputId="amount" 
                                    value={data.amount || ''} 
                                    onValueChange={(e) => setData('amount', e.value)} 
                                    mode="currency" 
                                    currency="MYR" locale="en-MY"
                                    className="w-full font-bold border border-neutral-100 rounded-md focus:outline-none focus:ring-0"
                                />
                            </div>
                        </div>
                        {
                            data.amount > cashWallet.balance && (
                                <div className="text-xs text-error-600 font-medium">
                                    {t('withdrawal_amount_exceeded_cash_wallet_balance')}
                                </div>
                            )
                        }
                    </div>

                    <div className="p-3">
                        <Button
                            variant="black"
                            size="lg"
                            className="w-full flex justify-center"
                            onClick={submit}
                            disabled={processing || data.amount === null || data.amount === 0.00 || data.amount > cashWallet.balance}
                        >
                            {t('withdraw')}
                        </Button>
                    </div>
                </div>
            </div>

            
        </>
    )
}