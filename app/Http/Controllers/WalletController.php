<?php

namespace App\Http\Controllers;

use App\Models\RunningNumber;
use App\Models\Transaction;
use App\Models\Wallet;
use App\Services\RunningNumberService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WalletController extends Controller
{
    public function wallet()
    {

        $user = Auth::user();

        $cashWallet = Wallet::where('user_id', $user->id)->where('type', 'cash_wallet')->first();
        $dineInWallet = Wallet::where('user_id', $user->id)->where('type', 'dine_in_wallet')->first();

        return Inertia::render('Wallet/Wallet', [
            'cashWallet' => $cashWallet,
            'dineInWallet' => $dineInWallet,
        ]);
    }
    public function topUpWallet(Request $request)
    {

        $user = Auth::user();

        $transaction = Transaction::create([
            'user_id' => $user->id,
            'transaction_type' => 'Deposit',
            'wallet' => 'dine_in_wallet',
            'amount' => $request->amount,
            'transaction_number' => RunningNumberService::getID('transaction'),
            'payment_type' => 'manual',
            'status' => 'pending',
        ]);

        return redirect()->back();
    }

    public function getAllTransaction()
    {

        $user = Auth::user();

        $transaction = Transaction::where('user_id', $user->id)->latest()->get();

        return response()->json($transaction);
    }

    public function withdrawal()
    {

        $user = Auth::user();

        $cashWallet = Wallet::where('type', 'cash_wallet')->where('user_id', $user->id)->first();
        
        return Inertia::render('Wallet/Withdrawal', [
            'cashWallet' => $cashWallet,
        ]);
    }

    public function submitWithdraw(Request $request)
    {

        $user = Auth::user();

        $withdraw = Transaction::create([
            'user_id' => $user->id,
            'transaction_type' => 'Withdrawal',
            'wallet' => 'cash_wallet',
            'amount' => $request->amount,
            'transaction_number' => RunningNumberService::getID('transaction'),
            'payment_type' => 'manual',
            'status' => 'pending',
        ]);

        $cashWallet = Wallet::where('type', 'cash_wallet')->where('user_id', $user->id)->first();

        $cashWallet->balance -= $request->amount;
        $cashWallet->save();

        return redirect()->back();
    }

    public function deposit()
    {
        $user = Auth::user();

        $dineInWallet = Wallet::where('type', 'dine_in_wallet')->where('user_id', $user->id)->first();

        return Inertia::render('Wallet/Deposit', [
            'dineInWallet' => $dineInWallet,
        ]);
    }

    public function submitDeposit(Request $request)
    {

        $user = Auth::user();

        $withdraw = Transaction::create([
            'user_id' => $user->id,
            'transaction_type' => 'Deposit',
            'wallet' => 'dine_in_wallet',
            'amount' => $request->amount,
            'transaction_number' => RunningNumberService::getID('transaction'),
            'payment_type' => 'manual',
            'status' => 'pending',
        ]);

        return redirect()->back();
    }
}
