import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { ChevronLeft, ChevronRight, ChevronRight2, CommIcon, CopyIcon, EditIcon, LanguageIcon, LogOutIcon, MinusIcon, OrderIcon, PasswordIcon, PlusIcon, PointIcon, ProfileIcon2, QRCodeIcon, VIPIcon, VoucherIcon, WalletIcon, XIcon2 } from "@/Components/Icon/Outline";
import Button from "@/Components/Button";
import { QRCode } from 'react-qrcode-logo';
import { useTranslation } from "react-i18next";

export default function Referral({ auth }) {
    const { t } = useTranslation();

    const [tooltipText, setTooltipText] = useState('copy');

    const handleBack = () => {
        window.history.back(); // Go back in the browser history
    };

    const url = window.location.origin + '/register/' + auth.user.referral_code

    const handleCopy = (urlVal) => {
        const textToCopy = urlVal;
        navigator.clipboard.writeText(textToCopy).then(() => {
            setTooltipText('Copied!');
            console.log('Copied to clipboard:', textToCopy);

            // Revert tooltip text back to 'copy' after 2 seconds
            setTimeout(() => {
                setTooltipText('copy');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    };

    return (
        <div className="flex justify-center">
            <div className="max-w-md w-full flex flex-col gap-8 min-h-[80vh] overflow-auto">
                <div className="h-40 bg-primary-500 pt-3 px-3 flex flex-col gap-3">
                    <div className="rounded-full bg-white w-6 h-6 p-1 flex justify-center items-center" onClick={handleBack}>
                        <ChevronLeft />
                    </div>
                    <div className="bg-primary-200 p-5 rounded-[20px] flex flex-col gap-3">
                        <div className="font-bold text-lg">
                        {t('referral_code')}
                        </div>
                        <div className="flex flex-col items-center w-full gap-4 ">
                            <div className="p-3 bg-white rounded-xl">
                                <QRCode 
                                    value={url} 
                                    fgColor="#000000"
                                />
                            </div>
                            <div className="border border-neutral-200 rounded-lg px-3 py-2 text-black font-bold flex items-center gap-2 bg-white w-full">
                                <div className="overflow-hidden overflow-ellipsis">
                                    {url}
                                </div>
                                <div className="cursor-pointer" onClick={() => handleCopy(url)}>
                                    <CopyIcon />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    
                    <div>

                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}