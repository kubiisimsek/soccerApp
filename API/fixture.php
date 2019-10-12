<?php 
    ob_start();
    include_once 'config.php';
    include_once 'user.php';
    include "functions.php";
    $status_code=200;

    $URL = "https://www.sporx.com/";
    $TEAM = ""; // FROM USER
    $SEASON = "-fiksturu";

    $_method = $_SERVER["REQUEST_METHOD"];
    if($_method=="GET")
    {
        if(!empty($_GET))
        {
            if(isset($_GET["team"]))
            {
                $TEAM=$_GET["team"];
                $ch=curl_init();
                curl_setopt($ch, CURLOPT_URL, $URL."".$TEAM."".$SEASON);
                curl_setopt($ch,CURLOPT_SSL_VERIFYPEER,false);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
                $html = curl_exec($ch);
                curl_close($ch);

                $dom = new DOMDocument();
                @$dom->loadHTML($html);
                $xpath=new DOMXPath($dom);
                $rows = $xpath->query('//*[@id="anaortadiv"]/div[2]/div/div/table/tbody/tr');
                

                class MatchData{ // TEMP CLASS

                }
                
                // td[4] ->> HomeTeam Name
                // td[5]/span ->> Result score
                // td[6] ->> AwayTeam Name
                // td[7] ->> FirstHalf Score

                // item 3 ->> HomeTeam Name
                // item 4 ->> Result score
                // item 5 ->> AwayTeam Name
                // item 6 ->> FirstHalf Score
                $arr=array();
                foreach($rows as $row){
                    $data=new MatchData();
                    $td=$xpath->query('td',$row);
                    $tdSpan=$xpath->query('td[5]/div/span',$row); // MATCH RESULT IN td -> div -> span 
                    $data->homeTeamName=$td->item(3)->textContent;
                    $data->awayTeamName=$td->item(5)->textContent;
                    $data->firstHalfScore=$td->item(6)->textContent;
                    $data->matchResult=$tdSpan->item(0)->textContent;

                    array_push($arr,$data);
                }
                if(count($arr) > 0){
                    $status_code=200;
                    $res=json_encode($arr,JSON_PRETTY_PRINT);
                    echo $res;
                }
                else{
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
    SetHeader($status_code);
    
?>
