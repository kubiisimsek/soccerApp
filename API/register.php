<?php
//header("Access-Control-Allow-Origin: *");
//header("Content-Type: application/json; charset=UTF-8");

include_once 'config.php';
include_once 'user.php';
include "functions.php";
$database=new Database();
$db=$database->getConnection();
$status_code=200;
$user=new User($db);
$_method = $_SERVER["REQUEST_METHOD"];
if($_method=="POST")
{
  $data=json_decode(file_get_contents("php://input"));
  $cntrl=$user->isEmailBelong($data->user_email);
  if($cntrl->rowCount() > 0){
    $status_code=405;
  }
  else{
    $stmt=$user->register($data->user_name, $data->user_surname, $data->user_password, $data->user_email, $data->user_team, $data->user_phone);
    if($stmt->rowCount() > 0)
    {
      $status_code=201;
    }
    else
    {
      $status_code=503;
    }
  }
}
else{
    $status_code = 400;
}
SetHeader($status_code);
?>
