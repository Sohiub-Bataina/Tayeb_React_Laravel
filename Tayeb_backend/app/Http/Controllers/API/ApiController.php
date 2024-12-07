<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;



class ApiController extends Controller
{
    // Register Api (POST, FormData)
    public function register(Request $request){
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'gender' => 'required|in:male,female',
            'password' => 'required'
        ]);
    
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password), // Correct usage
        ]);
    
        return response()->json([
            'status' => true,
            'message' => 'User registered successfully'
        ]);
    }
    // login Api (POST, FormData)
    public function Login(Request $request){
        $request->validate([
            
            'email' => 'required|email',
            'password' => 'required'
        ]);
        $user = User::where('email',$request->email)->first();
        if(!empty($user)){
            // user exist 
            if(Hash::check($request->password,$user->password)){
                $token=$user->createToken("MyToken")->plainTextToken;
                return response()->json([
                    'status' => true,
                    'message' => 'Login successfully',
                    'token' =>$token
                ]);
            }
            return response()->json([
                'status' => false,
                'message' => 'Password uncorrect'
            ]);
        }
        return response()->json([
            'status' => false,
            'message' => 'Invalid Login Detalis'
        ]);
    }
    //Get
    public function profile(){
        $data =auth()->user();
        return response()->json([
            'status' => true,
            'message' => 'Profile Data',
            'user'=>$data
        ]);
        
    }
   

public function logout() {
    $user = auth()->user();
    \Log::info('Authenticated User:', [$user]);
    if ($user) {
        $user->tokens()->delete();
        return response()->json([
            'status' => true,
            'message' => 'User logged out',
        ]);
    }

    return response()->json([
        'status' => false,
        'message' => 'No authenticated user',
    ], 401);
}
}
