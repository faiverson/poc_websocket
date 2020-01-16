<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ACL extends Model
{
    public $timestamps = false;
    protected $table = 'acls';
    protected $guarded = [];
}
