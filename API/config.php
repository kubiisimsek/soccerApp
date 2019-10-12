<?php
class Database{
    private $host="localhost";
    private $db="kubisims_iddia";
    private $username="username";
    private $pass="pass";
    public $conn;
    public function getConnection(){
        $this->conn=null;
        try{
            $this->conn=new PDO("mysql:host=".$this->host.";dbname=".$this->db.";charset=utf8",$this->username,$this->pass);
            $this->conn->exec("SET CHARSET 'utf8'");
        }
        catch(PDOException $exp){
            echo "Connection error:".$exp->getMessage();
        }
        return $this->conn;
      }
}
?>
