<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$botToken = '7480928940:AAHTjrTEoVRfIqRYw74cU1yzjpUMdskcW-Y';
$chatId = '271823315';

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['name']) && isset($data['phone']) && isset($data['plotId'])) {
    $name = $data['name'];
    $phone = $data['phone'];
    $plotId = $data['plotId'];
    $square = $data['square'];

    $message = "🏠 Новая заявка на бронирование участка!\n\n";
    $message .= "👤 Имя: $name\n";
    $message .= "📞 Телефон: $phone\n";
    $message .= "🗺 Номер участка: $plotId\n";
    $message .= "📋 Кадастровый номер: 69:10:0000032:$plotId\n";
    $message .= "📐 Площадь: $square соток";

    $url = "https://api.telegram.org/bot$botToken/sendMessage";
    $params = [
        'chat_id' => $chatId,
        'text' => $message
    ];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    $response = curl_exec($ch);
    curl_close($ch);

    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => 'Missing required fields']);
}
?> 