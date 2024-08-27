import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { InputMask } from "primereact/inputmask";
import Button from '@/Components/Button';
import { Dropdown } from 'primereact/dropdown';
import { useEffect } from 'react';

export default function Register({ referral_code, countries }) {
    
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        phone: '',
        email: '',
        password: '',
        referral_code: referral_code,
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

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
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
            <div className="flex align-items-center gap-1 text-sm text-neutral-900 font-medium">
                <div className='max-w-40 overflow-hidden overflow-ellipsis'>{option.name}</div> <span className='text-neutral-300'>({option.dial_code})</span>
            </div>
        );
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className='flex flex-col'>
                <div className=' sticky p-3 flex justify-center'>
                    {/* <div><XIcon /></div> */}
                    <div className='text-neutral-900 text-sm font-bold'>Register Account</div>
                    {/* <div></div> */}
                </div>
            </div>
            <div className='flex flex-col gap-4 max-h-[80vh] overflow-auto'>
                <div className="flex w-full justify-center">
                    <div className="w-full max-w-md">
                        <form onSubmit={submit}>
                            <div>
                                <div className='flex items-center gap-1'>
                                    <InputLabel htmlFor="name" value="Username" /><span className='text-error-500 text-xs font-medium'>*</span>
                                </div>

                                <TextInput
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />

                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <div className='flex items-center gap-1'>
                                    <InputLabel htmlFor="email" value="Email" /><span className='text-error-500 text-xs font-medium'>*</span>
                                </div>

                                <TextInput
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />

                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="phone_number" value="Phone Number" />

                                {/* <InputMask id="phone" mask="(999) 999-9999" placeholder="(019) 999-9999" onChange={(e) => setData('phone_number', e.target.value)} className='w-full rounded-xl border-neutral-100 focus:border-primary-500 focus:outline-none focus:ring-0'></InputMask> */}
                                <div className='flex items-center gap-2'>
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
                                            placeholder="e.g. 123456789"
                                            onChange={(e) => setData('phone', e.target.value)}
                                        />

                                </div>
                                <InputError message={errors.phone} className="mt-2" />
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
                                <Button size='sm' className="w-full flex justify-center" disabled={processing || !data.name || !data.phone || !data.password} >
                                    Register
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='py-3 flex flex-col gap-1'>
                    <div className='flex flex-col gap-3'>
                        <Link href={route('login')}>
                            <Button
                                variant='black'
                                size='sm'
                                className='flex justify-center w-full'
                                disabled={false}
                            >
                                Back to Log In
                            </Button>
                        </Link>
                    </div>
                    {/* <div className='text-neutral-500 text-xss leading-7'>
                        By continuing,  you agree to Our <span className='text-primary-500'>User Agreement</span> and <span className='text-primary-500'>Privacy Policy</span> applies.
                    </div> */}
                </div>
            </div>
            
        </GuestLayout>
    );
}
