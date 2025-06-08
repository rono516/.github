<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use App\Models\Wallet;
use App\Services\WalletService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Inertia::render('transactions/transact');
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
        return redirect()->route('dashboard')->with('success', 'Deposit successful');
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

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Transaction $transaction)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Transaction $transaction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Transaction $transaction)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaction $transaction)
    {
        //
    }
}
