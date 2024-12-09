<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\TempImageController;
use App\Http\Controllers\API\ApiController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FavoriteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;





/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('blogs',[BlogController::class,'index']);
Route::post('blogs',[BlogController::class,'store']);
Route::post('save-temp-image',[TempImageController::class,'store']);
Route::get('blogs/{id}',[BlogController::class,'show']);
Route::put('blogs/{id}',[BlogController::class,'update']);
Route::delete('blogs/{id}',[BlogController::class,'destroy']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/signup', [AuthController::class, 'signup']);
Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::put('/users/{id}', [UserController::class, 'update']);
Route::post('/users', [UserController::class, 'store']);
Route::post('/favorites/toggle', [FavoriteController::class, 'toggle']);
Route::get('/favorites', [FavoriteController::class, 'index']);


Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Route::post('register',[ApiController::class,'register']);
// Route::post('login',[ApiController::class,'Login']);
// Route::group([
//  'middlewere' => ['auth:sanctum']],function(){
//     Route::get('profile',[ApiController::class,'profile']);
//     Route::get('logout',[ApiController::class,'logout']);
//  }
// );

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });