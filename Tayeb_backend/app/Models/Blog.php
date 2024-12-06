<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'shortDesc', 'image', 'description', 'author', 'categories', 'create_user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'create_user_id');
    }

    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }
}