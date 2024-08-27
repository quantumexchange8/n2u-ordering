<?php

namespace App\Http\Controllers;

use App\Models\PointLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PointController extends Controller
{
    public function pointHistory()
    {

        return Inertia::render('Point/Point');
    }

    public function getAllPointTransaction()
    {

        $user = Auth::user();

        $point = PointLog::query()
            ->where('user_id', $user->id)
            ->get();

        return response()->json($point); 
    }
}
