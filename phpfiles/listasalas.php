<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tablas</title>
    <link rel="stylesheet" href="columnas2.css">
    <link rel="stylesheet" href="tablas.css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet">
</head>

<body>
    <?php
        $mysql=new mysqli("localhost","root","","salas");
        if ($mysql->connect_error)
        die("Problemas con la conexión a la base de datos");
    
        $registros=$mysql->query("select * from tbsalas") or
        die($mysql->error);
    ?>
    <div class="col-12 col-xs-12 align-con-cen container-table">
        <div class="col-8 col-xs-12 border-table">
            <table class="col-12 col-xs-12">
                <caption>SALAS DE REUNION</caption>
                <thead>
                    <tr>
                        <th class="row-img"></th>
                        <th>Nombre</th>
                        <th>Ubicación</th>
                        <th>Capacidad</th>
                        <th>Encargado</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                <?php
                    while ($reg=$registros->fetch_array()) {?>
                        <tr>
                            <td class="row-img"><img class="img-fit-table" src=<?php echo './uploads/'.$reg['foto'];?> alt="">
                            </td>
                            <td><?php echo $reg['nombre'];?></td>
                            <td><?php echo $reg['ubicacion'];?></td>
                            <td><?php echo $reg['capacidad'];?></td>
                            <td><?php echo $reg['admin'];?></td>
                            <td><button class="btn-reservar">Reservar</button></td>
                        </tr>
                <?php  } ?>
                </tbody>
            </table>
        </div>

    </div>

</body>

</html>