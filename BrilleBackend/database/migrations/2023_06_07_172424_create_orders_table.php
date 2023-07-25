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
        Schema::create('orders', function (Blueprint $table) {
            $table->id('idOrder');
            $table->unsignedBigInteger('idUser');
            $table->unsignedBigInteger('idAdrs');
            $table->unsignedBigInteger('idSubService');
            $table->foreign('idSubService')->references('idSubService')->on('sub_services')->onDelete('cascade');
            $table->foreign('idAdrs')->references('idAdrs')->on('adresses')->onDelete('cascade');
            $table->foreign('idUser')->references('idUser')->on('users')->onDelete('cascade');
            $table->dateTime('dateDelivery');
            $table->double('totalPrice');
            $table->longText('information');
            $table->tinyInteger('orderStatus');
            $table->dateTime('dateConfiramtion')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
