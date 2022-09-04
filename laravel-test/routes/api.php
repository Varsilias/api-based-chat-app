<?php

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/auth/login', App\Services\LoginService::class);

Route::get("/", function(Request $request) {
    $limit = $request->query("limit"); // null or a number that would equal the number of result we want to limit to
    $sortCriteria = $request->query("sortBy") ?? "id"; // null or id ( should go hand in hand with direction)
    $direction = ($request->query("desc") ? "desc" : "asc"); // desc or asc
    // dd($sortCriteria, $direction);
    // dd($sortCriteria);

    $users = User::orderBy($sortCriteria, $direction)->limit($limit)->get()->paginate(20);
    // $users = User::where(function ($query) use ($sortCriteria, $direction, $limit) {
    //     $query->selectRaw('*')
    //     ->from('users')
    //     ->orderBy("email", "desc")
    //     ->take($limit);
    // })->paginate(20);

    return $users;
});

Route::middleware('auth:sanctum')->get("users", function () {
    $user = User::all()->except(Auth::id());
    return new JsonResponse(['status' => true, 'success' => true, 'data' => $user ]);
});
Route::post("messages", [App\Http\Controllers\ChatController::class, 'messages']);
Route::middleware('auth:sanctum')
    ->post("user_typing", [App\Http\Controllers\UserTypingController::class, 'emit']);
