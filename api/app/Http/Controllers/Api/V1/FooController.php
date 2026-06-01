<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class FooController extends Controller
{
    /**
     * Public foo endpoint.
     *
     * @group Foo
     *
     * @unauthenticated
     */
    public function index(): JsonResponse
    {
        return response()->json([
            'foo' => 'bar',
            'message' => 'Laravel API v1 is connected to React.',
        ]);
    }

    /**
     * Protected foo endpoint.
     *
     * @group Foo
     *
     * @authenticated
     */
    public function admin(): JsonResponse
    {
        return response()->json([
            'foo' => 'admin-bar',
            'message' => 'You have the foo.view permission.',
        ]);
    }
}
