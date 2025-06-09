<?php
namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TransactionsTest extends TestCase
{
    use RefreshDatabase;
    public function test_guests_are_redirected_to_the_login_page()
    {
        $this->get('/transact')->assertRedirect('/login');
    }

    public function test_authenticated_users_can_visit_the_transactions_page()
    {
        $response = $this->post('/register', [
            'name'                  => 'Test User',
            'email'                 => 'test@example.com',
            'user_name'             => 'test516',
            'password'              => 'password',
            'password_confirmation' => 'password',
        ]);
        $user = auth()->user();
        $this->get('/transact')->assertOk();

    }
}
