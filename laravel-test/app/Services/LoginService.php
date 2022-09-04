<?php

namespace App\Services;


use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class LoginService
{
    public function __invoke(Request $request): JsonResponse
    {
        $validator =  Validator::make($request->all(), [
            'email'     => 'required|string',
            'password'  => 'required|string',
        ]);

        if ($validator->fails()) {
            return new JsonResponse(['success' => false, 'message' => $validator->errors()], 422);
        }

        if(!Auth::attempt($request->only(['email', 'password']))){
                return response()->json([
                    'status' => false,
                    'message' => 'Email & Password does not match with our record.',
                ], 401);
            }

            $user = User::where('email', $request->email)->first();

            return response()->json([
                'status' => true,
                'message' => 'User Logged In Successfully',
                'access_token' => $user->createToken("API TOKEN")->plainTextToken,
                'token_type' => 'Bearer',
                'user' => $user
            ], 200);
    }
}
