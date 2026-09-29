<?php

header("Access-Control-Allow-Origin: https://n17.hu");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");



if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {

    http_response_code(204);

    exit;
}


if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    http_response_code(405);

    echo json_encode([
        "success" => false,
        "message" => "Method not allowed."
    ]);

    exit;
}


$rawInput = file_get_contents("php://input");

$input = json_decode(
    $rawInput,
    true
);


if (!is_array($input)) {

    http_response_code(400);

    echo json_encode([
        "success" => false,
        "message" => "Érvénytelen kérés."
    ]);

    exit;
}

$name = trim(
    $input["yourName"] ?? ""
);

$email = trim(
    $input["yourEmail"] ?? ""
);

$phone = trim(
    $input["phone"] ?? ""
);

$message = trim(
    $input["yourMessage"] ?? ""
);


if (
    $name === "" ||
    $email === "" ||
    $phone === "" ||
    $message === ""
) {

    http_response_code(400);

    echo json_encode([
        "success" => false,
        "message" => "Minden mező kitöltése kötelező."
    ]);

    exit;
}


if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {

    http_response_code(400);

    echo json_encode([
        "success" => false,
        "message" => "Érvénytelen email cím."
    ]);

    exit;
}


$recipient = "manoczkierik@gmail.com";

$sender = "noreply@n17.hu";


$subject = "Új üzenet az N17 weboldalról";


$emailBody =
    "Új üzenet érkezett az N17 weboldal kapcsolatfelvételi űrlapjáról.\n\n" .

    "Név: " .
    $name .
    "\n" .

    "Email: " .
    $email .
    "\n" .

    "Telefon: " .
    $phone .
    "\n\n" .

    "Üzenet:\n" .
    $message .
    "\n\n" .

    "--------------------------------\n" .
    "N17 weboldal\n";


$headers = [];

$headers[] =
    "From: N17 <" . $sender . ">";

$headers[] =
    "Reply-To: " . $email;

$headers[] =
    "MIME-Version: 1.0";

$headers[] =
    "Content-Type: text/plain; charset=UTF-8";


$success = mail(
    $recipient,
    $subject,
    $emailBody,
    implode("\r\n", $headers)
);


if ($success) {

    http_response_code(200);

    echo json_encode([
        "success" => true,
        "message" => "Az üzenet sikeresen elküldve."
    ]);

    exit;

}

http_response_code(500);

echo json_encode([
    "success" => false,
    "message" => "Az email küldése nem sikerült."
]);

exit;