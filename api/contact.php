<?php

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigins = [
    'https://n17.hu',
    'https://www.n17.hu'
];

if (in_array($origin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: " . $origin);
} else {
    header("Access-Control-Allow-Origin: https://n17.hu");
}

header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed."]);
    exit;
}


$rawInput = file_get_contents("php://input");
$input = json_decode($rawInput, true);

if (!is_array($input)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Érvénytelen JSON kérés."]);
    exit;
}

$name    = trim($input["yourName"] ?? "");
$email   = trim($input["yourEmail"] ?? "");
$phone   = trim($input["phone"] ?? "");
$message = trim($input["yourMessage"] ?? "");

if ($name === "" || $email === "" || $phone === "" || $message === "") {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Minden mező kitöltése kötelező."]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Érvénytelen email cím."]);
    exit;
}

$cleanEmail = str_replace(["\r", "\n"], '', $email);
$cleanName  = str_replace(["\r", "\n"], '', $name);
$cleanPhone = str_replace(["\r", "\n"], '', $phone);


$smtpHost  = "127.0.0.1";               
$smtpPort  = 25;                        
$smtpUser  = "noreply@n17.hu";
$smtpPass  = "UIBfw124214nk";     

$recipient = "manoczkierik@gmail.com";
$subject   = "Új üzenet az N17 weboldalról";

$emailBody =
    "Új üzenet érkezett az N17 weboldal kapcsolatfelvételi űrlapjáról.\r\n\r\n" .
    "Név: " . $cleanName . "\r\n" .
    "Email: " . $cleanEmail . "\r\n" .
    "Telefon: " . $cleanPhone . "\r\n\r\n" .
    "Üzenet:\r\n" . $message . "\r\n\r\n" .
    "--------------------------------\r\n" .
    "N17 weboldal";


$socket = @fsockopen($smtpHost, $smtpPort, $errno, $errstr, 10);

if (!$socket) {
    $context = stream_context_create(["ssl" => ["verify_peer" => false, "verify_peer_name" => false]]);
    $socket = @fsockopen("ssl://mail.n17.hu", 465, $errno, $errstr, 10, $context);
}

if (!$socket) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Nem sikerült kapcsolódni az SMTP szerverhez: " . $errstr]);
    exit;
}

function sendSmtpCmd($socket, $cmd, $expectedCode) {
    if ($cmd !== null) {
        fputs($socket, $cmd . "\r\n");
    }
    $response = "";
    while ($str = fgets($socket, 512)) {
        $response .= $str;
        if (substr($str, 3, 1) === " ") break;
    }
    if (substr($response, 0, 3) !== (string)$expectedCode) {
        return false;
    }
    return true;
}

// SMTP kézfogás
if (!sendSmtpCmd($socket, null, 220)) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "SMTP szerver nem válaszol."]);
    fclose($socket);
    exit;
}

sendSmtpCmd($socket, "EHLO n17.hu", 250);

// Hitelesítés
if (!sendSmtpCmd($socket, "AUTH LOGIN", 334) ||
    !sendSmtpCmd($socket, base64_encode($smtpUser), 334) ||
    !sendSmtpCmd($socket, base64_encode($smtpPass), 235)) {
    
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "SMTP Hitelesítési hiba. Ellenőrizd a noreply jelszót!"]);
    fclose($socket);
    exit;
}

sendSmtpCmd($socket, "MAIL FROM: <" . $smtpUser . ">", 250);
sendSmtpCmd($socket, "RCPT TO: <" . $recipient . ">", 250);
sendSmtpCmd($socket, "DATA", 354);

$headers  = "From: N17 <" . $smtpUser . ">\r\n";
$headers .= "Reply-To: " . $cleanEmail . "\r\n";
$headers .= "To: " . $recipient . "\r\n";
$headers .= "Subject: " . $subject . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8";

$fullPayload = $headers . "\r\n\r\n" . $emailBody . "\r\n.";

$sentSuccess = sendSmtpCmd($socket, $fullPayload, 250);
sendSmtpCmd($socket, "QUIT", 221);
fclose($socket);

if ($sentSuccess) {
    http_response_code(200);
    echo json_encode(["success" => true, "message" => "Az üzenet sikeresen elküldve."]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Az üzenet elküldése elutasítva a szerver által."]);
}
exit;