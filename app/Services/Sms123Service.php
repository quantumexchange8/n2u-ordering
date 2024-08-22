<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class Sms123Service
{
    // protected $username;
    protected $apiKey;
    // protected $senderId;

    public function __construct()
    {
        // $this->username = env('SMS123_USERNAME');
        $this->apiKey = env('SMS123_API_KEY');
        // $this->senderId = env('SMS123_SENDER_ID');
    }

    public function sendOtp($phoneNumber, $otp)
    {
        $message = "Your OTP code is $otp";

        $response = Http::asForm()->post('https://www.sms123.net/api/send.php', [
            'apiKey' => $this->apiKey,
            'recipients' => $phoneNumber,
            'message' => $message,
            // 'senderid' => $this->senderId,
        ]);

        return $response->successful();
    }
}
