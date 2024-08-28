import Button from "@/Components/Button";
import { ChevronRight, ChevronRight2, EditIcon, LanguageIcon, LogOutIcon, MinusIcon, OrderIcon, PasswordIcon, PlusIcon, PointIcon, ProfileIcon2, QRCodeIcon, VoucherIcon, WalletIcon, XIcon2 } from "@/Components/Icon/Outline";
import Modal from "@/Components/Modal";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, useForm } from "@inertiajs/react";
import React from "react";
import { useState } from "react";
import { InputNumber } from 'primereact/inputnumber';
import { useEffect } from "react";
import { CustomToaster } from "@/Components/CustomToaster";
import toast from "react-hot-toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { LogoutImg } from "@/Components/Icon/Illustration";

export default function Profile({ auth, rank, cashWallet, dineInWallet  }) {
    
    const [isOpen, setIsOpen] = useState(false)
    const [withdrawOpen, setWithdrawOpen] = useState(false)
    const [value2, setValue2] = useState(10.00);
    const [isLoading, setIsLoading] = useState(true);

    const topUp = () => {
        setIsOpen(true)
    }

    const closeTopUp = () => {
        setIsOpen(false)
    }

    const withdraw = () => {
        setWithdrawOpen(true)
    }

    const closeWithdraw = () => {
        setWithdrawOpen(false)
    }

    const { data, setData, post, processing, errors, reset } = useForm({
        amount: value2,
    });

    useEffect(() => {
        setData('amount', value2);
    }, [value2]);

    const handleInputChange = (e) => {
        const newValue = e.value;
        setValue2(newValue);
        setData('amount', newValue); // Update form data directly
    };

    const submit = (e) => {
        e.preventDefault();
        post('topUpWallet', {
            preserveScroll: true,
            onSuccess: () => {
                closeTopUp();
                setIsLoading(false);
                reset();
                
                toast.success('Succesfully submitted.', {
                    title: 'Succesfully submitted.',
                    description: 'Deposit amount is being proccessing.',
                    duration: 3000,
                    variant: 'variant1',
                });
            }
        })
    }

    const submitWithdraw = (e) => {
        e.preventDefault();

    }

    const Logout = () => {

        confirmDialog({
            group: 'Logout',
            message: 'We hope you enjoyed your time with us! If you log out now, you’ll need to sign back in to access your account. Do you still want to log out?',
            header: 'Are you sure you want to log out?',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept: confirmLogout,
            reject: cancelLogout,
            
        });
    }

    const confirmLogout = async () => {
        
        LogoutFunction();
    }

    const cancelLogout = () => {
        
    }

    const LogoutFunction = () => {
        post(route('logout'), {
            method: 'POST',
            preserveScroll: true,
            onSuccess: () => {
                toast.success('You’ve successfully log out.', {
                    title: 'You’ve successfully log out.',
                    duration: 3000,
                    variant: 'variant1',
                });
            }
        }
    );
    }

    return (
        <>
            <CustomToaster />
            <div className="w-full flex justify-center">
                <div className="max-w-md w-full flex flex-col gap-32 min-h-[80vh] overflow-auto">
                    <div className="h-56 bg-primary-500 pt-3 px-3 flex flex-col gap-3">
                        <div className="rounded-full bg-white w-6 h-6 p-2 flex justify-center items-center">
                            <Link href={route('dashboard')}>
                                <XIcon2 />
                            </Link>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex flex-col">
                                <div className="text-xs text-white">Welcome to N2U Malaysia 👋</div>
                                <div className="text-lg font-bold text-white">
                                    {auth.user.name}
                                </div>
                            </div>
                            <Link href={route('profile.edit')} >
                                <div className="w-11 h-11 rounded-full relative bg-primary-200 flex items-center justify-center">
                                    <ProfileIcon2 />

                                    <div className="absolute top-[-2px] right-[-4px]">
                                        <EditIcon />
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="bg-black p-5 rounded-[20px] flex flex-col gap-3">
                            <div className="flex justify-between">
                                <div className="flex flex-col">
                                    <div className="text-neutral-300 text-xs font-medium">Credit Balance (RM)</div>
                                    <div className="text-white text-lg font-bold">{dineInWallet.balance}</div>
                                </div>
                                <Link href={route('deposit')} className="flex">
                                    <Button variant="white" size="sm" iconOnly className="flex gap-2 px-4">
                                        <PlusIcon />
                                        <span className="text-sm font-bold">Top Up</span>
                                    </Button>
                                </Link>
                            </div>
                            <div className="h-[1px] bg-zinc-600"></div>
                            <div className="flex justify-between">
                                <div className="flex flex-col">
                                    <div className="text-neutral-300 text-xs font-medium">Cash Wallet (RM)</div>
                                    <div className="text-white text-lg font-bold">{cashWallet.balance}</div>
                                </div>
                                <Link href={route('withdrawal')} className="flex">
                                    <Button variant="white" size="sm" iconOnly className="flex gap-2 px-4">
                                        <MinusIcon />
                                        <span className="text-sm font-bold">Withdraw</span>
                                    </Button>
                                </Link>
                            </div>
                            <div className="h-[1px] bg-zinc-600"></div>
                            <div className="flex items-center gap-5">
                                <div className="flex flex-col w-full">
                                    <div className="text-neutral-300 text-xs font-medium">Points Balance</div>
                                    <div className="text-white text-lg font-bold">{auth.user.point} pts</div>
                                </div>
                                <div className="w-[1px] h-full bg-neutral-600"></div>
                                <div className="flex flex-col w-full">
                                    <Link href={route('ranking')} classID="w-full">
                                        <div className="text-neutral-300 text-xs font-medium">Ranking</div>
                                        <div className="flex items-center gap-5">
                                            <div className="flex items-center gap-3">
                                                <div className="text-white text-lg font-bold">{rank.name}</div>
                                            </div>
                                            <div>
                                                <ChevronRight />
                                            </div>
                                        </div>
                                    
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col px-3">
                        <Link href={route('wallet')}>
                            <div className="border-b-[0.5px] border-neutral-100 py-3 flex items-center gap-3">
                                <div><WalletIcon /></div>
                                <div className="w-full text-neutral-900 text-sm font-bold">Wallet Transactions</div>
                                <div><ChevronRight2 /></div>
                            </div>
                        </Link>
                        <div className="border-b-[0.5px] border-neutral-100 py-3 flex items-center gap-3 cursor-not-allowed opacity-50">
                            <div><OrderIcon /></div>
                            <div className="w-full text-neutral-900 text-sm font-bold">Order History</div>
                            <div><ChevronRight2 /></div>
                        </div>
                        {rank.name !== 'Normal' ? (
                            <Link href={route('referral')}>
                                <div className="border-b-[0.5px] border-neutral-100 py-3 flex items-center gap-3 cursor-pointer">
                                    <div className="w-5 h-5"><QRCodeIcon /></div>
                                    <div className="w-full text-neutral-900 text-sm font-bold">Invite Your Friend</div>
                                    <div><ChevronRight2 /></div>
                                </div>
                            </Link>
                        ) : (
                            <div className="border-b-[0.5px] border-neutral-100 py-3 flex items-center gap-3 cursor-not-allowed opacity-50">
                                <div className="w-5 h-5"><QRCodeIcon /></div>
                                <div className="w-full text-neutral-900 text-sm font-bold">Invite Your Friend</div>
                                <div><ChevronRight2 /></div>
                            </div>
                        )}
                        <Link href={route('voucher')}>
                            <div className="border-b-[0.5px] border-neutral-100 py-3 flex items-center gap-3">
                                <div><VoucherIcon /></div>
                                <div className="w-full text-neutral-900 text-sm font-bold">My Vouchers</div>
                                <div><ChevronRight2 /></div>
                            </div>
                        </Link>
                        <Link href={route('point-history')}>
                            <div className="border-b-[0.5px] border-neutral-100 py-3 flex items-center gap-3">
                                <div><PointIcon /></div>
                                <div className="w-full text-neutral-900 text-sm font-bold">Points History</div>
                                <div><ChevronRight2 /></div>
                            </div>
                        </Link>
                        <div className="border-b-[0.5px] border-neutral-100 py-3 flex items-center gap-3 cursor-not-allowed opacity-50">
                            <div><LanguageIcon /></div>
                            <div className="w-full text-neutral-900 text-sm font-bold">Language</div>
                            <div><ChevronRight2 /></div>
                        </div>
                        <Link href={route('change-password')}>
                            <div className="border-b-[0.5px] border-neutral-100 py-3 flex items-center gap-3">
                                <div><PasswordIcon /></div>
                                <div className="w-full text-neutral-900 text-sm font-bold">Change Password</div>
                                <div><ChevronRight2 /></div>
                            </div>
                        </Link>
                        <div className="border-b-[0.5px] border-neutral-100 py-3 flex items-center gap-3 cursor-pointer" onClick={() => Logout()}>
                            <div><LogOutIcon /></div>
                            <div className="w-full text-left text-neutral-900 text-sm font-bold">Log Out</div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isOpen}
                close={closeTopUp}
                title='Top up'
                footer={
                    <div className="flex justify-end gap-5 ">
                        <Button
                            size="sm"
                            variant="white"
                            className="md:min-w-[156px] flex justify-center"
                            onClick={closeTopUp}
                        >
                            Cancel
                        </Button>
                        <Button
                            size="sm"
                            className="md:min-w-[156px] flex justify-center"
                            type="submit"
                            onClick={submit}
                            disabled={processing}
                        >
                            Submit
                        </Button>
                    </div>
                }
            >
                <div className="w-full min-h-20 px-5">
                    <InputNumber 
                        inputId="horizontal-buttons" 
                        value={value2} 
                        onValueChange={handleInputChange} 
                        showButtons 
                        buttonLayout="horizontal" 
                        step={10.00}
                        min={0.00}
                        decrementButtonClassName="p-button-danger" incrementButtonClassName="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        mode="currency" currency="MYR" locale="en-MY"
                        className="w-full"
                    />
                </div>
            </Modal>

            <Modal
                isOpen={withdrawOpen}
                close={closeWithdraw}
                title='Withdraw'
                footer={
                    <div className="flex justify-end gap-5 ">
                        <Button
                            size="sm"
                            variant="white"
                            className="md:min-w-[156px] flex justify-center"
                            onClick={closeWithdraw}
                        >
                            Cancel
                        </Button>
                        <Button
                            size="sm"
                            className="md:min-w-[156px] flex justify-center"
                            type="submit"
                            onClick={submitWithdraw}
                            disabled={processing}
                        >
                            Submit
                        </Button>
                    </div>
                }
            >

            </Modal>

            <ConfirmDialog 
                group="Logout"
                content={({ headerRef, contentRef, footerRef, hide, message }) => (
                    <div className="relative flex flex-col gap-6 items-center p-5 rounded-lg border border-primary-200 max-w-[336px] bg-white">
                        <div>
                            <LogoutImg />
                        </div>
                        <div className='flex flex-col gap-3 items-center'>
                            <div className="font-bold text-center text-base text-neutral-900 font-sf-pro select-none" ref={headerRef}>
                                {message.header}
                            </div>
                            <div className='text-neutral-500 text-xs font-sf-pro text-center select-none' ref={contentRef}>
                                {message.message}
                            </div>
                        </div>
                        <div className="w-full flex items-center gap-2 " ref={footerRef}>
                            <Button
                                onClick={(event) => {
                                    hide(event);
                                    cancelLogout();
                                }}
                                size='sm'
                                variant='white'
                                className="w-full flex justify-center font-sf-pro"
                            >Cancel</Button>
                            <Button
                                onClick={(event) => {
                                    hide(event);
                                    confirmLogout();
                                }}
                                variant="red"
                                size='sm'
                                className="w-full flex justify-center font-sf-pro"
                            >Logout</Button>
                            
                        </div>
                    </div>
                )}
            />
        </>
    )
}