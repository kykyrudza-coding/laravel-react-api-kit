<?php

use App\Events\DemoMessageSent;
use App\Jobs\ProcessDemoJob;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Storage;

uses(RefreshDatabase::class);

it('returns localized messages', function () {
    $this->getJson('/api/v1/locale?locale=uk')
        ->assertOk()
        ->assertJsonPath('locale', 'uk')
        ->assertJsonPath('messages.welcome', 'Вітаємо у Laravel API React template.');
});

it('dispatches a demo queue job', function () {
    Bus::fake();

    $token = User::factory()->create()->createToken('test')->plainTextToken;

    $this->withToken($token)
        ->postJson('/api/v1/jobs/demo', [
            'message' => 'Queued in test',
        ])
        ->assertAccepted()
        ->assertJsonPath('message', 'Demo job dispatched.');

    Bus::assertDispatched(ProcessDemoJob::class);
});

it('broadcasts a demo event', function () {
    Event::fake();

    $token = User::factory()->create()->createToken('test')->plainTextToken;

    $this->withToken($token)
        ->postJson('/api/v1/broadcast/demo', [
            'message' => 'Broadcast in test',
        ])
        ->assertOk()
        ->assertJsonPath('message', 'Demo broadcast sent.');

    Event::assertDispatched(DemoMessageSent::class);
});

it('stores a demo file', function () {
    Storage::fake('local');

    $token = User::factory()->create()->createToken('test')->plainTextToken;

    $response = $this->withToken($token)
        ->postJson('/api/v1/files', [
            'file' => UploadedFile::fake()->create('demo.txt', 1, 'text/plain'),
        ]);

    $path = $response
        ->assertCreated()
        ->assertJsonPath('disk', 'local')
        ->json('path');

    Storage::disk('local')->assertExists($path);
});
