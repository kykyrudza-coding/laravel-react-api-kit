<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class LocaleController extends Controller
{
    /**
     * Read translated demo messages.
     *
     * @group Advanced
     *
     * @unauthenticated
     */
    public function show(Request $request): JsonResponse
    {
        $locale = $request->query('locale', config('app.locale'));

        if (! in_array($locale, ['en', 'uk'], true)) {
            $locale = config('app.locale');
        }

        App::setLocale($locale);

        return response()->json([
            'locale' => $locale,
            'messages' => [
                'welcome' => __('messages.welcome'),
                'advanced' => __('messages.advanced'),
            ],
        ]);
    }
}
