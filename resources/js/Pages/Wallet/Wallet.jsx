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
import { UserVoucherImg } from "@/Components/Icon/Illustration";
import { useTranslation } from "react-i18next";

export default function Wallet({ auth, cashWallet, dineInWallet }) {
    const { t } = useTranslation();

    const handleBack = () => {
        window.history.back(); // Go back in the browser history
    };

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [detailModal, setDetailModal] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const fetchData = async () => {
        try {

            const response = await axios.get('/getAllTransaction');
            
            setData(response.data);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const submit = () => {

    }

    const viewDetails = (transaction) => {
        setSelectedTransaction(transaction);
        setDetailModal(true);
    }

    const closeViewDetails = () => {
        setDetailModal(false);
        setSelectedTransaction(null);
    }

    return (
        <>
            <div className="w-full flex justify-center">
                <div className="max-w-md w-full flex flex-col min-h-[80vh] overflow-auto">
                    <div className="bg-white py-3 px-3 flex justify-between items-center gap-3 shadow-box">
                        <div className="rounded-full bg-white w-6 h-6 p-1 flex justify-center items-center" onClick={handleBack}>
                            <ChevronLeft />
                        </div>
                        <div className="text-neutral-900 font-bold text-sm">
                            {t('wallet_transaction')}
                        </div>
                        <div className="w-6 h-6">
                                
                        </div>
                    </div>
                    {
                        data.length > 0 ? (
                            <div className="p-3 flex flex-col overflow-auto max-h-[80vh]">
                                {
                                    data.map((transaction, index) => (
                                        <div key={index} className="py-3 flex justify-between border-b border-neutral-100" onClick={() => viewDetails(transaction)}>
                                            <div className="flex flex-col">
                                                <div className="text-neutral-900 text-sm font-bold">
                                                    {transaction.transaction_type === 'Deposit' ? t('top_up') : transaction.transaction_type === 'Withdrawal' ? t('withdraw') : 'Refund'}
                                                </div>
                                                <div className="text-neutral-500 text-xs">
                                                    {formatDateTime(transaction.created_at)}
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                {
                                                    transaction.transaction_type === 'Deposit' ? (
                                                        <div className="text-primary-500 text-sm font-bold">
                                                            +RM{transaction.amount}
                                                        </div>
                                                    ) : (
                                                        <div className="text-neutral-900 text-sm font-bold">
                                                            -RM{transaction.amount}
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3 items-center">
                                <div>
                                    <UserVoucherImg />
                                </div>
                                <div className="text-xs text-neutral-500 flex justify-center items-center">
                                    {t('no_transaction_history_found')}
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>

            <Modal
                title={t('transaction_details')}
                maxWidth='xl'
                maxHeight='xl' 
                isOpen={detailModal} close={closeViewDetails}
                closeIcon={<XIcon />}
                
            >
                <Button>
                    
                </Button>
                {selectedTransaction && (
                    <div className="p-3 flex flex-col gap-2">
                        <div className="flex justify-between">
                            <div className="text-neutral-500 text-sm">
                                {t('transaction_type')}
                            </div>
                            <div className="font-bold text-neutral-900 text-sm">{selectedTransaction.transaction_type}</div>
                        </div>
                        <div className="flex justify-between">
                            <div className="text-neutral-500 text-sm">
                                {t('payment_method')}
                            </div>
                            <div className="font-bold text-neutral-900 text-sm">{selectedTransaction.payment_type}</div>
                        </div>
                        <div className="flex justify-between">
                            <div className="text-neutral-500 text-sm">
                                {t('date_and_time')}
                            </div>
                            <div className="font-bold text-neutral-900 text-sm">{formatDateTime(selectedTransaction.created_at)}</div>
                        </div>
                        <div className="flex justify-between">
                            <div className="text-neutral-500 text-sm">
                                {t('status')}
                            </div>
                            <div className="font-bold text-neutral-900 text-sm">{selectedTransaction.status}</div>
                        </div>
                        {
                            selectedTransaction.remark !== null && (
                                <div className="flex justify-between">
                                    <div className="text-neutral-500 text-sm">
                                        {t('remark')}
                                    </div>
                                    <div className="font-bold text-neutral-900 text-sm">{selectedTransaction.remark}</div>
                                </div>
                            ) 
                        }
                        {
                            selectedTransaction.transaction_date && (
                                <div className="flex justify-between">
                                    <div className="text-neutral-500 text-sm">
                                        {t('approval_date')}
                                    </div>
                                    <div className="font-bold text-neutral-900 text-sm">{formatDateTime(selectedTransaction.transaction_date)}</div>
                                </div>
                            ) 
                        }
                    </div>
                )}

            </Modal>
        </>
    )
}