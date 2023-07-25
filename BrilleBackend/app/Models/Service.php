<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $primaryKey = 'idService';
    use HasFactory;

    public function subServices()
    {
        return $this->hasMany(SubService::class,'idService');
    }
}
