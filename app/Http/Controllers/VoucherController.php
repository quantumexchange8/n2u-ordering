<?php

namespace App\Http\Controllers;

use App\Models\Voucher;
use App\Models\VoucherRedeem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class VoucherController extends Controller
{
    public function voucher()
    {

        return Inertia::render('Voucher/Voucher');
    }

    public function getVoucher()
    {

        $voucher = Voucher::query()
            ->get();

        return response()->json($voucher);
    }

    public function redeemVoucher(Request $request)
    {

        return redirect()->back();
    }

    public function getUserVoucher()
    {
        $user = Auth::user();
        $voucher = VoucherRedeem::query()
            ->where('user_id', $user->id)
            ->with(['vouchers'])
            ->get();

        return response()->json($voucher);
        
    }
}
