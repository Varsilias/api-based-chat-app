<?php

namespace App\Http\Controllers;

use App\Events\UserTyping;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserTypingController extends Controller
{
    public function emit(Request $request)
    {
        $user = User::find(Auth::user()->id);
        event(new UserTyping($user, $request->typing));
    }
}
