<?php
header('Content-Type: application/json');

$arquivo = 'votos.json';

if (!file_exists($arquivo)) {
    echo json_encode([]);
    exit;
}

echo file_get_contents($arquivo);
?>
