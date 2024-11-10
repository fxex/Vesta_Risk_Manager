<?php
use PHPUnit\Framework\TestCase;
require_once __DIR__ . "/../api/controllers/gestorRiesgo.php";

function decodeJWT($jwt) {
    // Divide el JWT en sus partes: header, payload y signature
    list($headerEncoded, $payloadEncoded, $signatureEncoded) = explode('.', $jwt);
    
    // Decodifica el header y el payload
    $header = json_decode(base64_decode(strtr($headerEncoded, '-_', '+/')), true);
    $payload = json_decode(base64_decode(strtr($payloadEncoded, '-_', '+/')), true);
    
    // Retorna el header y el payload
    return ['header' => $header, 'payload' => $payload];
}

$jwt = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImU4NjNmZTI5MmZhMmEyOTY3Y2Q3NTUxYzQyYTEyMTFiY2FjNTUwNzEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI4NjU4NTA4Mjg4OTktZDlyYW9hdnJmamVuaW5kdThxc3VuazRwMGEzZzM3dmYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI4NjU4NTA4Mjg4OTktZDlyYW9hdnJmamVuaW5kdThxc3VuazRwMGEzZzM3dmYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDY5NjI2NDUwMjYxMzE1NjUzNTIiLCJlbWFpbCI6Imh1Z29mcmV5MjAyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYmYiOjE3MzExOTI3NzQsIm5hbWUiOiJIdWdvIEZyZXkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSmliMWJhaTNIX1o0bGhIcXdaYktJWDZyVlkwWVJXcjBaQkpKVmJkV09YM0Q4QnFLdi09czk2LWMiLCJnaXZlbl9uYW1lIjoiSHVnbyIsImZhbWlseV9uYW1lIjoiRnJleSIsImlhdCI6MTczMTE5MzA3NCwiZXhwIjoxNzMxMTk2Njc0LCJqdGkiOiJhYmJlNWU5OWZkZWM5YzY1NDkxYjM3Yzk1MzQ3NjRkYjZmZmJiOGNjIn0.m1H94rO-K8FEFKs7KnNtk_VFU8pFr3gs9SyzUmxhwnxUpNKtx3Q2THKbMz1zO9Hr-Ec8DSpjQKv2Z59TbogI-sLPO4K9wJ__vu8wFIw3kNX3RRQRrxDT8DSAGvwE3Fn4jV1MdGvtFUxqN4fNwpXN3DrllyI-oqIBATiE1m4N6bXmPGLrDSAt4t09SsRjtJCMT3alLCR32wV0G3WEjwthOFTjS6CwyRH9QuesiuP_cALKatQPngrk9WvxUpVruYgQWp7oAe4gcyW8FDgT2hRdQym8c3TOvKzyFGzqQLnxDJDTgBwbqu2-MXXE6V2Ww5YnlM4VHrHYMfuuVimKd9nnmw";


$decoded = decodeJWT($jwt);

echo "Header:\n";
print_r($decoded['header']);
echo "Payload:\n";
print_r($decoded['payload']["email"]);