<?php

session_start();

require_once("../cors.php");

session_destroy();

echo json_encode([
    "success"=>true
]);