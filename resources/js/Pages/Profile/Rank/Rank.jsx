import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { ChevronLeft, ChevronRight, ChevronRight2, CommIcon, EditIcon, LanguageIcon, LogOutIcon, MinusIcon, OrderIcon, PasswordIcon, PlusIcon, PointIcon, ProfileIcon2, QRCodeIcon, VIPIcon, VoucherIcon, WalletIcon, XIcon2 } from "@/Components/Icon/Outline";
import Button from "@/Components/Button";
import { formatDate } from "@/Composables";
import { useTranslation } from "react-i18next";

export default function Rank({ auth, rank, rankingFee, rankSubsciption, wallet, settingFee }) {
    const { t } = useTranslation();

    const handleBack = () => {
        window.history.back(); // Go back in the browser history
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        id: auth.user.id,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('subscribeRank'));
    }

    return (
        <>
            <Head title="Profile"/>
            <div className="w-full flex justify-center">
                <div className=" max-w-md w-full flex flex-col gap-8 min-h-[80vh] overflow-auto">
                    <div className="h-40 bg-primary-500 pt-3 px-3 flex flex-col gap-3">
                        <div className="rounded-full bg-white w-6 h-6 p-1 flex justify-center items-center" onClick={handleBack}>
                            <ChevronLeft />
                        </div>
                        <div className="bg-primary-200 p-5 rounded-[20px] flex flex-col gap-3">
                            <div className="flex justify-between">
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col">
                                        <div className="text-neutral-400 text-xs font-medium">{t('current_rank')}</div>
                                        <div className="text-neutral-900 text-lg font-bold">{rank.name}</div>
                                    </div>

                                    <div className="text-base font-bold">
                                        RM {settingFee.value}/{t('year')}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div>
                                        <Button
                                            variant="white"
                                            size="sm"
                                            disabled={auth.user.rank_id === '2' || processing || rankSubsciption != null || wallet.balance < settingFee.value}
                                            onClick={submit}
                                        >
                                            {t('join_member')}
                                        </Button>
                                    </div>
                                    {/* {
                                        wallet.balance < rankingFee.min_amount && (
                                            <div className="w-full flex justify-end">
                                                <div className="text-xs text-red-700 font-bold text-right max-w-24">
                                                    Insufficient Balance
                                                </div>
                                            </div>
                                        )
                                    } */}
                                </div>
                            </div>
                            <div className="h-[1px] bg-zinc-600"></div>
                            {
                                rank.name === 'VIP' && (
                                    <div className="text-sm text-neutral-700">
                                        {t('membership_valid_til')} <span className="font-bold">{formatDate(rankSubsciption.expired_date)}</span>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="flex flex-col">
                        {
                            rank.name === 'Normal' ? (
                                <div className="flex flex-col gap-4 px-3">
                                    <div className="flex flex-col">
                                        <div className="font-bold text-lg ">
                                            Reward
                                        </div>
                                        <div className="text-sm flex flex-col">
                                            <div>
                                                Join member to get <span className="font-bold">Commission</span> when you referral a new user
                                            </div>
                                            <div>
                                                {/* You can earn up more voucher in VIP */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="font-bold text-lg">How it works?</div>
                                        <div className="flex items-center justify-center gap-4">
                                            <div className="text-xs text-center flex flex-col gap-2 items-center">
                                                <div><VIPIcon/></div>
                                                <div>Become Member</div>
                                                
                                            </div>
                                            <div><ChevronRight /></div>
                                            <div className="text-xs text-center flex flex-col gap-2 items-center">
                                                <div><QRCodeIcon /></div>
                                                <div>Referral to your friend</div>
                                            </div>
                                            <div><ChevronRight /></div>
                                            <div className="text-xs text-center flex flex-col gap-2 items-center">
                                                <div><CommIcon /></div>
                                                <div>You get commission</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    
                                </div>
                            )
                        }
                        <div>

                        </div>
                        <div></div>
                    </div>
                </div>
            </div>
        </>
    )
}