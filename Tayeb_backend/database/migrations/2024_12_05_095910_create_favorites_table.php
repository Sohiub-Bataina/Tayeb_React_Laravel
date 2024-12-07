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
        Schema::create('favorites', function (Blueprint $table) {
            $table->engine = 'InnoDB'; // Set the table engine to InnoDB
            $table->id(); // Primary key
            $table->unsignedBigInteger('blog_id'); // Foreign key for blogs table
            $table->unsignedBigInteger('user_id'); // Foreign key for users table
            $table->timestamps();

            // Define foreign key constraints
            $table->foreign('blog_id')->references('id')->on('blogs')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('favorites');
    }
};
