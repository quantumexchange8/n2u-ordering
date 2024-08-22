import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head, useForm } from '@inertiajs/react';
import { CustomToaster } from '@/Components/CustomToaster';
import toast from 'react-hot-toast';
import { ChevronLeft } from '@/Components/Icon/Outline';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Button from '@/Components/Button';
import InputError from '@/Components/InputError';
import { useState } from 'react';

export default function Edit({ auth, mustVerifyEmail, status }) {

    const [isLoading, setIsLoading] = useState(true);

    const handleBack = () => {
        window.history.back(); // Go back in the browser history
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        name: auth.user.name,
        phone: auth.user.dial_code + auth.user.phone,
        email: auth.user.email || '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('updateProfile', {
            preserveScroll: true,
            onSuccess: () => {
                setIsLoading(false);
                reset();
                
                toast.success('Succesfully updated.', {
                    title: 'Succesfully updated.',
                    duration: 3000,
                    variant: 'variant3',
                });
            }
        });
    }

    return (
        <>
            <CustomToaster />
            <Head title="Profile" />

            <div className="w-full flex justify-center">
                <div className="max-w-md w-full flex flex-col min-h-[80vh] overflow-auto">
                    <div className="bg-primary-500 py-3 px-3 flex justify-between items-center gap-3">
                        <div className="rounded-full bg-white w-6 h-6 p-1 flex justify-center items-center" onClick={handleBack}>
                            <ChevronLeft />
                        </div>
                        <div className="text-neutral-900 font-bold text-sm">
                            Edit Profile
                        </div>
                        <div className="w-6 h-6">
                            
                        </div>
                    </div>

                    <div className='p-5 flex flex-col gap-3'>
                        <div>
                            <img src="" alt="" />
                        </div>
                        <form onSubmit={submit}>
                            <div className='flex flex-col gap-3'>
                                <div className='flex flex-col space-y-2'>
                                    <InputLabel value='Name' />

                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                    <InputError className="mt-2" message={errors.name} />
                                </div>
                                <div className='flex flex-col space-y-2'>
                                    <InputLabel value='Phone' />

                                    <TextInput 
                                        id="name"
                                        type="text"
                                        name="name"
                                        disabled
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                    />
                                </div>
                                <div className='flex flex-col space-y-2'>
                                    <InputLabel value='Email' />

                                    <TextInput 
                                        type='email'
                                        id="email"
                                        name="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    <InputError className="mt-2" message={errors.email} />
                                </div>
                                <div className='flex flex-col space-y-2'>
                                    <Button
                                        size='lg'
                                        className='flex justify-center'
                                        disabled={processing}
                                        type='submit'
                                    >
                                        Save Changes
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
