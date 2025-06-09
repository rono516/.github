<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Saving;
use App\Notifications\NewSavingCreated;
use App\Notifications\SavingDepositNotification;
use App\Services\WalletService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SavingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user          = Auth::user();
        $notifications = $user?->unreadNotifications()->count() ?? 0;
        $savings       = $user->savings;
        return Inertia::render('savings/savings', [
            'notifications' => $notifications,
            'savings'       => $savings,
        ]);
    }

    /**
     * Open savings deposit page
     */

    public function savingsDeposit(Saving $saving)
    {
        $user          = Auth::user();
        $notifications = $user?->unreadNotifications()->count() ?? 0;

        return Inertia::render('savings/savings_deposit', [
            'notifications' => $notifications,
            'saving'        => $saving,
        ]);
    }
    /**
     * Transfer from wallet to savings
     */
    public function walletSavingsDeposit(Request $request, WalletService $walletService)
    {

        $validated = $request->validate([
            'amount'     => 'required|numeric',
            'savings_id' => 'required|exists:savings,id',
        ]);
        $user = Auth::user();

        $wallet = $user->wallet;

        $saving = Saving::findOrFail($validated['savings_id']);
        if ($wallet->balance < $validated['amount']) {
            return redirect()->back()->with('error', 'insufficient balance in your wallet for this transaction');
        } else {
            $saving->balance += $validated['amount'];
            $saving->save();
            $walletService->withdraw($wallet, $validated['amount'], 'Transfer to ' . $saving->name);

            $user->notify(new SavingDepositNotification($validated['amount'], $saving->name, $saving->target));

            return redirect()->route('savings.index')->with('success', 'deposit to savings successful');

        }

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user      = Auth::user();
        $validated = $request->validate([
            'name'        => 'required|unique:savings',
            'description' => 'required',
            'target'      => 'required|numeric',
        ]);

        $saving = Saving::create([
            'user_id'     => $user->id,
            'name'        => $validated['name'],
            'description' => $validated['description'],
            'target'      => $validated['target'],
        ]);

        if ($saving) {
            // $receiverUser->notify(new MoneyReceivedNotification($amount, $from->name));
            $user->notify(new NewSavingCreated($saving->name));
            return redirect()->back()->with('success', 'Savings Account Created successfully');
        } else {
            return redirect()->back()->with('error', 'Error creating Savings Account. Try again later');
        }

    }

}
