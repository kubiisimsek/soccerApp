<?php
//header("Access-Control-Allow-Origin: *");
//header("Content-Type: application/json; charset=UTF-8");

include_once 'config.php';
include_once 'userstats.php';
include "functions.php";
$database=new Database();
$db=$database->getConnection();
$status_code=200;
$stats=new UserStats($db);
$_method = $_SERVER["REQUEST_METHOD"];
if($_method=="GET"){
    if(!empty($_GET)){
        if(isset($_GET["user_id"])){
                $user_id=$_GET["user_id"];
                $stmt=$stats->getStats($user_id);
                $count=$stmt->rowCount();
                if($count>0){
                    $row=$stmt->fetchAll(PDO::FETCH_ASSOC);
                    $status_code=200;
                    echo json_encode($row,JSON_PRETTY_PRINT);
                }
                else{
                    $status_code=404;
                }
        }
        else if(isset($_GET["user_stats"])){
                $user_id=$_GET["user_stats"];
                $stmt=$stats->getStatsNamesAndID($user_id);
                $count=$stmt->rowCount();
                if($count>0){
                    $row=$stmt->fetchAll(PDO::FETCH_ASSOC);
                    $status_code=200;
                    echo json_encode($row,JSON_PRETTY_PRINT);
                }
                else{
                    $status_code=404;
                }
         }
    }
}
else if($_method=="POST"){
    $data=json_decode(file_get_contents("php://input"));
    
        $stmt=$stats->addStats($data->user_id, $data->stats_name, $data->stats_hometeam, $data->stats_awayteam, $data->stats_type,$data->stats_hometeam_fh,$data->stats_hometeam_sh,$data->stats_awayteam_fh,$data->stats_awayteam_sh);
        if($stmt->rowCount() > 0)
        {
          $status_code=201;
        }
        else
        {
          $status_code=503;
        }
    

}
else{
    $status_code = 400;
}



SetHeader($status_code);
?>
