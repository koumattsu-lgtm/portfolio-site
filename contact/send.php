<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
require 'PHPMailer/src/Exception.php';

if($_SERVER["REQUEST_METHOD"] == "POST"){
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'あなたのgmail@gmail.com';  // 送信元Gmail
        $mail->Password   = 'アプリパスワード';          // Gmailのアプリパスワード
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;

        $mail->setFrom($email, $name);                 // 送信者情報
        $mail->addAddress('送信先メール@gmail.com');  // 受信先メール

        $mail->Subject = $subject;
        $mail->Body    = $message;

        $mail->send();
        echo "<p>送信完了しました。ありがとうございました。</p>";
    } catch (Exception $e) {
        echo "<p>送信に失敗しました: {$mail->ErrorInfo}</p>";
    }
} else {
    echo "<p>不正なアクセスです。</p>";
}
?>
