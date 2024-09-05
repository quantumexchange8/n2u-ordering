<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\CommissionLog;
use App\Models\Country;
use App\Models\Member;
use App\Models\Otp;
use App\Models\Setting;
use App\Models\User;
use App\Models\Wallet;
use App\Services\RunningNumberService;
use App\Services\Sms123Service;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create($referral = null): Response
    {

        $countries = Country::get();

        return Inertia::render('Auth/Register', [
            'referral_code' => $referral,
            'countries' => $countries,
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:users',
            'phone' => ['required', 'unique:users'],
            'email' => ['required', 'email', Rule::unique('users')],
            'password' => ['required', Rules\Password::defaults()],
        ]);
        
        $rawPhone = $request->input('phone');
        $dialCode = $request->dialCode['dial_code'];
        $formattedDialCode = ltrim($dialCode, '+');

        $formattedPhone = $formattedDialCode . $rawPhone;

        $otp = rand(100000, 999999);
        
        Cache::put('otp_' . $formattedPhone, $otp, now()->addMinutes(5));

        Session::put('register_data', [
            'name' => $request->name,
            'phone' => $formattedPhone,
        ]);

        $storeOtp = Otp::create([
            'otp' => $otp,
            'phone_number' => $formattedPhone,
            'expired_at' => now()->addMinutes(5),
        ]);

        if ($request->referral_code) {
            $userData = [
                'name' => $request->name,
                'username' => $request->name,
                'dial_code' => $dialCode,
                'phone' => $rawPhone,
                'password' => Hash::make($request->password),
                'role' => 'member',
                'rank_id' => '2'
            ];

            $referral_code = $request->input('referral_code');
            $check_referral_code = User::where('referral_code', $referral_code)->first();

            if ($check_referral_code) {
                $upline_id = $check_referral_code->id;
                $hierarchyList = empty($check_referral_code['hierarchyList']) ? "-" . $upline_id . "-" : $check_referral_code['hierarchyList'] . $upline_id . "-";

                $userData['upline_id'] = $upline_id;
                $userData['hierarchyList'] = $hierarchyList;

                $uplineWallet = Wallet::where('user_id', $upline_id)->where('type', 'cash_wallet')->first();
                $referralComm = Setting::where('name', 'referral')->first();


                $commLog = CommissionLog::create([
                    'user_id' => $upline_id,
                    'wallet_id' => $uplineWallet->id,
                    'amount' => $referralComm->value,
                    'old_balance' => $uplineWallet->balance,
                    'new_balance' => $uplineWallet->balance += $referralComm->value,
                    'transaction_date' => now(),
                ]);

                $uplineWallet->balance += $referralComm->value;
                $uplineWallet->save();

            }
        } else {
            $userData = [
                'name' => $request->name,
                'username' => $request->name,
                'dial_code' => $dialCode,
                'phone' => $rawPhone,
                'password' => Hash::make($request->password),
                'role' => 'member',
                'rank_id' => '1',
            ];
        }

        $user = User::create($userData);

        $user->setReferralId();

        Wallet::create([
            'user_id' => $user->id,
            'name' => 'Cash Wallet',
            'type' => 'cash_wallet',
            'balance' => '0.00',
            'wallet_address' => RunningNumberService::getID('cash_wallet'),
        ]);

        Wallet::create([
            'user_id' => $user->id,
            'name' => 'Dine In Wallet',
            'type' => 'dine_in_wallet',
            'balance' => '0.00',
            'wallet_address' => RunningNumberService::getID('dine_in_wallet'),
        ]);

        // event(new Registered($user));

        // Auth::login($user);

        $smsService = new Sms123Service();
        $smsService->sendOtp($formattedPhone, $otp);

        // return redirect(route('dashboard', absolute: false));
        return redirect(route('otp'));
    }
}
