<?php

$righe = file_get_contents("../src/presidenti.csv");

header('Content-Type: text/plain');
echo json_encode($righe);
