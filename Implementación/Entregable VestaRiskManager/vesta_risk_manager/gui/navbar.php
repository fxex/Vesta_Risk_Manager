<!-- Los estilos de navbar son definidos en la libreria css de Bootstrap -->
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">

    <a class="navbar-brand" href="#">
        <img src="../lib/img/Logo-VestaRiskManager2.png" width="30" height="30" class="d-inline-block align-top" alt="">
        Vesta Risk Manager
    </a>

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="toggle navigation">
        <span class="navbar-toggler-icon"></span>   
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">

            <li class="nav-item">
                <a class="nav-link" href="../app/home.php">
                    <span class="oi oi-home" />
                    Home
                </a>
            </li>  

            <?php if (ControlAcceso::verificaPermiso(PermisosSistema::PERMISO_USUARIOS) || 
                ControlAcceso::verificaPermiso(PermisosSistema::PERMISO_ROLES) || 
                ControlAcceso::verificaPermiso(PermisosSistema::PERMISO_PERMISOS)) { ?>
            <ul class="nav navbar-nav">
            <li class="dropdown">
                <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">
                    <span class="oi oi-cog" />
                        Administrar acceso 
                </a>

                <ul class="dropdown-menu bg-dark"> <!-- arreglar clase -->
                <?php if (ControlAcceso::verificaPermiso(PermisosSistema::PERMISO_USUARIOS)) { ?>
                    <li class="nav-item">
                        <a class="nav-link" href="../app/usuarios.php">
                            <span class="oi oi-person" />
                            Usuarios
                        </a>
                    </li>
                <?php } ?>

                <?php if (ControlAcceso::verificaPermiso(PermisosSistema::PERMISO_ROLES)) { ?>
                    <li class = "nav-item">
                        <a class = "nav-link" href = "../app/roles.php">
                            <span class = "oi oi-graph" />
                            Roles
                        </a>
                    </li>
                <?php } ?>
                
                <?php if (ControlAcceso::verificaPermiso(PermisosSistema::PERMISO_PERMISOS)) { ?>
                    <li class="nav-item">
                        <a class="nav-link" href="../app/permisos.php">
                            <span class="oi oi-lock-locked" />
                            Permisos
                        </a>
                    </li>
                <?php } ?>
            </li>
            </ul>
            <?php } ?>
            
        </ul>

            <li class="nav-item">
                <a class="nav-link" href="../app/salir.php">
                    <span class="oi oi-account-logout" /> 
                    Salir
                </a>
            </li>

                

            </ul>
        </div>
    </nav>

    <div class="alert alert-info alert-dismissible fade show" role="alert">
        Ud. est&aacute; conectad@ como <strong><?= $_SESSION['usuario']->nombre; ?></strong>.
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
</div>