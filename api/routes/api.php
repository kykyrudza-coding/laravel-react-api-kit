<?php

use Illuminate\Support\Facades\Route;

Route::get('/foo', function () {
    return response()->json([
        'foo' => 'bar',
        'message' => 'Laravel API is connected to React.',
    ]);
});
