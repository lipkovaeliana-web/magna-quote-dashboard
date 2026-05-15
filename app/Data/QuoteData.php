<?php
namespace App\Data;

use Spatie\LaravelData\Data;

// DTO for quote API responses and mocked data
class QuoteData extends Data
{
    public function __construct(
        public int $id,
        public string $quote,
        public string $author,
        public string $fetchedAt,
        public bool $isMocked = false,
        public ?int $statusCode = 200,
        public ?string $error = null,
    ) {}
}
