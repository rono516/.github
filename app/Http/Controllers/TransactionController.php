<?php
namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Wallet;
use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Services\WalletService;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user   = Auth::user();
        $notifications = $user?->unreadNotifications()->count() ?? 0;
        return Inertia::render('transactions/transact', [
            'notifications' => $notifications
        ]);
    }

    /**
     * deposit to wallet
     */

    public function deposit(Request $request, WalletService $walletService)
    {
        $validated = $request->validate([
            'amount' => 'required|numeric|min:1',
        ]);
        $wallet = auth()->user()->wallet;
        $walletService->deposit($wallet, $validated['amount'], 'User deposit');
        // return redirect()->route('dashboard')->with('success', 'Deposit successful');
        return back()->with('success', 'Deposit successful');
    }
    /**
     * Transfer from one wallet to another
     */
    public function transfer(Request $request, WalletService $walletService)
    {
        $validated = $request->validate([
            'amount'                => 'required|numeric|min:1',
            'recipient_wallet_name' => 'required|string|exists:wallets,name',
        ]);

        $fromWallet = auth()->user()->wallet;
        $fromWalletBalance = auth()->user()->wallet->balance;


        $toWallet   = \App\Models\Wallet::where('name', $validated['recipient_wallet_name'])->first();

        if ($fromWalletBalance < $validated['amount']){
            return back()->withErrors(['amount' => "Insufficient balance for this transfer"]);
        }

        if ($fromWallet->id === $toWallet->id) {
            return back()->withErrors(['recipient_wallet_name' => 'You cannot transfer to your own wallet.']);
        }

        $walletService->transfer($fromWallet, $toWallet, $validated['amount'], 'User transfer');

        return redirect()->route('dashboard')->with('success', 'Transfer successful');
    }
}
