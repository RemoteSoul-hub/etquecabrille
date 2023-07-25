<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

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
Route::post('SaveUser',[\App\Http\Controllers\UserController::class,'storeUser']);
Route::post('login',[\App\Http\Controllers\UserController::class,'loginUser']);

Route::get('getsubservice/{idSubService}',[\App\Http\Controllers\ServiceController::class,'getSubService']);
Route::get('displayservices',[\App\Http\Controllers\ServiceController::class,'getServiceWithSubService']);
Route::get('getmedia/{idSubsService}',[\App\Http\Controllers\ServiceController::class,'getMedias']);
Route::get('getrelatedsubservices/{idService}',[\App\Http\Controllers\ServiceController::class,'getRelatedSubServices']);
Route::get('images/{filename}', function ($filename) {
    $path = 'Images/' . $filename;
    if (Storage::exists($path)) {
        $file = Storage::get($path);
        $type = Storage::mimeType($path);

        return response($file, 200)->header('Content-Type', $type);
    }

    return response('File not found', 404);
});

Route::get('getsubservices',[\App\Http\Controllers\ServiceController::class,'getSubServices']);
Route::middleware('auth:sanctum')->group(function () {


    Route::get('total/{idUser}',[\App\Http\Controllers\UserController::class,'total']);
    Route::post('wantwithdraw',[\App\Http\Controllers\UserController::class,'wantWithdraw']);
    Route::get('mescommandes',[\App\Http\Controllers\OrderController::class,'mesCommandes']);
    Route::post('payment',[\App\Http\Controllers\OrderController::class,'createPaymentIntent']);
    Route::post('acceptorder/{idOrder}',[\App\Http\Controllers\OrderController::class,'acceptOrder']);
    Route::delete('deleteadresse/{idAdrs}',[\App\Http\Controllers\UserController::class,'deleteAdrs']);
    Route::post('addadresse',[\App\Http\Controllers\UserController::class,'addAdresse']);
    Route::post('passecommande',[\App\Http\Controllers\OrderController::class,'storeCommande']);
    Route::get('mesdemandesaccepter',[\App\Http\Controllers\OrderController::class,'mesDemadesAccepter']);
    Route::post('anullercommande/{idOrder}',[\App\Http\Controllers\OrderController::class,'anullerCommande']);
    Route::get('getadresses',[\App\Http\Controllers\UserController::class,'getAddreses']);
    Route::post('createchat/{idUser}',[\App\Http\Controllers\ChatController::class,'createChat']);
    Route::post('sendmessage',[\App\Http\Controllers\ChatController::class,'sendMessage']);
    Route::get('mychats',[\App\Http\Controllers\ChatController::class,'displayMyChats']);
    Route::get('chat/{idChat}',[\App\Http\Controllers\ChatController::class,'displayChat']);
    Route::post('saveservice',[\App\Http\Controllers\ServiceController::class,'storeService']);
    Route::get('getservice',[\App\Http\Controllers\ServiceController::class,'getService']);
    Route::post('edituser',[\App\Http\Controllers\UserController::class,'editUser']);
    Route::post('mesparrinage',[\App\Http\Controllers\UserController::class,'mesParrinage']);



    Route::post('uploadimageservice',[\App\Http\Controllers\ServiceController::class,'saveMediaToService']);


    Route::post('savesubservice',[\App\Http\Controllers\ServiceController::class,'storeSubService']);
    Route::post('provideservice',[\App\Http\Controllers\UserController::class,'provideService']);
    Route::post('isavailable',[\App\Http\Controllers\UserController::class,'isAvailable']);
    Route::post('setavailability',[\App\Http\Controllers\UserController::class,'setAvailability']);
    Route::get('getavaibilities/{idUser}',[\App\Http\Controllers\UserController::class,'getAvaibailities']);
    Route::get('mesdemmandes',[\App\Http\Controllers\OrderController::class,'mesDemmandes']);
    Route::get('user',[\App\Http\Controllers\UserController::class,'index']);
    Route::post('logout',[\App\Http\Controllers\UserController::class,'logOut']);
});

