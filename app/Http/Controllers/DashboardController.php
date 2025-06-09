<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Saving;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function dashboard()
    {
        $user   = Auth::user();
        $wallet = $user->wallet;

        // Calculate totals
        $totalDeposits = Transaction::where('wallet_id', $wallet->id)
            ->where('type', 'DEPOSIT')
            ->sum('amount');

        $totalReceived = Transaction::where('target_wallet_id', $wallet->id)
            ->where('type', 'TRANSFER')
            ->sum('amount');
        $totalTransferred = Transaction::where('wallet_id', $wallet->id)
            ->where('type', 'TRANSFER')
            ->sum('amount');
        $totalSavings = Saving::where('user_id', $user->id)
            ->sum('balance');

        // Fetch recent transactions paginated
        $transactions = Transaction::with(['wallet.user', 'targetWallet.user'])
            ->where(function ($query) use ($wallet) {
                $query->where('wallet_id', $wallet->id)
                    ->orWhere('target_wallet_id', $wallet->id);
            })
            ->latest()
            ->paginate(10);

        $notifications = $user?->unreadNotifications()->count() ?? 0;

        return Inertia::render('dashboard', [
            'user'             => $user->load('wallet'),
            'totalDeposits'    => $totalDeposits,
            'totalReceived'    => $totalReceived,
            'transactions'     => $transactions,
            'totalTransferred' => $totalTransferred,
            'notifications'    => $notifications,
            'totalSavings'     => $totalSavings,
        ]);
    }

    public function notifications()
    {

        $user = auth()->user();
        return Inertia::render('notifications/notifications', [
            'notifications' => $user->notifications,       // all notifications
            'unread'        => $user->unreadNotifications, // unread only
        ]);
    }

    public function markNotificationRead($id)
    {
        $notification = auth()->user()->notifications()->findOrFail($id);
        $notification->markAsRead();
        return back()->with('success', 'Notification marked as read.');
    }
}
