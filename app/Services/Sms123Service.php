<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

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

        $params = [
            'apiKey' => $this->apiKey,
            'recipients' => $phoneNumber,
            'messageContent' => $message,
        ];

        $url = 'https://www.sms123.net/api/send.php';
        Log::debug('Sending OTP', ['url' => $url, 'params' => $params]);

        $response = Http::post($url, $params);

        // Optionally, log the response for debugging
        Log::debug('SMS123 Response', ['response' => $response->body()]);
    
        return $response->json();
    }
}
