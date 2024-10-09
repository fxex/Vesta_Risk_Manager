<?php
include_once '../lib/ControlAcceso.Class.php';
ControlAcceso::requierePermiso(PermisosSistema::PERMISO_USUARIOS);
include_once '../modelo/Usuario.Class.php';
$id = $_GET["id"];
$Usuario = new Usuario($id);
?>
<html>
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="../lib/bootstrap-4.1.1-dist/css/bootstrap.css" />
        <link rel="stylesheet" href="../lib/open-iconic-master/font/css/open-iconic-bootstrap.css" />
        <script type="text/javascript" src="../lib/JQuery/jquery-3.3.1.js"></script>
        <script type="text/javascript" src="../lib/bootstrap-4.1.1-dist/js/bootstrap.min.js"></script>
        <title><?php echo Constantes::NOMBRE_SISTEMA; ?> - Eliminar Usuario</title>
    </head>
    <body>
        <?php include_once '../gui/navbar.php'; ?>
        <div class="container">
            <form action="usuario.eliminar.procesar.php" method="post">
                <div class="card">
                    <div class="card-header">
                        <h3>Eliminar Usuario</h3>
                    </div>
                    <div class="card-body">
                        <p class="alert alert-warning ">
                            <span class="oi oi-warning"></span> ATENCI&Oacute;N. Esta operaci&oacute;n no puede deshacerse.
                        </p>
                        <p>¿Est&aacute; seguro que desea eliminar el usuario <b><?= $Usuario->getNombre(); ?></b>?
                    </div>
                    <div class="card-footer">
                        <input type="hidden" name="id" class="form-control" id="id" value="<?= $Usuario->getId(); ?>" >
                        <button type="submit" class="btn btn-outline-success">
                            <span class="oi oi-check"></span> Sí, deseo eliminar
                        </button>
                        <a href="usuarios.php">
                            <button type="button" class="btn btn-outline-danger">
                                <span class="oi oi-x"></span> NO (Salir de esta pantalla)
                            </button>
                        </a>
                    </div>
                </div>
            </form>
        </div>
        <?php include_once '../gui/footer.php'; ?>
    </body>
</html>