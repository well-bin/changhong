<?php

header('content-type:text/html;charset=utf-8');//设置字符编码。
define('HOST','localhost');//主机名
define('USERNAME','root');//用户名
define('PASSWORD','');//密码
define('DBNAME','wbwb11');//数据库

$conn = @new mysqli(HOST,USERNAME,PASSWORD,DBNAME);

if($conn->connect_error){
    die('数据库连接错误'.$conn->connect_error);
}


if(isset($_POST['name'])){

    $name = $_POST['name'];
    $result=$conn->query("select * from formlistt where username = '$name'");
    //只要结果存在内容，表示数据存在用户名。
    if($result->fetch_assoc()){//存在
        echo true;//1
    }else{//不存在。
        echo false;//空
    }
}


if(isset($_POST['submit'])){
$user = $_POST['username'];
$pass = sha1($_POST['password']);
$email = $_POST['email'];
$result = $conn ->query("insert formlistt values(null,'${user}','${pass}','${email}',NOW())");
header('location:http://localhost/upanddown/second.html');
}
 
