<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RankSubscription extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'rank_id',
        'new_rank',
        'status',
    ];
}
