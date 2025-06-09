<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Saving extends Model
{
    protected $fillable = ['user_id', 'name', 'description', 'balance', 'target'];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
