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
        Schema::create('messages', function (Blueprint $table) {
            $table->id('idMessage');
            $table->unsignedBigInteger('idUser');
            $table->unsignedBigInteger('idChat');
            $table->foreign('idUser')->references('idUser')->on('users')->onDelete('cascade');
            $table->foreign('idChat')->references('idChat')->on('chats')->onDelete('cascade');
            $table->string('contenu');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
