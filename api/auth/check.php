<?php

session_start();

require_once("../cors.php");

echo json_encode([

    "loggedIn"=>isset($_SESSION["admin"])

]);