<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    /**
     * Store demo file.
     *
     * @group Advanced
     *
     * @authenticated
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'file' => ['required', 'file', 'max:5120'],
        ]);

        $path = $data['file']->store('uploads', config('filesystems.default'));

        return response()->json([
            'disk' => config('filesystems.default'),
            'path' => $path,
            'url' => Storage::url($path),
        ], 201);
    }
}
