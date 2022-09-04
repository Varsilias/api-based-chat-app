<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Broadcast;
use App\Models\Order;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('chat-{id}', function ($user, $id) {
    \Illuminate\Support\Facades\Log::info($user);
    \Illuminate\Support\Facades\Log::info($id);
    return true;
//    return (int) $user->id === (int) \App\Models\User::find($senderId)->id;
});

//Broadcast::channel('chat.{receiverId}', function ($user, $receiverId) {
//    return (int) $user->id === (int) \App\Models\User::find($receiverId)->id;
//});
