<!DOCTYPE html>
<html>
<head>
    <title>Confirmation de Compte</title>
    <style type="text/css">
        body {
            font-family: Arial, sans-serif;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
        }
        .header {
            padding: 20px;
            background-color: #f8f8f8;
            border-bottom: 1px solid #ddd;
        }
        .content {
            padding: 30px 20px;
        }
        .footer {
            padding: 20px;
            background-color: #f8f8f8;
            border-top: 1px solid #ddd;
            text-align: center;
            color: #888;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h2>Félicitations, votre compte a été accepté !</h2>
        </div>
        <div class="content">
            <p>Bonjour {{$user->userFname}} {{$user->userLname}},</p>
            <p>Nous avons le plaisir de vous informer que votre compte a été accepté et vous pouvez maintenant vous connecter !</p>
            <p>Merci encore pour votre confiance. N'hésitez pas à nous contacter si vous avez des questions ou besoin d'assistance.</p>
            <p>Cordialement,</p>
        </div>
        <div class="footer">
            <p>© 2023 [Votre Entreprise]. Tous droits réservés.</p>
        </div>
    </div>
</body>
</html>
