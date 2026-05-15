<?php

namespace App\Services;

use App\Data\QuoteData;
use Illuminate\Support\Facades\Http;

class QuoteService
{
    // Generate deterministic quote ID for each user
    public function getQuote(int $userId): QuoteData
    {
        $quoteId = (crc32((string) $userId) % 30) + 1;

        // Return mocked response when mock mode is enabled
        if (config('services.quote_api.mock')) {
            return $this->getMockQuote($quoteId);
        }

        // Fetch quote from external API
        $response = Http::get("https://dummyjson.com/quotes/{$quoteId}");
        $data = $response->json();

        return new QuoteData(
            id: $data['id'],
            quote: $data['quote'],
            author: $data['author'],
            fetchedAt: now()->format('d.m.Y H:i:s'),
            isMocked: false,
            statusCode: $response->status(),
            error: null,
        );
    }

    private function getMockQuote(int $quoteId): QuoteData
    {
        // Simulate API status codes: 200, 404, 500
        $status = rand(1, 3);

        if ($status === 1) {
            return new QuoteData(
                id: $quoteId,
                quote: 'This is a mocked quote.',
                author: 'Mock API',
                fetchedAt: now()->format('d.m.Y H:i:s'),
                isMocked: true,
                statusCode: 200,
                error: null,
            );
        }

        if ($status === 2) {
            return new QuoteData(
                id: $quoteId,
                quote: 'Quote not found.',
                author: 'Mock API',
                fetchedAt: now()->format('d.m.Y H:i:s'),
                isMocked: true,
                statusCode: 404,
                error: 'Quote not found',
            );
        }

        return new QuoteData(
            id: $quoteId,
            quote: 'Server error fallback quote.',
            author: 'Mock API',
            fetchedAt: now()->format('d.m.Y H:i:s'),
            isMocked: true,
            statusCode: 500,
            error: 'Internal server error',
        );
    }
}
