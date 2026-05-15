<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class QuoteService
{
    public function getQuote(int $userId)
    {
        $quoteId = (crc32((string) $userId) % 30) + 1;//30 kvůli omezenému rozsahu quote ID pro demo/testing

        $response = Http::get("https://dummyjson.com/quotes/{$quoteId}");

        return $response->json();
    }
}
