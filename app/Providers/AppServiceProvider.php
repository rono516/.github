<?php
namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // use Inertia\Inertia;
    }

    /**
     * Bootstrap any application services.
     */
    //
    public function boot(): void
    {
        Inertia::share([
            'flash' => fn() => [
                'success' => session('success'),
                'error'   => session('error'),
            ],
        ]);
    }

}
