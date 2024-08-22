<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('members', function (Blueprint $table) {
            $table->id();
            $table->string('username');
            $table->string('phone');
            $table->string('email')->nullable();
            $table->string('password');
            $table->string('verify')->nullable();
            $table->string('referral');
            $table->string('upline')->nullable();
            $table->string('hierarchyList')->nullable();
            $table->double('point')->default(0);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('members');
    }
};
