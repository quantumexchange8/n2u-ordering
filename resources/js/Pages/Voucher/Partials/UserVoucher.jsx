import Button from "@/Components/Button";
import { UserVoucherImg } from "@/Components/Icon/Illustration";
import { VoucherIconLeft, VoucherIconRight, XIcon } from "@/Components/Icon/Outline";
import Modal from "@/Components/Modal";
import { formatDate } from "@/Composables";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function UserVoucher() {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const [tooltipText, setTooltipText] = useState('copy');

    const fetchData = async () => {
        try {

            const response = await axios.get('/getUserVoucher');
            
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

    const voucherDetails = (voucherVal) => {
        setIsOpen(true)
        setSelectedVoucher(voucherVal)
        // console.log(voucherVal)
    }

    const closeVOucher = (voucherVal) => {
        setIsOpen(false)
    }

    const handleCopy = (code) => {
        const textToCopy = code;
        navigator.clipboard.writeText(textToCopy).then(() => {
            setTooltipText('Code Copied!');

            // Revert tooltip text back to 'copy' after 2 seconds
            setTimeout(() => {
                setTooltipText('copy');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    }
    
    return (
        <div className="flex flex-col gap-3">
            {
                data.length > 0 ? (
                    data.map((voucher, index) => (
                        <div key={index} className="flex items-center bg-neutral-100">
                            <div ><VoucherIconLeft /></div>
                            <div className="flex items-center gap-5 py-4 bg-white w-full">
                                <div className="p-1 w-12 h-10 "><img src="/assets/logoicon.png" alt="" /></div>
                                <div className="flex items-center gap-3 w-full py-1.5">
                                    <div className="flex flex-col w-full">
                                        <div className="w-full text-neutral-900 text-sm font-bold">{voucher.vouchers.name}</div>
                                        <div className="text-neutral-300 text-xs">{voucher.vouchers.valid_to ? formatDate(voucher.vouchers.valid_to) : 'No expiry date'}</div>
                                    </div>
                                    <div className="">
                                        <Button
                                            variant="black"
                                            size="sm"
                                            className="py-2"
                                            onClick={() => voucherDetails(voucher)}
                                        >
                                            use
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div><VoucherIconRight /></div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center">
                        <div>
                            <UserVoucherImg />
                        </div>
                        <div className="flex flex-col gap-2 items-center">
                            <div className="text-neutral-900 text-base font-bold">
                                No Vouchers Available
                            </div>
                            <div className="text-neutral-500 text-xs text-center">
                                Looks like you don’t have any vouchers at the moment. Check back soon or keep earning points to unlock exciting offers!
                            </div>
                        </div>
                    </div>
                )
            }

            <Modal
                title=''
                maxWidth='xl'
                maxHeight='xl' 
                isOpen={isOpen} close={closeVOucher}
                closeIcon={<XIcon />}
                footer={
                    <div className="text-neutral-300 text-xs text-center">
                        Copy and paste this voucher code at order confirmation page to enjoy the deals!
                    </div>
                }
            >
                {
                    selectedVoucher && (
                        <div className="flex flex-col items-center gap-2">
                            <div className="flex flex-col p-3 gap-5 items-center w-full border-b border-neutral-100">
                                <div className="w-[100px] h-[100px] border-[0.5px] border-neutral-100">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png" alt="" />
                                </div>
                                <div className="flex flex-col gap-3 w-full">
                                    <div className="flex flex-col items-center">
                                        <div className="text-neutral-900 font-bold text-sm">{selectedVoucher.vouchers.name}</div>
                                        <div className="text-neutral-300 text-xs">Expired on {selectedVoucher.vouchers.valid_to ? formatDate(selectedVoucher.vouchers.valid_to) : 'All Time'}</div>
                                    </div>
                                    <div className="text-neutral-900 text-xs w-full px-3" dangerouslySetInnerHTML={{ __html: selectedVoucher.vouchers.description }}></div>
                                </div>
                            </div>

                            <div className=" w-full flex justify-center p-3">
                                <div className="text-lg font-bold w-full flex justify-center rounded-full border-2 border-dashed border-neutral-100 p-2.5">
                                    {selectedVoucher.code}
                                </div>
                            </div>
                            <Button
                                size="lg"
                                variant="black"
                                className="w-full flex justify-center"
                                onClick={() => handleCopy(selectedVoucher.code)}
                            >
                                { tooltipText ? tooltipText : 'Copy Voucher Code'}
                            </Button>
                        </div>
                    )
                }

            </Modal>
        </div>
    )
}