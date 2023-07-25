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
        Schema::create('sub_services', function (Blueprint $table) {
            $table->id('idSubService');
            $table->unsignedBigInteger('idService');
            $table->foreign('idService')->references('idService')->on('services')->onDelete('cascade');
            $table->string('subServiceName');
            $table->string('descSubService');
            $table->double('subServicePrice');
            $table->tinyInteger('trashSubService')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sub_services');
    }
};
