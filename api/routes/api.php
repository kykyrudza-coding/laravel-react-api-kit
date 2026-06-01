<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\BroadcastDemoController;
use App\Http\Controllers\Api\V1\DemoJobController;
use App\Http\Controllers\Api\V1\FileController;
use App\Http\Controllers\Api\V1\FooController;
use App\Http\Controllers\Api\V1\LocaleController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->middleware('throttle:api')->group(function () {
    Route::get('/foo', [FooController::class, 'index']);
    Route::get('/locale', [LocaleController::class, 'show']);

    Route::post('/auth/login', [AuthController::class, 'login'])->middleware('throttle:login');

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/auth/me', [AuthController::class, 'me']);
        Route::post('/auth/logout', [AuthController::class, 'logout']);

        Route::get('/admin/foo', [FooController::class, 'admin'])->middleware('permission:foo.view');
        Route::post('/jobs/demo', [DemoJobController::class, 'store']);
        Route::post('/broadcast/demo', [BroadcastDemoController::class, 'store']);
        Route::post('/files', [FileController::class, 'store']);
    });
});
