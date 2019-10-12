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
if($_method=="GET")
{
    if(!empty($_GET))
    {
        if(isset($_GET["user_email"]) && isset($_GET["user_password"]))
        {
            $user_email=$_GET["user_email"];
            $user_password=$_GET["user_password"];
            $controlIt=$user->isCorrect($user_email, $user_password);
            if($controlIt->rowCount()==1)
            {
                $row=$controlIt->fetch(PDO::FETCH_ASSOC);
                $status_code=200;
                echo json_encode($row,JSON_PRETTY_PRINT);
            }
            else
            {
                $status_code=404;
            }
        }
        else
        {
          $status_code=400;
        }
    }
    else
    {
        $status_code=400;
    }
}
else
{
    $status_code = 400;
}
SetHeader($status_code);
?>
