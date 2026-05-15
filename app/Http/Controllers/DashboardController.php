<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\QuoteService;

class DashboardController extends Controller
{
    // Fetch all users and attach quote data
    public function index(QuoteService $quoteService)
    {
        $users = User::all();
        $usersWithQuotes = $users->map(function ($user) use ($quoteService) {

            return [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'last_login_at' => $user->last_login_at ?? null,
                    'is_active' => $user->is_active ?? true,
                ],
                'quote' => $quoteService->getQuote($user->id),
                'fetched_at' => now()->format('d.m.Y H:i:s'),
            ];
        });
        return response()->json($usersWithQuotes);
    }
}
