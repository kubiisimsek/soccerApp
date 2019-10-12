<?php
    $ch=curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://www.tuttur.com/draw/events/type/football");
    curl_setopt($ch,CURLOPT_SSL_VERIFYPEER,false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $html=curl_exec($ch);
    $json = json_decode($html);
    echo json_encode($json, JSON_PRETTY_PRINT);
    curl_close($ch);   
?>

