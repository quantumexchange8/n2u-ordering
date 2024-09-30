import Button from "@/Components/Button";
import { CustomToaster } from "@/Components/CustomToaster";
import { VoucherImg } from "@/Components/Icon/Illustration";
import { XIcon } from "@/Components/Icon/Outline";
import Modal from "@/Components/Modal";
import { formatDate } from "@/Composables";
import { useForm } from "@inertiajs/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export default function AllVoucher({ user }) {

    const { t } = useTranslation();
    const [voucherVal, setVoucherVal] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState(null);

    const fetchData = async () => {
        try {

            const response = await axios.get('/getVoucher');
            
            setVoucherVal(response.data);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const voucherDetails = (voucher) => {
        setIsOpen(true)
        setData('id', voucher.id);
        setSelectedVoucher(voucher)
    }

    const closeVoucher = () => {
        setIsOpen(false)
    }

    const { data, setData, post, processing, errors, reset } = useForm({
        id: '',
    });

    const redeemProfile = (e) => {
        e.preventDefault();
        post('/redeemVoucher', {
            preserveScroll: true,
            onSuccess: () => {
                setIsLoading(false);
                reset();
                closeVoucher();
                toast.success('Succesfully Redeem.', {
                    title: 'Succesfully Redeem.',
                    duration: 3000,
                    variant: 'variant3',
                });
            }
        });
    }

    return (
        <>
        <CustomToaster />
        {
            voucherVal.length > 0 ? (
                <div className="flex flex-col gap-3">
                    {
                        voucherVal.map((voucher, index) => (
                            <div key={index} className={` ${voucher.voucher_redeem === null ? 'flex' : 'hidden'} " flex-col bg-white border border-neutral-100 rounded-[20px] shadow-input overflow-auto"`} onClick={() => voucherDetails(voucher)}>
                                <div className="">
                                    <img src="/assets/voucher.png" alt="" className="w-full rounded-t-[20px]" />
                                </div>
                                <div className="p-3 flex items-center gap-3">
                                    <div className="flex flex-col gap-1 w-full">
                                        <div className="text-neutral-500 text-xs">{t('redeem_with')}</div>
                                        <div className="text-neutral-900 text-sm font-bold">{voucher.point}</div>
                                    </div>
                                    <div className="flex flex-col gap-1 w-full">
                                        <div className="text-neutral-500 text-xs">{t('valid_until')}</div>
                                        <div className="text-neutral-900 text-sm font-bold">{voucher.valid_type === 'all_type' ? 'All time' : formatDate(voucher.valid_to)}</div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>

            ) : (
                <div className="flex flex-col items-center">
                    <div>
                        <VoucherImg />
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <div className="text-neutral-900 text-base font-bold">
                            {t('no_vouchers_yet')}
                        </div>
                        <div className="text-neutral-500 text-xs text-center">
                            {t('stay_tuned')}
                        </div>
                    </div>
                </div>
            )
        }
            
            <Modal
                title={t('voucher_details')}
                maxWidth='xl'
                maxHeight='xl' 
                isOpen={isOpen} close={closeVoucher}
                closeIcon={<XIcon />}
                footer={
                    <div className="flex justify-end gap-5 ">
                        <Button
                            size="sm"
                            className="flex justify-center w-full"
                            type="submit"
                            onClick={redeemProfile}
                            disabled={processing || selectedVoucher && (user.point < selectedVoucher.point) }
                            variant="black"
                        >
                            <span className="px-2">{t('redeem_with')} {selectedVoucher &&(selectedVoucher.point)}pts</span>
                        </Button>
                    </div>
                }
            >
                {
                    selectedVoucher && (
                        <div className="p-3 flex flex-col gap-3">
                            <div>
                                <img src="/assets/voucher.png" alt="" className="w-full" />
                            </div>
                            <div className="flex flex-col items-center gap-3 box-border">
                                <div className="flex flex-col gap-1 items-center">
                                    <div className="text-neutral-900 font-bold text-sm">{selectedVoucher.name}</div>
                                    <div className="text-neutral-300 text-xs ">Expired on{selectedVoucher.valid_to !== null ? formatDate(selectedVoucher.valid_to) : null}</div>
                                </div>
                                <div className="text-neutral-900 text-xs w-full px-3" dangerouslySetInnerHTML={{ __html: selectedVoucher.description }}></div>
                            </div>
                        </div>
                    )
                }

            </Modal>

        
        </>
    )
}