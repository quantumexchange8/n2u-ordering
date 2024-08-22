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
            'phone' => $phone['phone_number'],
        ]);
    }

    public function verifyOtp(Request $request)
    {
        $request->validate([
            'otp' => 'required|numeric',
        ]);

        $phone = Session::get('register_data');
        
        $otp = $request->input('otp');
        
        $verifyOtp = Otp::where('phone_number', $phone['phone_number'])->where('otp', $otp)->first();

        if(!empty($verifyOtp)) {
            if (now() <= $verifyOtp->expired_at) {
                
                $member = User::where('phone', $phone['phone_number'])->first();

                $member->update([
                    'verify' => now(),
                ]);

                Auth::login($member);
                return redirect(route('dashboard', absolute: false));
            }
        }
        
    }
}
