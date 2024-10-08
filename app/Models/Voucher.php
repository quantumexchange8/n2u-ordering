<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Voucher extends Model
{
    use HasFactory, SoftDeletes;

    public function voucherRedeem(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(VoucherRedeem::class, 'id', 'voucher_id');
    }
}
