<?php
    $archivo = $_FILES['fotosala']['name'];
    $conn=mysqli_connect("localhost","root","","salas") or die("Problemas con la conexión");
    $sqlquery="insert into tbsalas(nombre, ubicacion, capacidad, admin, recurso1, recurso2, recurso3, recurso4, recurso5, recurso6, recurso7, recurso8, foto) 
    values ('$_REQUEST[nombresala]','$_REQUEST[ubicacionsala]',$_REQUEST[capacidadsala],'$_REQUEST[adminsala]',$_REQUEST[recurso1],$_REQUEST[recurso2],$_REQUEST[recurso3],$_REQUEST[recurso4],$_REQUEST[recurso5],$_REQUEST[recurso6],$_REQUEST[recurso7],$_REQUEST[recurso8],'$archivo')";
  
    if(mysqli_query($conn, $sqlquery)){
        echo "Sala guadada con exito";
    } else {
        echo "Error al intentar guardar";
    }

  ?>
