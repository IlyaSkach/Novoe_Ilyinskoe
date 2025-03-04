<?php
// Логируем все ошибки в файл
ini_set('log_errors', 1);
ini_set('error_log', 'error.log');
error_log('Request received');

// Отключаем вывод ошибок в браузер
ini_set('display_errors', 0);
error_reporting(0);

// Устанавливаем заголовки для CORS и JSON
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Если это preflight запрос
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Логируем полученные параметры
error_log('Parameters: ' . print_r($_GET, true));

// Получаем параметры
$name = isset($_GET['name']) ? $_GET['name'] : '';
$phone = isset($_GET['phone']) ? $_GET['phone'] : '';
$plotId = isset($_GET['plotId']) ? $_GET['plotId'] : '';
$square = isset($_GET['square']) ? $_GET['square'] : '';

// Проверяем обязательные поля
if (empty($name) || empty($phone) || empty($plotId)) {
    echo json_encode(['success' => false, 'error' => 'Missing required fields']);
    exit;
}

try {
    $botToken = '7480928940:AAHTjrTEoVRfIqRYw74cU1yzjpUMdskcW-Y';
    $chatId = '7492518102';
    // $chatId = '271823315';

    $message = "🏠 Новая заявка на бронирование участка!\n\n";
    $message .= "👤 Имя: $name\n";
    // Очищаем номер для ссылки (оставляем только цифры и плюс)
    $cleanPhone = preg_replace('/[^0-9+]/', '', $phone);
    // Форматируем сообщение с кликабельным телефоном
    $message .= "📞 Телефон: <a href=\"tel:$cleanPhone\">$phone</a>\n";
    $message .= "🗺 Номер участка: $plotId\n";
    // Формируем кадастровый номер с учетом особых случаев
    $cadastralNumber = ($plotId == 2270 || $plotId == 2271) ? 
        "69:10:0000025:$plotId" : 
        "69:10:0000032:$plotId";
    $message .= "📋 Кадастровый номер: $cadastralNumber\n";
    $message .= "📐 Площадь: $square соток";

    $params = http_build_query([
        'chat_id' => $chatId,
        'text' => $message,
        'parse_mode' => 'HTML',
        'disable_web_page_preview' => true
    ]);
    
    $url = "https://api.telegram.org/bot$botToken/sendMessage?{$params}";
    
    $result = @file_get_contents($url);
    
    if ($result === false) {
        throw new Exception('Failed to send message');
    }
    
    $response = json_decode($result, true);
    
    if (!isset($response['ok']) || !$response['ok']) {
        throw new Exception('Telegram API error');
    }
    
    echo json_encode(['success' => true]);
    
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?> 