<?php

require_once("config.php");

$username = "admin";
$password = "123";

$hash = password_hash($password, PASSWORD_DEFAULT);

$stmt = $pdo->prepare("
INSERT INTO admin(username,password)
VALUES(:username,:password)
");

$stmt->execute([
    "username"=>$username,
    "password"=>$hash
]);

echo "Admin létrehozva.";