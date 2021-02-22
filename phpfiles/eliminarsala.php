<?php
    $mysql=new mysqli("localhost","root","","salas");
    if ($mysql->connect_error)
      die("Problemas con la conexión a la base de datos");
  
    $mysql->query("delete from tbsalas where ID=$_REQUEST[id_param]") or
        die($mysql->error);    
    
    $mysql->close();
    
    header('Location:listasalasconacciones.php');
  ?>  
?> 