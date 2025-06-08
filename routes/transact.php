<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::get('transact', [TransactionController::class, 'index'])->name('transact');
    Route::post('deposit', [TransactionController::class, 'deposit'])->name('transact.deposit');
    Route::post('transfer', [TransactionController::class, 'transfer'])->name('transact.transfer');

});
