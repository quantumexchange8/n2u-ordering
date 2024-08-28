<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Ranking;
use App\Models\RankSubscription;
use App\Models\Setting;
use App\Models\User;
use App\Models\Wallet;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\Rules;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function profile()
    {

        $user = Auth::user();

        $rank = Ranking::find($user->rank_id);

        $cashWallet = Wallet::where('user_id', $user->id)->where('type', 'cash_wallet')->first();
        $dineInWallet = Wallet::where('user_id', $user->id)->where('type', 'dine_in_wallet')->first();

        return Inertia::render('Profile/Profile', [
            'rank' => $rank,
            'cashWallet' => $cashWallet,
            'dineInWallet' => $dineInWallet,
        ]);
    }

    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    public function ranking()
    {

        $user = Auth::user();

        $rankingFee = Ranking::where('name', 'VIP')->first();

        $rank = Ranking::find($user->rank_id);

        $wallet = Wallet::where('type', 'dine_in_wallet')->where('user_id', $user->id)->first();

        $rankSubsciption = RankSubscription::where('user_id', $user->id)->first();

        // dd($rankSubsciption);

        return Inertia::render('Profile/Rank/Rank', [
            'rank' => $rank,
            'rankingFee' => $rankingFee,
            'rankSubsciption' => $rankSubsciption,
            'wallet' => $wallet,
        ]);
    }

    public function referral()
    {

        return Inertia::render('Profile/Referral/Referral');
    }

    public function subscribeRank(Request $request)
    {
        
        $checkWallet = Wallet::where('type', 'dine_in_wallet')->where('user_id', $request->id)->first();
        $rankPrice = Ranking::where('name', 'VIP')->first();
        $settingRank = Setting::where('setting_name', 'rank')->first();

        if ($checkWallet->balance >= $rankPrice->min_amount) {
            $subscription = RankSubscription::create([
                'user_id' => Auth::user()->id,
                'rank_id' => Auth::user()->rank_id,
                'new_rank' => $rankPrice->id,
                'status' => 'pending',
            ]);

            $checkWallet->balance -= $settingRank->value;
            $checkWallet->save();

            return redirect()->back()->with('success', 'successfully requested for upgrade rank');
        } else {
            return redirect()->back()->with('failed', 'insufficient balance');
        }

    }

    public function updateProfile(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('users')->ignore($user->id),
            ],
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users')->ignore($user->id),
            ],
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        return redirect()->back();
    }

    public function changePassword()
    {


        return Inertia::render('Profile/Password');
    }

    public function updatePassword(Request $request)
    {
        
        $validatedData = $request->validate([
            'password' => ['required', 'confirmed'],
        ]);

        $user = Auth::user();
        $user->password = Hash::make($validatedData['password']);
        $user->save();
        
        return redirect()->back();
    }
}
