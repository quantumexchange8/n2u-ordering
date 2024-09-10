<?php

namespace App\Http\Controllers;

use App\Models\Country;
use App\Models\Member;
use App\Models\Otp;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function index()
    {

        $countries = Country::get();
        
        return Inertia::render('Auth/Login', [
            'countries' => $countries,
        ]);
    }

    public function otp()
    {
     
        $phone = Session::get('register_data');

        return Inertia::render('Auth/Otp', [
            'phone' => $phone['phone'],
        ]);
    }

    public function verifyOtp(Request $request)
    {
        $request->validate([
            'otp' => 'required|numeric',
        ]);

        $phone = Session::get('register_data');
        $phoneNumber = $phone['phone'];

        $otp = $request->input('otp');
        
        $dialCode = substr($phoneNumber, 0, 2);  // '+60'
        $phoneOnly = substr($phoneNumber, 2);    // '127784455'

        $verifyOtp = Otp::where('phone_number', $phone['phone'])->where('otp', $otp)->first();

        if(!empty($verifyOtp)) {
            if (now() <= $verifyOtp->expired_at) {
                
                $member = User::where('dial_code', '+' . $dialCode)
                    ->where('phone', $phoneOnly)
                    ->first();
                
                $member->update([
                    'verify' => now(),
                ]);

                Auth::login($member);
                return redirect(route('dashboard', absolute: false));
            } else {
                return redirect()->back()->withErrors(['otp' => 'Invalid OTP']);
            }
        } else {
            return redirect()->back()->withErrors(['otp' => 'Invalid OTP']);
        }
        
    }
}
