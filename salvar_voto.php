<?php
$data = json_decode(file_get_contents("php://input"), true);
if (!isset($data['opcao'])) exit;

$arquivo = 'votos.json';

if (!file_exists($arquivo)) {
  file_put_contents($arquivo, json_encode([]));
}

$votos = json_decode(file_get_contents($arquivo), true);

$id = $data['opcao'];
if (!isset($votos[$id])) $votos[$id] = 0;

$votos[$id] += 1;

file_put_contents($arquivo, json_encode($votos, JSON_PRETTY_PRINT));
echo "OK";
?>
