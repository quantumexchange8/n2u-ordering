import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { InputMask } from "primereact/inputmask";
import Button from '@/Components/Button';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        nickname: '',
        phone_number: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        // <GuestLayout>
        //     <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <div className='flex items-center gap-1'>
                        <InputLabel htmlFor="nickname" value="Nickname" /><span className='text-error-500 text-xs font-medium'>*</span>
                    </div>

                    <TextInput
                        id="nickname"
                        name="nickname"
                        type="text"
                        value={data.nickname}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('nickname', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="phone_number" value="Phone Number" />

                    <InputMask id="phone" mask="(999) 999-9999" placeholder="(019) 999-9999" onChange={(e) => setData('phone_number', e.target.value)} className='w-full rounded-xl border-neutral-100 focus:border-primary-500 focus:outline-none focus:ring-0'></InputMask>

                    <InputError message={errors.phone_number} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">

                    <Button size='sm' className="w-full flex justify-center" disabled={processing || !data.nickname || !data.phone_number || !data.password} >
                        Register
                    </Button>
                </div>
            </form>
        // </GuestLayout>
    );
}
