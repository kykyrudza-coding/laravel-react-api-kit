<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class DemoMessageSent implements ShouldBroadcastNow
{
    use Dispatchable, SerializesModels;

    public function __construct(
        public string $message,
    ) {}

    public function broadcastOn(): Channel
    {
        return new Channel('demo');
    }

    public function broadcastAs(): string
    {
        return 'demo.message';
    }
}
