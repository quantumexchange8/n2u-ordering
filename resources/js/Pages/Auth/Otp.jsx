import React, { useEffect, useState } from "react";
import GuestLayout from '@/Layouts/GuestLayout';
import { XIcon } from '@/Components/Icon/Outline';
import { InputOtp } from 'primereact/inputotp';
import { Link, useForm } from "@inertiajs/react";

export default function Otp({ phone }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        otp: '',
        phone: phone,
    });

    useEffect(() => {
        
        if (data.otp.length === 6) {
            submit(); // Auto-submit when OTP length is 6
        }
    }, [data.otp]);

    const submit = (e) => {
        post(route('verify.otp'));

    }

    return (
        <GuestLayout>
            <div className="flex flex-col py-3 px-4">
                <div className='sticky p-3 flex justify-center'>
                    <div className='text-neutral-900 text-sm font-bold'>Code Verification</div>
                </div>
                <div className="flex flex-col gap-5">
                    <div className="text-xl font-bold text-neutral-900">
                        +{phone}
                    </div>
                    <div className="flex justify-center">
                        <form onSubmit={submit}>
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
                        </form>
                    </div>

                    <div>
                        <Link href={route('login')}>
                                Back to login
                        </Link>
                    </div>
                </div>
            </div>
        </GuestLayout>
    )
}