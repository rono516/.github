<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $user = User::factory()->create([
            'name' => 'Test User',
            'user_name' => 'test334',
            'email' => 'test@example.com',
        ]);
        $user->wallet()->create([
            'name' => $user->user_name,
            'balance' => 0
        ]);
    }
}
