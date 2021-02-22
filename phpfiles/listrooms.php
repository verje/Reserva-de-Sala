<!doctype html>
<html>
<head>
<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Salas</title>
    <script src="https://code.jquery.com/jquery-3.5.1.js"
        integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="columnas2.css">
    <link rel="stylesheet" href="navbar.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet">
</head>  
<body>
  
  <?php
    $mysql=new mysqli("localhost","root","","salas");
    if ($mysql->connect_error)
      die("Problemas con la conexión a la base de datos");
  
    $registros=$mysql->query("select * from tbsalas") or
      die($mysql->error);
    
    echo '<div class="col-6">'; 
        echo '<table class="tabla">';
        echo '<tr><th>Nombre</th><th>Ubicacion</th><th>Capacidad</th><th>Encargado</th><th>Eliminar</th><th>Editar</th></tr>';
        while ($reg=$registros->fetch_array())
        {
        echo '<tr>';
            echo '<td>';
            echo $reg['nombre'];
            echo '</td>';      
            echo '<td>';
            echo $reg['ubicacion'];      
            echo '</td>';      
            echo '<td>';
            echo $reg['capacidad'];      
            echo '</td>';      
            echo '<td>';
            echo $reg['admin'];      
            echo '</td>'; 
            echo '<td>';                
            echo '<a href="eliminar.php?id_param='.$reg['ID'].'"><i class="fa fa-trash-o"></i></a>';
            echo '</td>';
            echo '<td>';
            echo '<a href="modificar.php?id_param='.$reg['ID'].'"><i class="fa fa-pencil-square-o"></i></a>';
            echo '</td>';      
        echo '</tr>';      
        }    
        echo '<tr><td colspan="6">';
        echo '<a href="alta.php">Add new room</a>';
        echo '</td></tr>';
        echo '<table>';    
    echo '</div>'; 
    $mysql->close();

  ?>  
</body>
</html>