<?php

if(isset($_SESSION["loggato"])){
    if(!$_SESSION["loggato"]){
        header("Location: formModifiche.php")
    }
}else{
    header("Location: formModifiche.php")
}

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aggiungi bollettino</title>
</head>
<body>
    <h1>Aggiungi un bollettino</h1>

    <form action="" method="post" id="formBollettino">
        <label>Inserisci il titolo: </label>
        <input type="text" id="titolo" name="titolo"><br><br>
        <label>Inserisci la data (IMPORTANTE!!! -> formato: prime 3 lettere del mese + anno, es: Set 2025): </label>
        <input type="text" id="data" name="data"><br><br>
        <label>Carica il file: </label>
        <input type="file" id="file" name="file">

        <button type="submit">Invia</button>
    </form>
</body>
</html>