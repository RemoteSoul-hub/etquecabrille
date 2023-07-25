<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
Route::get('/', function () {
    return view('welcome');
})->name('login');
Route::post('/loginadmin',[UserController::class,'loginUser']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/users',[UserController::class,'displayUsers']);
    Route::get('/dashboard',[UserController::class,'displayDashboard']);
    Route::get('/retire',[UserController::class,'withdrawAsk']);
    Route::post('/cofirmerwithdraw',[UserController::class,'confirmWithdraw']);
    Route::get('/orders',[OrderController::class,'displayOrdersAdmin']);
    Route::post('/confirmercommande',[OrderController::class,'confirmOrder']);
    Route::get('/identity/{idUser}',[UserController::class,'displayIdentity']);
    Route::post('/confirmeuser',[UserController::class,'confirmerUtulisateur']);
});


