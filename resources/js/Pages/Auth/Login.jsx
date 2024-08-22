import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import Button from '@/Components/Button';
import { Switch } from '@headlessui/react'
import { useEffect, useState } from 'react';
import InputIconWrapper from '@/Components/InputIconWrapper';
import { EyeOff, EyeOn } from '@/Components/Icon/outline';
import { Dropdown } from 'primereact/dropdown';

export default function Login({ status, canResetPassword, countries }) {

    const [showPassword, setShowPassword ] = useState(false);
    // const [dialCode, setDialCode] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        phone: '',
        password: '',
        remember: false,
        type: 'member',
        dialCode: null,
    });

    useEffect(() => {
        // Ensure dialCode is set in useForm on component mount
        const defaultCountry = countries.find(country => country.dial_code === '+60');
        if (defaultCountry) {
            setData('dialCode', defaultCountry);
        }
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const selectedCountryTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div>{option.dial_code}</div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const countryOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <div className='text-sm text-neutral-900 font-medium'>{option.name} <span className='text-neutral-300'>({option.dial_code})</span></div>
            </div>
        );
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className='flex flex-col'>
                <div className=' sticky p-3 flex justify-center'>
                    {/* <div><XIcon /></div> */}
                    <div className='text-neutral-900 text-sm font-bold'>Member Account</div>
                    {/* <div></div> */}
                </div>
            </div>
            <div className='flex flex-col gap-4 max-h-[80vh] overflow-auto'>
                <div className="flex w-full justify-center">
                    <div className="w-full max-w-md">
                        <form onSubmit={submit}>
                            <div className='flex flex-col space-y-1'>
                                <InputLabel htmlFor="phone" value="Phone Number" />

                                <div className='flex items-center gap-2 '>
                                    <Dropdown 
                                        value={data.dialCode} 
                                        onChange={(e) => setData('dialCode', e.value)} 
                                        options={countries} 
                                        optionLabel="name" 
                                        placeholder="Select a City" 
                                        className="" 
                                        valueTemplate={selectedCountryTemplate}
                                        itemTemplate={countryOptionTemplate}
                                        filter
                                        pt={{
                                            root: 'border border-neutral-100 rounded-xl shadow-input focus:border-black',
                                            panel: 'left-[20px]'
                                        }}
                                    />
                                    <TextInput
                                        id="phone"
                                        type="number"
                                        name="phone"
                                        value={data.phone}
                                        className="block w-3/4"
                                        isFocused={true}
                                        onChange={(e) => setData('phone', e.target.value)}
                                    />
                                </div>

                                <InputError message={errors.phone} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="password" value="Password" />

                                <InputIconWrapper>
                                    <TextInput
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        autoComplete="current-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    <div className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <EyeOff /> : <EyeOn /> }
                                    </div>
                                </InputIconWrapper>
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div className="flex items-center justify-between mt-4">
                                <label className="flex items-center">
                                    <Switch
                                        checked={data.remember}
                                        onChange={(checked) => setData('remember', checked)}
                                        className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-gray-100 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-primary-500"
                                    >
                                        <span
                                            aria-hidden="true"
                                            className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
                                        />
                                    </Switch>
                                    <span className="ms-2 text-sm text-gray-600">Remember me</span>
                                </label>
                                <Link
                                    href={route('password.request')}
                                    className="text-xs text-primary-500 rounded-md focus:outline-none"
                                >
                                    Forgot password
                                </Link>
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <Button className="flex justify-center w-full" size='sm' disabled={processing}>
                                    Log in
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='py-3 flex flex-col gap-1'>
                    <div className='flex flex-col gap-3'>
                        <Link href={route('register')}>
                            <Button
                                variant='white'
                                size='sm'
                                className='flex justify-center w-full'
                                disabled={false}
                            >
                                Register
                            </Button>
                        </Link>
                        <Button
                            variant='black'
                            size='sm'
                            className='flex justify-center'
                            disabled={true}
                        >
                            Continue as guest
                        </Button>
                    </div>
                    <div className='text-neutral-500 text-xss leading-7'>
                        By continuing,  you agree to Our <span className='text-primary-500'>User Agreement</span> and <span className='text-primary-500'>Privacy Policy</span> applies.
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
