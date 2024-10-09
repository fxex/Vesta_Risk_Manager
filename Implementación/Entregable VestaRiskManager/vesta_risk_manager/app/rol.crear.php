<?php
include_once '../lib/ControlAcceso.Class.php';
ControlAcceso::requierePermiso(PermisosSistema::PERMISO_ROLES);
include_once '../modelo/ColeccionPermisos.php';
$Permiso = new ColeccionPermisos();
?>
<html>
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="../lib/bootstrap-4.1.1-dist/css/bootstrap.css" />
        <link rel="stylesheet" href="../lib/open-iconic-master/font/css/open-iconic-bootstrap.css" />
        <script type="text/javascript" src="../lib/JQuery/jquery-3.3.1.js"></script>
        <script type="text/javascript" src="../lib/bootstrap-4.1.1-dist/js/bootstrap.min.js"></script>
        <title><?php echo Constantes::NOMBRE_SISTEMA; ?> - Crear Rol</title>

    </head>
    <body>
        <?php include_once '../gui/navbar.php'; ?>
        <div class="container">
            <form action="rol.crear.procesar.php" method="post">
                <div class="card">
                    <div class="card-header">
                        <h3>Crear Rol</h3>
                        <p>
                            Complete los campos a continuaci&oacute;n. 
                            Luego, presione el bot&oacute;n <b>Confirmar</b>.<br />
                            Si desea cancelar, presione el bot&oacute;n <b>Cancelar</b>.
                        </p>
                    </div>
                    <div class="card-body">
                        <h4>Propiedades</h4>
                        <div class="form-group">
                            <label for="inputNombre">Nombre</label>
                            <input type="text" name="nombre" class="form-control" id="inputNombre" placeholder="Ingrese el nombre del Rol" required="">
                        </div>
                        <hr />
                        <h4>Permisos</h4>
                        <?php foreach ($Permiso->getPermisos() as $Permiso) { ?>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="<?= $Permiso->getId(); ?>" id="rol[<?= $Permiso->getId(); ?>]" name="permiso[<?= $Permiso->getId(); ?>]" />
                                <label class="form-check-label" for="permiso">
                                    <?= $Permiso->getNombre(); ?>
                                </label>
                            </div>
                        <?php } ?>
                    </div>
                    <div class="card-footer">
                        <button type="submit" class="btn btn-outline-success">
                            <span class="oi oi-check"></span> Confirmar
                        </button>
                        <a href="roles.php">
                            <button type="button" class="btn btn-outline-danger">
                                <span class="oi oi-x"></span> Cancelar
                            </button>
                        </a>
                    </div>
                </div>
            </form>
        </div>
        <?php include_once '../gui/footer.php'; ?>
    </body>
</html>
