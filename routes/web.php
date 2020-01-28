<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('lighthouse/broadcast', function (\Illuminate\Http\Request $request, \BeyondCode\LaravelWebSockets\Apps\AppProvider $apps) {
    return view('lighthouse', [
        'apps' => $apps->all(),
        'port' => config('websockets.dashboard.port'),
    ]);
});
