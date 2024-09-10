import React, { useEffect, useState } from "react";
import GuestLayout from '@/Layouts/GuestLayout';
import { XIcon } from '@/Components/Icon/Outline';
import { InputOtp } from 'primereact/inputotp';
import { Link, useForm } from "@inertiajs/react";
import Button from "@/Components/Button";

export default function Otp({ phone }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        otp: '',
        phone: phone,
    });

    // useEffect(() => {
        
    //     if (data.otp.length === 6) {
    //         submit(); // Auto-submit when OTP length is 6
    //     }
    // }, [data.otp]);

    const submit = (e) => {
        e.preventDefault();
        post(route('verify.otp'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            }
        });

    }

    return (
        <GuestLayout>
            <div className="flex flex-col py-3 px-4">
                <div className='sticky p-3 flex justify-center'>
                    <div className='text-neutral-900 text-sm font-bold'>Code Verification</div>
                </div>
                <form onSubmit={submit}>
                    <div className="flex flex-col gap-5">
                        <div className="text-xl font-bold text-neutral-900">
                            +{phone}
                        </div>
                        <div className="flex flex-col justify-center">
                            
                                <InputOtp 
                                    value={data.otp} 
                                    onChange={(e) => setData('otp', e.value)} 
                                    integerOnly 
                                    length={6} 
                                    pt={{
                                        input: 'border-primary-500'
                                    }}
                                />
                                {errors.otp && <span className="text-red-500">{errors.otp}</span>}
                        </div>

                        <div className="flex justify-between items-center">
                            <div>
                                <Link href={route('login')}>
                                    <Button variant="white" size="sm">
                                        Back to login
                                    </Button>
                                </Link>
                            </div>
                            <div>
                                <Button
                                    size="sm"
                                    disabled={processing}
                                    type="submit"
                                >
                                    Verify
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </GuestLayout>
    )
}