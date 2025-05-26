<?php
use PHPUnit\Framework\TestCase;

class AdminTest extends TestCase{
    private $URL = 'http://localhost/Vesta';
    public function testObtenerUsuariosInvalido(){
        $pagina = 1;
        $ch = curl_init($this->URL . "/usuarios/$pagina");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        
        $reponse = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        $data = json_decode($reponse, true);
        $this->assertArrayHasKey("error", $data);
        $this->assertEquals(403, $httpCode);
    }

    public function testObtenerUsuariosValido(){
        $jwt = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImJhYTY0ZWZjMTNlZjIzNmJlOTIxZjkyMmUzYTY3Y2M5OTQxNWRiOWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI4NjU4NTA4Mjg4OTktZDlyYW9hdnJmamVuaW5kdThxc3VuazRwMGEzZzM3dmYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI4NjU4NTA4Mjg4OTktZDlyYW9hdnJmamVuaW5kdThxc3VuazRwMGEzZzM3dmYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDY5NjI2NDUwMjYxMzE1NjUzNTIiLCJlbWFpbCI6Imh1Z29mcmV5MjAyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYmYiOjE3NDgyODg4NjUsIm5hbWUiOiJIdWdvIEZyZXkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSmliMWJhaTNIX1o0bGhIcXdaYktJWDZyVlkwWVJXcjBaQkpKVmJkV09YM0Q4QnFLdi09czk2LWMiLCJnaXZlbl9uYW1lIjoiSHVnbyIsImZhbWlseV9uYW1lIjoiRnJleSIsImlhdCI6MTc0ODI4OTE2NSwiZXhwIjoxNzQ4MjkyNzY1LCJqdGkiOiI5YmJhNTE3ZGIxYmE0MTRiZTFhYWQxYzAzYWY3MzM5MGJiMTNkZWY1In0.QH0URy3kO78A7HC4tvh9lvABNHr94dcf5-Ngu8hkPM-m3MiWYzYUQXgBimPVPXtLAxMOooH7QK6aonGv_3G4fpMO1gd-LnkZ9VH7ZIBS4G8Z7nvygDomc8NBAPaRuHf1Z9MVglFTsw1zzTwymVw5kQ7P2iyPlKBJxjIFxi6B1pyiDSvJ_Q4OU9euqmQU1hCOFUCZyeCNQmp9Y_joOcZNI1G4ZXZWzaFE95iinZqblJxX-_2JUWrpCHN4fvTY5CpunLE37rYimZ_EXX6wERGhj7YzWuZsOQ-0BifUuhe_Tmj0mR5Ii5IKOV65fGMaQkAQlaNoaN1N6K_J8K4O-43zQg";
        $pagina = 1;
        $ch = curl_init($this->URL . "/usuarios/$pagina");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Authorization: Bearer ' . $jwt
        ]);
        
        $reponse = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        $data = json_decode($reponse, true);

        $this->assertIsArray($data);
        $this->assertEquals(200, $httpCode);
    }

    public function testObtenerUsuarioCorreoValido(){
        $correo = "hugofrey202@gmail.com";
        $ch = curl_init($this->URL . "/usuario/$correo");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $reponse = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        $data = json_decode($reponse, true);

        $this->assertIsArray($data);
        $this->assertEquals(200, $httpCode);
    }

    public function testObtenerUsuarioCorreoInvalido(){
        $correo = "hugofrey202agmail.com";
        $ch = curl_init($this->URL . "/usuario/$correo");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $reponse = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        $data = json_decode($reponse, true);

        $this->assertArrayHasKey("error", $data);
        $this->assertEquals(404, $httpCode);
    }

    public function testObtenerUsuarioIdInvalido(){
        $id_usuario = 1;
        $ch = curl_init($this->URL . "/usuario/$id_usuario");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        
        $reponse = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        $this->assertEquals(403, $httpCode);
    }

    public function testObtenerUsuarioIdValido(){
        $jwt = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImJhYTY0ZWZjMTNlZjIzNmJlOTIxZjkyMmUzYTY3Y2M5OTQxNWRiOWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI4NjU4NTA4Mjg4OTktZDlyYW9hdnJmamVuaW5kdThxc3VuazRwMGEzZzM3dmYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI4NjU4NTA4Mjg4OTktZDlyYW9hdnJmamVuaW5kdThxc3VuazRwMGEzZzM3dmYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDY5NjI2NDUwMjYxMzE1NjUzNTIiLCJlbWFpbCI6Imh1Z29mcmV5MjAyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYmYiOjE3NDgyODg4NjUsIm5hbWUiOiJIdWdvIEZyZXkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSmliMWJhaTNIX1o0bGhIcXdaYktJWDZyVlkwWVJXcjBaQkpKVmJkV09YM0Q4QnFLdi09czk2LWMiLCJnaXZlbl9uYW1lIjoiSHVnbyIsImZhbWlseV9uYW1lIjoiRnJleSIsImlhdCI6MTc0ODI4OTE2NSwiZXhwIjoxNzQ4MjkyNzY1LCJqdGkiOiI5YmJhNTE3ZGIxYmE0MTRiZTFhYWQxYzAzYWY3MzM5MGJiMTNkZWY1In0.QH0URy3kO78A7HC4tvh9lvABNHr94dcf5-Ngu8hkPM-m3MiWYzYUQXgBimPVPXtLAxMOooH7QK6aonGv_3G4fpMO1gd-LnkZ9VH7ZIBS4G8Z7nvygDomc8NBAPaRuHf1Z9MVglFTsw1zzTwymVw5kQ7P2iyPlKBJxjIFxi6B1pyiDSvJ_Q4OU9euqmQU1hCOFUCZyeCNQmp9Y_joOcZNI1G4ZXZWzaFE95iinZqblJxX-_2JUWrpCHN4fvTY5CpunLE37rYimZ_EXX6wERGhj7YzWuZsOQ-0BifUuhe_Tmj0mR5Ii5IKOV65fGMaQkAQlaNoaN1N6K_J8K4O-43zQg";
        $id_usuario = 1;
        $ch = curl_init($this->URL . "/usuario/$id_usuario");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Authorization: Bearer ' . $jwt
        ]);
        
        $reponse = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        $data = json_decode($reponse, true);

        $this->assertIsArray($data);
        $this->assertFileExists(__DIR__ . "\..\..\api\bloqueo\usuario_{$id_usuario}_lock.tmp");
        $this->assertEquals(200, $httpCode);
    }

    public function testCrearUsuarioInvalido(){
        $data = [
            "nombre" => "Test",
            "correo" => "correoinvalido@gmail.com",
            "perfil" => 1
        ];
        $ch = curl_init($this->URL . "/usuario");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        
        $reponse = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        $this->assertEquals(403, $httpCode);
    }

    public function testCrearUsuarioValido(){
        $jwt = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImJhYTY0ZWZjMTNlZjIzNmJlOTIxZjkyMmUzYTY3Y2M5OTQxNWRiOWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI4NjU4NTA4Mjg4OTktZDlyYW9hdnJmamVuaW5kdThxc3VuazRwMGEzZzM3dmYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI4NjU4NTA4Mjg4OTktZDlyYW9hdnJmamVuaW5kdThxc3VuazRwMGEzZzM3dmYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDY5NjI2NDUwMjYxMzE1NjUzNTIiLCJlbWFpbCI6Imh1Z29mcmV5MjAyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYmYiOjE3NDgyODg4NjUsIm5hbWUiOiJIdWdvIEZyZXkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSmliMWJhaTNIX1o0bGhIcXdaYktJWDZyVlkwWVJXcjBaQkpKVmJkV09YM0Q4QnFLdi09czk2LWMiLCJnaXZlbl9uYW1lIjoiSHVnbyIsImZhbWlseV9uYW1lIjoiRnJleSIsImlhdCI6MTc0ODI4OTE2NSwiZXhwIjoxNzQ4MjkyNzY1LCJqdGkiOiI5YmJhNTE3ZGIxYmE0MTRiZTFhYWQxYzAzYWY3MzM5MGJiMTNkZWY1In0.QH0URy3kO78A7HC4tvh9lvABNHr94dcf5-Ngu8hkPM-m3MiWYzYUQXgBimPVPXtLAxMOooH7QK6aonGv_3G4fpMO1gd-LnkZ9VH7ZIBS4G8Z7nvygDomc8NBAPaRuHf1Z9MVglFTsw1zzTwymVw5kQ7P2iyPlKBJxjIFxi6B1pyiDSvJ_Q4OU9euqmQU1hCOFUCZyeCNQmp9Y_joOcZNI1G4ZXZWzaFE95iinZqblJxX-_2JUWrpCHN4fvTY5CpunLE37rYimZ_EXX6wERGhj7YzWuZsOQ-0BifUuhe_Tmj0mR5Ii5IKOV65fGMaQkAQlaNoaN1N6K_J8K4O-43zQg";
        $data = [
            "nombre" => "Test",
            "correo" => "correoinvalido@gmail.com",
            "perfil" => 1
        ];
        $ch = curl_init($this->URL . "/usuario");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Authorization: Bearer ' . $jwt
        ]);
        
        $reponse = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        $data = json_decode($reponse, true);

        $this->assertIsArray($data);
        $this->assertEquals(201, $httpCode);
    }

    public function testCrearUsuarioInvalidoCorreo(){
        $jwt = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImJhYTY0ZWZjMTNlZjIzNmJlOTIxZjkyMmUzYTY3Y2M5OTQxNWRiOWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI4NjU4NTA4Mjg4OTktZDlyYW9hdnJmamVuaW5kdThxc3VuazRwMGEzZzM3dmYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI4NjU4NTA4Mjg4OTktZDlyYW9hdnJmamVuaW5kdThxc3VuazRwMGEzZzM3dmYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDY5NjI2NDUwMjYxMzE1NjUzNTIiLCJlbWFpbCI6Imh1Z29mcmV5MjAyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYmYiOjE3NDgyODg4NjUsIm5hbWUiOiJIdWdvIEZyZXkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSmliMWJhaTNIX1o0bGhIcXdaYktJWDZyVlkwWVJXcjBaQkpKVmJkV09YM0Q4QnFLdi09czk2LWMiLCJnaXZlbl9uYW1lIjoiSHVnbyIsImZhbWlseV9uYW1lIjoiRnJleSIsImlhdCI6MTc0ODI4OTE2NSwiZXhwIjoxNzQ4MjkyNzY1LCJqdGkiOiI5YmJhNTE3ZGIxYmE0MTRiZTFhYWQxYzAzYWY3MzM5MGJiMTNkZWY1In0.QH0URy3kO78A7HC4tvh9lvABNHr94dcf5-Ngu8hkPM-m3MiWYzYUQXgBimPVPXtLAxMOooH7QK6aonGv_3G4fpMO1gd-LnkZ9VH7ZIBS4G8Z7nvygDomc8NBAPaRuHf1Z9MVglFTsw1zzTwymVw5kQ7P2iyPlKBJxjIFxi6B1pyiDSvJ_Q4OU9euqmQU1hCOFUCZyeCNQmp9Y_joOcZNI1G4ZXZWzaFE95iinZqblJxX-_2JUWrpCHN4fvTY5CpunLE37rYimZ_EXX6wERGhj7YzWuZsOQ-0BifUuhe_Tmj0mR5Ii5IKOV65fGMaQkAQlaNoaN1N6K_J8K4O-43zQg";
        $data = [
            "nombre" => "Test",
            "correo" => "correoinvalidoamail.com",
            "perfil" => 1
        ];
        $ch = curl_init($this->URL . "/usuario");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Authorization: Bearer ' . $jwt
        ]);
        
        $reponse = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        $data = json_decode($reponse, true);

        $this->assertIsArray($data);
        $this->assertEquals(400, $httpCode);
    }

}