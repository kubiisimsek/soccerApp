<?php
class UserStats{
    private $conn;
    private $table="stats_tbl";

    // CONSTRUCTOR
    public function __construct($db){
        $this->conn=$db;
    }

    function addStats($user_id,$stats_name,$hometeam,$awayteam,$type,$home_fh,$home_sh,$away_fh,$away_sh){
        $user_stats=[
            'user_id' => $user_id,
            'stats_name' => $stats_name,
        ];
        $query=$this->conn->prepare("INSERT INTO user_stats_tbl(user_id,stats_name) VALUES (:user_id,:stats_name)");
        $query->execute($user_stats);
        $id = $this->conn->lastInsertId();
        $data = [
            'user_stats_id' => $id,
            'hometeam' => $hometeam,
            'awayteam' => $awayteam,
            'stats_type' => $type,
            'home_fh' => $home_fh,
            'home_sh' => $home_sh,
            'away_fh' => $away_fh,
            'away_sh' => $away_sh
        ];
        $query=$this->conn->prepare("INSERT INTO stats_tbl(user_stats_id,stats_hometeam,stats_awayteam,stats_type,stats_hometeam_fh,stats_hometeam_sh,stats_awayteam_fh,stats_awayteam_sh) VALUES (:user_stats_id,:hometeam,:awayteam,:stats_type,:home_fh,:home_sh,:away_fh,:away_sh)");
        $query->execute($data);
        return $query;
    }

    function appendStats($user_stats_id,$hometeam,$awayteam,$type,$home_fh,$home_sh,$away_fh,$away_sh){
        $data = [
            'user_stats_id' => $user_stats_id,
            'hometeam' => $hometeam,
            'awayteam' => $awayteam,
            'stats_type' => $type,
            'home_fh' => $home_fh,
            'home_sh' => $home_sh,
            'away_fh' => $away_fh,
            'away_sh' => $away_sh
        ];
        $query=$this->conn->prepare("INSERT INTO stats_tbl(user_stats_id,stats_hometeam,stats_awayteam,stats_type,stats_hometeam_fh,stats_hometeam_sh,stats_awayteam_fh,stats_awayteam_sh) VALUES (:user_stats_id,:hometeam,:awayteam,:stats_type,:home_fh,:home_sh,:away_fh,:away_sh)");
        $query->execute($data);
        return $query;
    }

    function getStats($user_id){
        $data=[
            'id'=>$user_id
        ];
        $query=$this->conn->prepare("SELECT * FROM stats_tbl S INNER JOIN user_stats_tbl US ON S.user_stats_id=US.ID WHERE US.user_id=:id");
        $query->execute($data);
        return $query;
    }

    function getStatsNamesAndID($user_id){
        $data=[
            'id'=>$user_id
        ];
        $query=$this->conn->prepare("SELECT ID,stats_name FROM user_stats_tbl US  WHERE US.user_id=:id");
        $query->execute($data);
        return $query;
    }
}

?>
