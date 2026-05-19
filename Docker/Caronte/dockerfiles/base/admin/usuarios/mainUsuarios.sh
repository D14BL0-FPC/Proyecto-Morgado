#!/bin/bash
#set -e

check_usuario(){
    if grep -q fran /etc/passwd
    then    
        echo "fran se encuentra en el sistema" >> /root/logs/informe.log
        return 1
    else
        echo "fran no se encuentra en el sistema" >> /root/logs/informe.log
        return 0
    fi
}

check_home(){
    if [ ! -d "/home/fran" ]
    then
        echo "/home/fran no existe" >> /root/logs/informe.log
        return 0 #true
    else
        echo "/home/fran existe" >> /root/logs/informe.log
        return 1 #false
    fi
}
newUser(){
    check_usuario
    # `cat /et/password | grep morgado`
    if [ "$?" -eq 0 ] #no existe usuario en passwd
    then 
        check_home
        if [ "$?" -eq 0 ]
        then
            useradd -rm -d /home/fran -s /bin/bash fran
            echo "fran:fran" | chpasswd
            echo "Bienvenido fran a tu empresa ..." > /home/fran/bienvenida.txt
            echo "--> Usario fran creado" >> /root/logs/informe.log
        else
            echo "--> Usuario fran No creado, existe home" >> /root/logs/informe.log
        fi
    else
        echo "--> Usuario fran No creado, existe en passwd" >> /root/logs/informe.log
    fi
}