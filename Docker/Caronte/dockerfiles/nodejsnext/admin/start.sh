#!/bin/bash

load_entrypoint_seguridad() {
    echo "Ejecutando entrypoint seguridad..." >> /root/logs/informe_next.log
    
    if [ -f /root/admin/ubseguridad/start.sh ]; then
        bash /root/admin/ubseguridad/start.sh
        echo "Entrypoint seguridad ejecutado" >> /root/logs/informe_next.log
    else
        echo "ADVERTENCIA: No se encontró /root/admin/ubseguridad/start.sh" >> /root/logs/informe_next.log
    fi
}

load_entrypoint_nginx(){
    echo "Cargando entrypoint Nginx..." >> /root/logs/informe_next.log
    
    if [ -f /root/admin/sweb/nginx/start.sh ]; then
        bash /root/admin/sweb/nginx/start.sh
        echo "Entrypoint Nginx ejecutado" >> /root/logs/informe_next.log
    else
        echo "ADVERTENCIA: start.sh de Nginx no encontrado" >> /root/logs/informe_next.log
    fi
}

workdir(){
    echo "Cambiando directorio al proyecto NextJS..." >> /root/logs/informe_next.log
    
    if [ -d /root/admin/nodenext/proyectos/pokenext ]; then
        cd /root/admin/nodenext/proyectos/pokenext
        echo "Directorio cambiado a: $(pwd)" >> /root/logs/informe_next.log
    else
        echo "ERROR: Directorio /root/admin/nodenext/proyectos/pokenext no existe" >> /root/logs/informe_next.log
        exit 1
    fi
}

dependencias-y-servicio(){
    echo "Instalando dependencias NextJS..." >> /root/logs/informe_next.log
    
    # Verificar si package.json existe
    if [ -f package.json ]; then
        npm install -g npm@latest
        npm install && echo "Dependencias instaladas" >> /root/logs/informe_next.log
        
        # Compilar el proyecto NextJS
        echo "Compilando proyecto NextJS..." >> /root/logs/informe_next.log
        npm run build && echo "Proyecto compilado exitosamente" >> /root/logs/informe_next.log
        
        # Iniciar el servidor NextJS en modo producción
        echo "Arrancando NextJS en modo producción..." >> /root/logs/informe_next.log
        HOST=0.0.0.0 PORT=3000 npm run start &
    else
        echo "ERROR: package.json no encontrado" >> /root/logs/informe_next.log
        exit 1
    fi
}

main(){
    mkdir -p /root/logs
    touch /root/logs/informe_next.log
    load_entrypoint_nginx
    load_entrypoint_seguridad
    workdir
    dependencias-y-servicio
}

main