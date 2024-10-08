<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PointLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'amount',
        'earning_point',
        'old_point',
        'new_point',
        'type',
    ];
}
