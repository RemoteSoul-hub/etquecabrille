<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubService extends Model
{
    protected $primaryKey = 'idSubService';
    use HasFactory;

    public function service()
    {
        return $this->belongsTo(Service::class,'idService');
    }
}
