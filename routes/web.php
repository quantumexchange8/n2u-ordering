<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PointController;
use App\Http\Controllers\VoucherController;
use App\Http\Controllers\WalletController;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/components/buttons', function () {
    return Inertia::render('Components/Buttons');
})->middleware(['auth', 'verified'])->name('components.buttons');

Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

Route::middleware('auth')->group(function () {

    

    Route::get('/profile', [ProfileController::class, 'profile'])->name('profile');
    Route::get('/profile-edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/updateProfile', [ProfileController::class, 'updateProfile'])->name('updateProfile');

    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/ranking', [ProfileController::class, 'ranking'])->name('ranking');
    Route::post('/subscribeRank', [ProfileController::class, 'subscribeRank'])->name('subscribeRank');

    Route::get('/referral_code', [ProfileController::class, 'referral'])->name('referral');

    // TOP UP
    Route::post('/topUpWallet', [WalletController::class, 'topUpWallet'])->name('topUpWallet');

    // WALLET TRANSACTION
    Route::get('/wallet', [WalletController::class, 'wallet'])->name('wallet');
    Route::get('/getAllTransaction', [WalletController::class, 'getAllTransaction'])->name('getAllTransaction');

    Route::get('/deposit', [WalletController::class, 'deposit'])->name('deposit');
    Route::post('/submitDeposit', [WalletController::class, 'submitDeposit'])->name('submitDeposit');

    Route::get('/withdrawal', [WalletController::class, 'withdrawal'])->name('withdrawal');
    Route::post('/submitWithdraw', [WalletController::class, 'submitWithdraw'])->name('submitWithdraw');

    // VOUCHER 
    Route::get('/voucher', [VoucherController::class, 'voucher'])->name('voucher');
    Route::get('/getVoucher', [VoucherController::class, 'getVoucher'])->name('getVoucher');
    Route::get('/getUserVoucher', [VoucherController::class, 'getUserVoucher'])->name('getUserVoucher');

    Route::post('/redeemVoucher', [VoucherController::class, 'redeemVoucher'])->name('redeemVoucher');

    // POINT 
    Route::get('/point-history', [PointController::class, 'pointHistory'])->name('point-history');
    Route::get('/getAllPointTransaction', [PointController::class, 'getAllPointTransaction'])->name('getAllPointTransaction');
    

    // Chnage password
    Route::get('/change-password', [ProfileController::class, 'changePassword'])->name('change-password');
    Route::post('/updatePassword', [ProfileController::class, 'updatePassword'])->name('updatePassword');

});

Route::middleware('auth:web')->group(function () {
    // Routes for authenticated users
});

Route::middleware('auth:members')->group(function () {
    
});

require __DIR__.'/auth.php';
