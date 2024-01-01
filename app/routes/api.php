<?php

use App\Http\Controllers\EventController;
use Illuminate\Support\Facades\Route;

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

Route::group((['prefix' => 'v1']), function () {
    Route::get('events',[EventController::class, 'index']);
    Route::post('events',[EventController::class, 'store']);
    Route::get('events/{id}',[EventController::class, 'show']);
    Route::post('events/{id}',[EventController::class, 'update']);
    Route::delete('events/{id}',[EventController::class, 'destroy']);
});
