<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
           \App\Models\User::query()->delete();

            for ($i = 1; $i <= 6; $i++) {

                \App\Models\User::create([
                    'name' => "User {$i}",
                    'email' => "user{$i}@magnadev.cz",
                    'password' => 'password',
                    'is_active' => $i % 2 === 0,
                    'last_login_at' => now()->subDays($i),
                ]);
    }
    }
}
