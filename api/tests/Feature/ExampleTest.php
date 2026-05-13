<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     */
    public function test_foo_endpoint_returns_bar(): void
    {
        $response = $this->getJson('/api/foo');

        $response
            ->assertOk()
            ->assertJson([
                'foo' => 'bar',
            ]);
    }
}
