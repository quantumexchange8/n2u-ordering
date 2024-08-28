<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VoucherRedeem extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'voucher_id',
        'code',
        'status',
    ];

    public function vouchers(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Voucher::class, 'voucher_id', 'id');
    }
}
