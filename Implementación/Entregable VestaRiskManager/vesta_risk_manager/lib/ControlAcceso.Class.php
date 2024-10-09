<?php

session_start();
include_once 'Constantes.Class.php';
include_once '../modelo/BDColeccionGenerica.Class.php';

/**
 * Clase de constantes para el uso del sistema de Roles y Permisos.
 * Deben coincidir con los permisos de la base de datos.
 * 
 * @author Eder dos Santos <esantos@uarg.unpa.edu.ar>
 */
class PermisosSistema {

    /**
     * 
     * Permisos genéricos del sistema.
     * Se usan en funciones comunes:
     *  - Salir: Para usuarios logueados.
     *  - Ingresar: Para usuarios no logueados.
     * 
     */
    const PERMISO_SALIR = "Salir";
    const PERMISO_LOGIN = "Ingresar";

    /**
     * 
     * Permisos específicos.
     * Son aquellos permisos específicos, que se definen de acuerdo a los casos de uso.
     * 
     *      Nota: Se pueden definir nuevos permisos con un mayor nivel de especificad. 
     *      Ejemplos: PERMISO_USUARIO_ALTA, PERMISO_ROL_BAJA.
     * 
     */
    const PERMISO_USUARIOS = "Usuarios";
    const PERMISO_PERMISOS = "Permisos";
    const PERMISO_ROLES = "Roles";

    /**
     * Roles del Sistema.
     * La definición de los todos roles es Opcional, pero se requiere cargar un rol Estandar para el autoregistro de Usuarios.
     * 
     */
    const ROL_ESTANDAR = 'Usuario Comun';

}

class PermisoSesion {

    public $id;
    public $nombre;

    /**
     *
     * @var mysqli_result 
     */
    protected $datos;

}

class RolSesion {

    public $id;
    public $nombre;

    /**
     *
     * @var PermisoSesion[]
     */
    public $permisos = array();

    /**
     *
     * @var mysqli_result 
     */
    protected $datos;

    /**
     * @todo [12/07/2017] Capturar excepciones de BD para la llamada a setPermisos.
     */
    public function __construct() {
        $this->setPermisos();
    }

    public function setPermisos() {


        $this->datos = BDConexion::getInstancia()->query(""
                . "SELECT p.id, nombre "
                . "FROM " . Constantes::BD_USERS . ".permiso p "
                . "JOIN " . Constantes::BD_USERS . ".rol_permiso rp ON p.id = rp.id_permiso "
                . "WHERE rp.id_rol = {$this->id} ");

        if (!$this->datos) {
            throw new Exception(ObjetoDatos::getInstancia()->errno, ObjetoDatos::getInstancia()->error);
        }

        for ($x = 0; $x < $this->datos->num_rows; $x++) {
            $this->permisos[] = $this->datos->fetch_object("PermisoSesion");
        }
    }

}

class UsuarioSesion {

    public $id;
    public $email;
    public $nombre;

    /**
     *
     * @var mysqli_result 
     */
    protected $datos;

    /**
     *
     * @var RolSesion[] 
     */
    public $roles;

    /**
     * 
     * @param String $email_
     * @param String $nombre_
     * 
     * @throws Exception
     * @since 2.0.1 27/08/2018 - Nueva implementacion del autoregisto de usuarios. Corrige incompatibilidad con distintas versiones de PHP.
     * @todo 27/08/2018 Hacer refactoring Extract Method de la busqueda de usuario en la BD.
     * 
     * 
     */
    function __construct($email_, $nombre_) {

        $this->email = $email_;
        $this->nombre = $nombre_;

        try {
            $this->id = $this->buscarUsuarioBd();
        } catch (Exception $ex) {
            throw new Exception($ex->getMessage(), $ex->getCode());
        }
        
        if (!$this->id){
            try {
                // Mostrar mensaje de error
                $error_message = "Usuario ingresado no registrado. Solicite ser registrado por 
                                  un administrador del sistema e intentelo de nuevo.";

                // Redirigir a la página principal
                header("Location: index.php?error=" . urlencode($error_message));
            } catch (Exception $ex) {
                throw new Exception($ex->getMessage(), $ex->getCode());
            }
        }
            
        $this->setRoles();

    }

    public function buscarUsuarioBd() {

        /* Buscar usuario en la BD */
        $this->datos = BDConexion::getInstancia()->query(""
                . "SELECT id "
                . "FROM " . Constantes::BD_USERS . ".usuario "
                . "WHERE email = '{$this->email}' ");

        if (!$this->datos) {
            throw new Exception(BDConexion::getInstancia()->error, BDConexion::getInstancia()->errno);
        }

        return $this->datos->fetch_assoc()['id'];
    }

    /**
     * 
     * Crear un usuario estándar a partir del login con una cuenta Google.
     * Registra los datos en la base de datos. Tablas: usuario, usuario_google, usuario_rol.
     * 
     * @return Int id del usuario creado en la base de datos.
     * 
     */
    function registrarUsuario() {

        BDConexion::getInstancia()->autocommit(false);
        BDConexion::getInstancia()->begin_transaction();

        $this->datos = BDConexion::getInstancia()->query(""
                . "INSERT INTO " . Constantes::BD_USERS . ".usuario "
                . "VALUES (NULL, '{$this->nombre}', '{$this->email}')");

        if (!$this->datos) {
            BDConexion::getInstancia()->rollback();
            throw new Exception(BDConexion::getInstancia()->error, BDConexion::getInstancia()->errno);
        }
        $this->id = (Int) BDConexion::getInstancia()->insert_id;

        $this->datos = BDConexion::getInstancia()->query(""
                . "INSERT INTO " . Constantes::BD_USERS . ".usuario_rol "
                . "SELECT {$this->id}, id "
                . "FROM " . Constantes::BD_USERS . ".rol "
                . "WHERE nombre = '" . PermisosSistema::ROL_ESTANDAR . "'");

        if (!$this->datos) {
            BDConexion::getInstancia()->rollback();
            throw new Exception(BDConexion::getInstancia()->error, BDConexion::getInstancia()->errno);
        }

        BDConexion::getInstancia()->commit();
        BDConexion::getInstancia()->autocommit(true);
    }

    public function setRoles() {

        $this->datos = BDConexion::getInstancia()->query(""
                . "SELECT r.id, r.nombre "
                . "FROM " . Constantes::BD_USERS . ".usuario u "
                . "JOIN " . Constantes::BD_USERS . ".usuario_rol ur ON (u.id = ur.id_usuario) "
                . "JOIN " . Constantes::BD_USERS . ".rol r ON (r.id = ur.id_rol) "
                . "WHERE u.id = {$this->id} ");

        for ($x = 0; $x < $this->datos->num_rows; $x++) {
            $this->roles[] = $this->datos->fetch_object("RolSesion");
        }
    }

}

/**
 * 
 * Clase para mantener control de acceso al sistema.
 * @author Eder dos Santos <esantos@uarg.unpa.edu.ar>
 * 
 */
class ControlAcceso {

    public $datos;
    public $ubicacion;

    /**
     * 
     * @since v2.0 2017-08-14
     * Desactiva el autoregistro de usuarios.
     * 
     * @author Eder dos Santos <esantos@uarg.unpa.edu.ar>
     * @todo [14/08/2017] Terminar el tratamiento de error caso el Usuario no exista.
     * 
     */
    function __construct() {

        $this->ubicacion = Constantes::SERVER . $_SERVER["PHP_SELF"];


        /**
         * Verificación Inicial del Usuario caso la página no sea el index.
         */
        if ($this->ubicacion != Constantes::HOMEURL) {
            unset($_SESSION["HTTP_REFERER"]);
            self::verificaLogin();
        } else {
            $_SESSION["HTTP_REFERER"] = Constantes::HOMEURL;
        }

        /**
         * Crea la sesión del Usuario caso la página de origen de los datos pasados por formulario sea el index.
         */
        if (isset($_SESSION["HTTP_REFERER"]) && $_SESSION["HTTP_REFERER"] == Constantes::HOMEURL && isset($_POST['email'])) {
            try {
                $this->creaSesion($_POST['email'], $_POST['nombre']);
            } catch (Exception $e) {
                echo "<script>alert('{$e->getMessage()}');</script>";
                die($e->getMessage());
            }
            $this->redireccionaIndex();
        }

        /**
         * Luego de loguear, redireccion al index correspondiente a cada usuario.
         */
        if (
                ($this->ubicacion == Constantes::HOMEURL) &&
                (isset($_SESSION['usuario'])) &&
                (is_a($_SESSION['usuario'], 'UsuarioGoogle'))
        ) {
            $this->redireccionaIndex();
        }
    }

    /**
     * 
     * Verifica si el usuario posee un permiso y en caso contrario lo redirecciona a la Home.
     * 
     * @param String $permiso_
     * @return void 
     * 
     * @author Eder dos Santos <esantos@uarg.unpa.edu.ar>
     * 
     */
    static function requierePermiso($permiso_) {
        if (!self::verificaPermiso($permiso_, $_SESSION['usuario'])) {
            header("Location: " . Constantes::HOMEURL);
        }
    }

    /**
     * 
     * Verifica si un usuario posee un permiso específico.
     * @static
     * 
     * @param String $permiso_
     * @param UsuarioSesion $Usuario Obtenido de la Sesion
     * @return Boolean Description
     * 
     */
    static function verificaPermiso($permiso_) {
        $Usuario = $_SESSION['usuario'];
        if ($Usuario == null) {
            return false;
        }
        foreach ($Usuario->roles as $Rol) {
            foreach ($Rol->permisos as $Permiso) {
                if ($permiso_ == $Permiso->nombre) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Verifica si el usuario está logueado en el sistema (cargado en la sesión)
     * @static
     * 
     * @return mixed Redirecciona a la Home del sistema caso el usuario no esté logueado.
     */
    static function verificaLogin() {
        if (!isset($_SESSION['usuario']) || (!is_a($_SESSION['usuario'], "UsuarioSesion"))) {
            header("Location: " . Constantes::HOMEURL);
        }
    }

    /**
     * 
     * @param type $email_
     * @param type $metodo_
     * @static
     * 
     * @todo [15/06/2017] El método está pensado para instanciar usuarios Google. Se debe generalizar.
     * @since v. 2.0 2017-08-14 - El método deja de ser estático. Autoregistro desactivado.
     * 
     * @author Eder dos Santos <esantos@uarg.unpa.edu.ar>
     * 
     */
    function creaSesion($email_, $nombre_ = null) {
        try {
            $Usuario = new UsuarioSesion($email_, $nombre_);
            // $Usuario->buscarUsuarioBd();
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
        $_SESSION['usuario'] = $Usuario;
    }

    /**
     * 
     */
    function redireccionaIndex() {
        $this->ubicacion = Constantes::HOMEAUTH;
        header("Location: {$this->ubicacion}");
    }

}

$ControlAcceso = new ControlAcceso();
