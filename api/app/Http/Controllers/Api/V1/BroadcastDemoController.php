<?php

namespace App\Http\Controllers\Api\V1;

use App\Events\DemoMessageSent;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BroadcastDemoController extends Controller
{
    /**
     * Broadcast demo message.
     *
     * @group Advanced
     *
     * @authenticated
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'message' => ['sometimes', 'string', 'max:255'],
        ]);

        broadcast(new DemoMessageSent($data['message'] ?? 'Hello from Reverb'));

        return response()->json([
            'message' => 'Demo broadcast sent.',
        ]);
    }
}
