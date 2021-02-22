<?php
if($_FILES["file"]["name"] != ''){
    $archivo = basename($_FILES['file']['name']);
    $locationFile = '../uploads/' . $archivo;
    move_uploaded_file($_FILES["file"]["tmp_name"], $locationFile);
    echo $locationFile;
}
?>