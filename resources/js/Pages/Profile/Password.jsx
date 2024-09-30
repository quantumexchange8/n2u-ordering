import Button from "@/Components/Button";
import { CustomToaster } from "@/Components/CustomToaster";
import { ChevronLeft, EyeOff, EyeOn } from "@/Components/Icon/Outline";
import InputError from "@/Components/InputError";
import InputIconWrapper from "@/Components/InputIconWrapper";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Link, useForm } from "@inertiajs/react";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export default function Password() {
    const { t } = useTranslation();
    const [showPassword, setShowPassword ] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword ] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
        password_confirmation: ''
    });

    const submitForm = (e) => {
        e.preventDefault();
    
        post('/updatePassword', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                
                toast.success('Succesfully updated.', {
                    title: 'Succesfully updated.',
                    duration: Infinity,
                    variant: 'variant3',
                });
            }
        });
    };

    return (
        <>
            <CustomToaster />
            <div className="w-full flex justify-center">
                <div className="max-w-md w-full flex flex-col min-h-[80vh] overflow-auto">
                    <div className="bg-white py-3 px-3 flex justify-between items-center gap-3 shadow-box">
                        <Link href={route('profile')}>
                            <div className="rounded-full bg-white w-6 h-6 p-1 flex justify-center items-center" >
                                <ChevronLeft />
                            </div>
                        </Link>
                        <div className="text-neutral-900 font-bold text-sm">
                            {t('change_password')}
                        </div>
                        <div className="w-6 h-6">
                                
                        </div>
                    </div>

                    <div className="flex flex-col gap-10 p-3">
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col space-y-1">
                                <InputLabel> {t('password')} </InputLabel>
                                <InputIconWrapper>
                                    <TextInput
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={data.password}
                                        className="block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    <div className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <EyeOff /> : <EyeOn /> }
                                    </div>
                                </InputIconWrapper>
                                <InputError message={errors.password} className="mt-2"/>
                            </div>
                            <div className="flex flex-col space-y-1">
                                <InputLabel> {t('confirm_password')} </InputLabel>
                                <InputIconWrapper>
                                    <TextInput
                                        id="password_confirmation"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                    />
                                    <div className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                        {showConfirmPassword ? <EyeOff /> : <EyeOn /> }
                                    </div>
                                </InputIconWrapper>
                            </div>
                        </div>
                        <div>
                            <Button 
                                size="sm"
                                className="flex justify-center w-full"
                                onClick={submitForm}
                            >
                                {t('save_password')}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}