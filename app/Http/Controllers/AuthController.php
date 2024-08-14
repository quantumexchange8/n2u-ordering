<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function index()
    {

        return Inertia::render('Auth/AuthAccount');
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
        $storedOtp = Cache::get('otp_' . $phone);

        Auth::login($phone);
        return redirect(route('dashboard', absolute: false));
    }
}
