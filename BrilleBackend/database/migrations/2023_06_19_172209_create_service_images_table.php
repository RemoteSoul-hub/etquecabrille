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
        Schema::create('service_images', function (Blueprint $table) {
            $table->id('idImage');
            $table->unsignedBigInteger('idSubService');
            $table->foreign('idSubService')->references('idSubService')->on('sub_services')->onDelete('cascade');
            $table->string('src');
            $table->tinyInteger('typeMedia');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_images');
    }
};
