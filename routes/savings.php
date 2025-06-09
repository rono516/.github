<?php

use App\Http\Controllers\SavingController;
use Illuminate\Support\Facades\Route;

Route::resource('savings', SavingController::class);