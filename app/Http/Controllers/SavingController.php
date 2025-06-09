<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Saving;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class SavingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user   = Auth::user();
        $notifications = $user?->unreadNotifications()->count() ?? 0;
        $savings = $user->savings;
        return Inertia::render('savings/savings', [
            'notifications' => $notifications,
            'savings' => $savings
        ]);
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
        $user   = Auth::user();
        $validated = $request->validate([
            'name' => 'required|unique:savings',
            'description' => 'required',
            'target' => 'required|numeric',
        ]);

        $saving = Saving::create([
            'user_id'=> $user->id,
            'name' => $validated['name'],
            'description' => $validated['description'],
            'target' => $validated['target'],
        ]);

        if ($saving){
            return redirect()->back()->with('success', 'Savings Account Created successfully');
        }else {
            return redirect()->back()->with('error', 'Error creating Savings Account. Try again later');
        }


    }

    /**
     * Display the specified resource.
     */
    public function show(Saving $saving)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Saving $saving)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Saving $saving)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Saving $saving)
    {
        //
    }
}
