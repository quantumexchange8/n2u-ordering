<?php

namespace App\Http\Controllers;

use App\Models\PointLog;
use App\Models\Voucher;
use App\Models\VoucherRedeem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Str;

class VoucherController extends Controller
{
    public function voucher()
    {

        $user = Auth::user();

        return Inertia::render('Voucher/Voucher', ['user' => $user]);
    }

    public function getVoucher()
    {
        $user = Auth::user();

        if ($user->rank_id > 1) {
            $voucher = Voucher::query()
                ->with(['voucherRedeem'])
                ->get();
                
        } else {
            $voucher = Voucher::query()
                ->with(['voucherRedeem'])
                ->where('rank_id', $user->rank_id)
                ->get();
        }

        

        return response()->json($voucher);
    }

    public function redeemVoucher(Request $request)
    {

        $user = Auth::user();
        $voucherId = Voucher::find($request->id);

        $randStr = Str::upper(Str::random(3));

        $uniqueVoucherCode = 'N2U' . $user->id . $voucherId->id . $randStr;

        $voucher = VoucherRedeem::create([
            'user_id' => $user->id,
            'voucher_id' => $voucherId->id,
            'code' => $uniqueVoucherCode,
            'status' => 'active',
        ]);

        $point = PointLog::create([
            'user_id' => $user->id,
            'type' => 'used',
            'amount' => '0.00',
            'earning_point' => $voucherId->point,
            'old_point' => $user->point,
            'new_point' => $user->point -= $voucherId->point,
        ]);


        $user->point -= $voucherId->point;
        $user->save();

        return redirect()->back();
    }

    public function getUserVoucher()
    {
        $user = Auth::user();
        $voucher = VoucherRedeem::query()
            ->where('user_id', $user->id)
            ->whereHas('vouchers', function ($query) {
                $query->whereNull('deleted_at'); // Ensure it excludes soft-deleted vouchers
                })
            ->with(['vouchers'])
            ->get();

        return response()->json($voucher);
        
    }
}
