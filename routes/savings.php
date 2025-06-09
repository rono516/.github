<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SavingController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::resource('savings', SavingController::class);
    Route::get('savings/{saving}', [SavingController::class,'savingsDeposit'])->name('savings.deposit');
    Route::post('savings/deposit', [SavingController::class,'walletSavingsDeposit'])->name('wallet.savings.deposit');
});
