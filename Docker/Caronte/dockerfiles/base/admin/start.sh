#!/bin/bash
# carga las variables de entono pasadas desde el D.Compose
set -e

source /root/admin/base/usuarios/mainUsuarios.sh
source /root/admin/base/ssh/mainSsh.sh

main() {
    # gestion usuario ---> getsUser.sh
    # gestion del sudo ---> gestSudo.sh
    # gestion del ssh ---> gestSsh.sh
    # ...
    touch /root/logs/informe.log
    newUser
    resuser=$?
    if [ "$resuser" -eq 0 ]
    then
        make_ssh
        make_sudo
    fi

    # encargada de dejar este contendor vivo en BGround
    #tail -f /dev/null
    ## script's que se encargar de configurar el imagen/contenedor
}

main