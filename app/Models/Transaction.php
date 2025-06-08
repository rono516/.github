<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = ['wallet_id', 'type', 'amount', 'description', 'target_wallet_id'];

    public function wallet(){
        return $this->belongsTo(Wallet::class);
    }
    public function targetWallet(){
        return $this->belongsTo(Wallet::class, 'target_wallet_id');
    }
}
