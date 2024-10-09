<?php
include_once '../lib/ControlAcceso.Class.php';
session_destroy();
?>

<html>
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="../lib/bootstrap-4.1.1-dist/css/bootstrap.css" />
        <link rel="stylesheet" href="../lib/open-iconic-master/font/css/open-iconic-bootstrap.css" />
        <script type="text/javascript" src="../lib/JQuery/jquery-3.3.1.js"></script>
        <script type="text/javascript" src="../lib/bootstrap-4.1.1-dist/js/bootstrap.min.js"></script>        
        <title><?php echo Constantes::NOMBRE_SISTEMA; ?> - Salir del Sistema</title>
    </head>
    <body>

        <?php include_once '../gui/navbar.php'; ?>

        <div class="container">
            <div class="card">
                <div class="card-header">
                    <h3>Salir del Sistema</h3>
                </div>
                <div class="card-body">
                    <div class="alert alert-success" role="alert">
                        Ha salido del sistema <?= Constantes::NOMBRE_SISTEMA; ?>.
                        Ud. seguir&aacute; conectado a su correo electr&oacute;nico.
                    </div>
                    <p>Elija una de las opciones a continuaci&oacute;n:</p>
                    <ul>
                        <li><b>Volver a ingresar</b>: Regresar al sistema.</li>
                        <li><b>Ir a e-mail</b>: Abre el correo electr&oacute;nico.</li>
                        <li><b>Ir a Portal UARG</b>: Abre el Portal de la UARG en otra pesta&ntilde;a.</li>
                    </ul>
                    <hr />
                    <h5 class="card-text">Opciones</h5>
                    <a href="index.php">
                        <button type="button" class="btn btn-primary">
                            <span class="oi oi-account-login"></span> Volver a Ingresar
                        </button></a>
                    <a href="http://www.gmail.com">
                        <button type="button" class="btn btn-primary">
                            <span class="oi oi-inbox"></span> Ir a e-mail
                        </button></a>
                    <a href="http://www.uarg.unpa.edu.ar" target="_blank">
                        <button type="button" class="btn btn-primary">
                            <span class="oi oi-globe"></span> Ir a Portal UARG
                        </button></a>
                </div>
            </div>
        </div>
        <?php include_once '../gui/footer.php'; ?>
    </body>
</html>

