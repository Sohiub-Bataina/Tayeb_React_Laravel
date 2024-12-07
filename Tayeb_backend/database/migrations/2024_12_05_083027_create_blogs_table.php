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
        Schema::create('blogs', function (Blueprint $table) {
            $table->engine = 'InnoDB'; // Set the table engine to InnoDB
            $table->id();
            $table->string('title');
            $table->string('shortDesc')->nullable();
            $table->string('image')->nullable();
            $table->text('description')->nullable();
            $table->string('author');
            $table->enum('categories', ['desserts', 'main_dish', 'salads']); // Add categories column
            $table->unsignedBigInteger('create_user_id'); // Add create_user_id column
            $table->timestamps();

            // Foreign key constraint
            $table->foreign('create_user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blogs');
    }
};
