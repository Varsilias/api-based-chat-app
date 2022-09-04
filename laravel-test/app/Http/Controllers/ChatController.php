<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ChatController extends Controller
{
    public function messages(Request $request): array
    {
        Log::info($request);
        event(new MessageSent($request->sender, $request->message, $request->receiver));
        return [];
    }
}
