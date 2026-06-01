<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Jobs\ProcessDemoJob;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DemoJobController extends Controller
{
    /**
     * Dispatch demo queue job.
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

        ProcessDemoJob::dispatch($data['message'] ?? 'Hello from queued job');

        return response()->json([
            'message' => 'Demo job dispatched.',
        ], 202);
    }
}
