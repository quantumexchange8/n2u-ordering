<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Member;
use App\Models\Otp;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Session;
use Twilio\Rest\Client;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'nickname' => 'required|string|max:255',
            'phone_number' => ['required'],
            'password' => ['required', Rules\Password::defaults()],
        ]);

        $rawPhone = $request->input('phone_number');
        $formattedPhone = preg_replace('/\D/', '', $rawPhone);
        $formattedPhone = '+60' . $formattedPhone;
        $formattedPhone = preg_replace('/^\+60(0)/', '+60', $formattedPhone);

        $otp = rand(000001, 999999);
        Cache::put('otp_' . $formattedPhone, $otp, now()->addMinutes(5));

        Session::put('register_data', [
            'nickname' => $request->nickname,
            'phone_number' => $formattedPhone,
        ]);

        $storeOtp = Otp::create([
            'otp' => $otp,
            'phone_number' => $formattedPhone,
            'expired_at' => now()->addMinutes(5),
        ]);

        $twilio = new Client(env('TWILIO_SID'), env('TWILIO_AUTH_TOKEN'));
        $twilio->messages->create(
            $formattedPhone,
            [
                'from' => env('TWILIO_PHONE_NUMBER'),
                'body' => "Your OTP code is: $otp"
            ]
        );

        $user = Member::create([
            'username' => $request->nickname,
            'phone' => $request->phone_number,
            'password' => Hash::make($request->password),
        ]);

        // event(new Registered($user));

        // Auth::login($user);

        // return redirect(route('dashboard', absolute: false));
        return redirect(route('otp'));
    }
}
