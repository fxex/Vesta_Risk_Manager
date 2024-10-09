<?php
include_once '../lib/ControlAcceso.Class.php';
ControlAcceso::requierePermiso(PermisosSistema::PERMISO_ROLES);
include_once '../modelo/ColeccionRoles.php';
$ColeccionRoles = new ColeccionRoles();
?>

<html>
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="../lib/bootstrap-4.1.1-dist/css/bootstrap.css" />
        <link rel="stylesheet" href="../lib/open-iconic-master/font/css/open-iconic-bootstrap.css" />
        <script type="text/javascript" src="../lib/JQuery/jquery-3.3.1.js"></script>
        <script type="text/javascript" src="../lib/bootstrap-4.1.1-dist/js/bootstrap.min.js"></script>        
        <title><?php echo Constantes::NOMBRE_SISTEMA; ?> - Roles</title>
    </head>
    <body>

        <?php include_once '../gui/navbar.php'; ?>
        <div class="container">
            <div class="card">
                <div class="card-header">
                    <h3>Roles</h3>
                </div>
                <div class="card-body">
                <table class="table table-hover table-sm">
                    <p>
                        <a href="rol.crear.php">
                            <button type="button" class="btn btn-success">
                                <span class="oi oi-plus"></span> Nuevo Rol
                            </button>
                        </a>
                    </p>
                    <tr class="table-info">
                        <th>Nombre</th>
                        <th>Opciones</th>
                    </tr>

                    <?php foreach ($ColeccionRoles->getRoles() as $Rol) {
                        ?>
                        <tr>
                            <td><?= $Rol->getNombre(); ?></td>
                            <td>
                                <a title="Ver detalle" href="rol.ver.php?id=<?= $Rol->getId(); ?>">
                                    <button type="button" class="btn btn-outline-info">
                                        <span class="oi oi-zoom-in"></span>
                                    </button>
                                </a>
                                <a title="Modificar" href="rol.modificar.php?id=<?= $Rol->getId(); ?>">
                                    <button type="button" class="btn btn-outline-warning">
                                        <span class="oi oi-pencil"></span>
                                    </button>
                                </a>
                                <a title="Eliminar" href="rol.eliminar.php?id=<?= $Rol->getId(); ?>">
                                    <button type="button" class="btn btn-outline-danger">
                                        <span class="oi oi-trash"></span>
                                    </button>
                                </a>
                            </td>
                        </tr>
                    <?php } ?>
                </table>
            </div>
        </div>
    </div>
    <?php include_once '../gui/footer.php'; ?>
</body>
</html>

