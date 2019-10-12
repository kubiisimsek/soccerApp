<?php
class User{
    private $conn;
    private $table="user_tbl";
    //OBJECTS
    private $user_id;
    private $user_name;
    private $user_surname;
    private $user_email;
    private $user_team;
    private $user_password;
    // CONSTRUCTOR
    public function __construct($db){
        $this->conn=$db;
    }
    function isCorrect($user_email, $user_password ){
        $query=$this->conn->prepare("SELECT * FROM user_tbl WHERE user_tbl.user_email=:first AND user_tbl.user_password=:second");
        $query->execute([
            'first' => $user_email,
            'second' => $user_password
        ]);
        return $query;
    }
    function isEmailBelong($user_email){
        $query=$this->conn->prepare("SELECT * FROM user_tbl WHERE user_tbl.user_email=:first");
        $query->execute([
            'first' => $user_email
        ]);
        return $query;
    }
    function register($name, $surname, $password, $email, $team, $phone)
    {
      $data = [
          'name' => $name,
          'surname' => $surname,
          'password' => $password,
          'email' => $email,
          'team' => $team,
          'phone' => $phone
      ];
      $stmt= $this->conn->prepare("INSERT INTO user_tbl (user_name, user_surname, user_email, user_password, user_team, user_phone) VALUES (:name, :surname, :email ,:password, :team, :phone)");
      $stmt->execute($data);
      return $stmt;

    }
    function foodWithCatID($food_categoryId){
        $query=$this->conn->prepare("SELECT F.food_id,F.food_name FROM food_tbl F WHERE F.food_categoryId=?");
        $query->execute(array($food_categoryId));
        return $query;
    }
}
?>
