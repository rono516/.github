<?php

namespace App\Services;

use App\Models\Wallet;
use App\Models\Transaction;
use App\Notifications\DepositNotification;
use Illuminate\Support\Facades\DB;
use App\Notifications\MoneyReceivedNotification;


class WalletService
{
    public function deposit(Wallet $wallet, float $amount, string $description): Transaction
    {
        $wallet->increment('balance', $amount);
        $depositingUser = $wallet->user;
        $depositingUser->notify(new DepositNotification($amount,$wallet->balance));

        return $wallet->transactions()->create([
            'type' => 'DEPOSIT',
            'amount' => $amount,
            'description' => $description,
        ]);
    }

    public function withdraw(Wallet $wallet, float $amount, string $description): Transaction
    {
        if ($wallet->balance < $amount) {
            throw new \Exception("Insufficient balance");
        }

        $wallet->decrement('balance', $amount);

        return $wallet->transactions()->create([
            'type' => 'WITHDRAWAL',
            'amount' => $amount,
            'description' => $description,
        ]);
    }

    public function transfer(Wallet $from, Wallet $to, float $amount, string $description): Transaction
    {
        // dd($to->user->id);
        if ($from->balance < $amount) {
            throw new \Exception("Insufficient balance");
        }

        return DB::transaction(function () use ($from, $to, $amount, $description) {
            $from->decrement('balance', $amount);
            $to->increment('balance', $amount);

            $receiverUser = $to->user;
            $receiverUser->notify(new MoneyReceivedNotification($amount, $from->name));

            return Transaction::create([
                'wallet_id' => $from->id,
                'type' => 'TRANSFER',
                'amount' => $amount,
                'target_wallet_id' => $to->id,
                'description' => $description,
            ]);

        });
    }
}
