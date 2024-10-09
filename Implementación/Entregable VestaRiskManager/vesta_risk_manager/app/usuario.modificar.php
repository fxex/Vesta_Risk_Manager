<?php
include_once '../lib/ControlAcceso.Class.php';
ControlAcceso::requierePermiso(PermisosSistema::PERMISO_USUARIOS);
include_once '../modelo/Usuario.Class.php';
include_once '../modelo/ColeccionRoles.php';
$id = $_GET["id"];
$Usuario = new Usuario($id);
$RolesSistema = new ColeccionRoles();
?>
<html>
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="../lib/bootstrap-4.1.1-dist/css/bootstrap.css" />
        <link rel="stylesheet" href="../lib/open-iconic-master/font/css/open-iconic-bootstrap.css" />
        <script type="text/javascript" src="../lib/JQuery/jquery-3.3.1.js"></script>
        <script type="text/javascript" src="../lib/bootstrap-4.1.1-dist/js/bootstrap.min.js"></script>
        <title><?= Constantes::NOMBRE_SISTEMA; ?> - Actualizar Usuario</title>
    </head>
    <body>
        <?php include_once '../gui/navbar.php'; ?>
        <div class="container">
            <form action="usuario.modificar.procesar.php" method="post">
                <div class="card">
                    <div class="card-header">
                        <h3>Actualizar Usuario</h3>
                        <p>
                            Complete los campos a continuaci&oacute;n. 
                            Luego, presione el bot&oacute;n <b>Confirmar</b>.<br />
                            Si desea cancelar, presione el bot&oacute;n <b>Cancelar</b>.
                        </p>
                    </div>
                    <div class="card-body">
                        <div class="form-group">
                            <label for="inputNombre">Nombre</label>
                            <input type="text" name="nombre" class="form-control" id="inputNombre" value="<?= $Usuario->getNombre(); ?>" placeholder="Ingrese el nombre del usuario" required="">
                        </div>
                        <div class="form-group">
                            <label for="inputEmail">Email</label>
                            <input type="email" name="email" class="form-control" id="inputEmail" value="<?= $Usuario->getEmail() ?>" placeholder="Ingrese el email del usuario" required="">
                        </div>

                        <input type="hidden" name="id" class="form-control" id="id" value="<?= $Usuario->getId(); ?>" >
                        <hr />
                        <h3>Roles</h3>
                        <?php foreach ($RolesSistema->getRoles() as $RolSistema) {
                            ?>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" 
                                       id="rol[<?= $RolSistema->getId(); ?>]" name="rol[<?= $RolSistema->getId(); ?>]"
                                       value="<?= $RolSistema->getId(); ?>" 
                                       <?php echo $Usuario->buscarRolPorId($RolSistema->getId()) ? "checked" : ""; ?> 
                                       />
                                <label class="form-check-label" for="rol">

                                    <?= $RolSistema->getNombre(); ?>

                                </label>
                            </div>
                        <?php } ?>
                    </div>
                    <div class="card-footer">
                        <button type="submit" class="btn btn-outline-success">
                            <span class="oi oi-check"></span>
                            Confirmar
                        </button>
                        <a href="usuarios.php">
                            <button type="button" class="btn btn-outline-danger">
                                <span class="oi oi-x"></span>
                                Cancelar
                            </button>
                        </a>
                    </div>
                </div>
            </form>
        </div>
          <?php include_once '../gui/footer.php'; ?>
    </body>
</html>
