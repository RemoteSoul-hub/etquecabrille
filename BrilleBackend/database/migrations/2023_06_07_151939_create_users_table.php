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
        Schema::create('users', function (Blueprint $table) {
            $table->id('idUser');
            $table->string('userFname');
            $table->string('userLname');
            $table->string('email');
            $table->string('password');
            $table->string('telUser');
            $table->integer('typeUser');
            $table->string('bankName');
            $table->string('typeCompt');
            $table->string('numCompt');
            $table->string('uniqueCode');
            $table->string('ref')->nullable();
            $table->string('gift')->default(0);
            $table->tinyInteger('trashUser')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
