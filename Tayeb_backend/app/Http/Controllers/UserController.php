<?php

// app/Http/Controllers/UserController.php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // قراءة جميع المستخدمين
    public function index()
    {
        return response()->json(User::all());
    }

    // قراءة مستخدم واحد
    public function show($id)
{
    $user = User::find($id);
    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }
    return response()->json($user);
}


    // إضافة مستخدم جديد
public function store(Request $request)
{
    // التحقق من البيانات المدخلة
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email',
        'phone_number' => 'nullable|string|max:15',
        'password' => 'required|string|min:6',
    ]);

    // إنشاء المستخدم الجديد
    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'phone_number' => $request->phone_number,
        'password' => bcrypt($request->password),
    ]);

    return response()->json([
        'message' => 'User created successfully!',
        'user' => $user,
    ], 201); // 201 Created
}

    // تعديل بيانات المستخدم
    public function update(Request $request, $id)
    {
        $user = User::find($id);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->phone_number = $request->phone_number;
        $user->save();

        return response()->json($user);
    }
}

