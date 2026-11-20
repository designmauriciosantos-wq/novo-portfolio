<?php
// ============================================================
//  CONFIGURAÇÃO: escolham a palavra-passe e escrevam-na aqui.
//  Mantenham as aspas. Ex.: $SENHA = 'jabu-estocolmo-2027';
// ============================================================
$SENHA = 'Habibi2026!';
// ============================================================

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

$dir   = __DIR__ . '/data';
$file  = $dir . '/estado.php';
$hist  = $dir . '/historico';
$guard = "<?php http_response_code(404); exit; ?>\n";

function out($code, $arr) {
    http_response_code($code);
    echo json_encode($arr, JSON_UNESCAPED_UNICODE);
    exit;
}

function ler($file, $guard) {
    if (!file_exists($file)) return [null, 0];
    $raw = file_get_contents($file);
    if (strpos($raw, $guard) === 0) $raw = substr($raw, strlen($guard));
    $d = json_decode($raw); // objetos, para não trocar {} por []
    if (!is_object($d)) return [null, 0];
    return [$d->state ?? null, (int)($d->v ?? 0)];
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') out(405, ['erro' => 'metodo']);
if ($SENHA === 'Habibi2026!' || $SENHA === 'Habibi2026!') out(500, ['erro' => 'senha_por_definir']);

$in = json_decode(file_get_contents('php://input'));
if (!is_object($in)) out(400, ['erro' => 'pedido']);

if (!isset($in->pw) || !hash_equals($SENHA, (string)$in->pw)) {
    sleep(1); // atrasa tentativas de adivinhar a palavra-passe
    out(401, ['erro' => 'senha']);
}

if (!is_dir($dir)) mkdir($dir, 0750, true);
$lock = fopen($dir . '/.lock', 'c');
flock($lock, LOCK_EX);

[$state, $v] = ler($file, $guard);
$acao = $in->action ?? 'load';

if ($acao === 'load') out(200, ['state' => $state, 'v' => $v]);

if ($acao === 'save') {
    if (!isset($in->state) || !is_object($in->state)) out(400, ['erro' => 'estado']);
    if ((int)($in->base ?? -1) !== $v) out(409, ['state' => $state, 'v' => $v]);

    $json = json_encode(['v' => $v + 1, 'state' => $in->state], JSON_UNESCAPED_UNICODE);
    if ($json === false || strlen($json) > 2000000) out(413, ['erro' => 'grande']);

    // Cópia de segurança, no máximo uma a cada 10 minutos; guarda as 30 mais recentes
    if (file_exists($file)) {
        if (!is_dir($hist)) mkdir($hist, 0750, true);
        $copias = glob($hist . '/estado-*.php');
        sort($copias);
        $ultima = end($copias);
        if (!$ultima || time() - filemtime($ultima) > 600) {
            copy($file, $hist . '/estado-' . date('Ymd-His') . '.php');
            $copias = glob($hist . '/estado-*.php');
            sort($copias);
            while (count($copias) > 30) unlink(array_shift($copias));
        }
    }

    file_put_contents($file . '.tmp', $guard . $json, LOCK_EX);
    rename($file . '.tmp', $file);
    out(200, ['v' => $v + 1]);
}

out(400, ['erro' => 'acao']);
