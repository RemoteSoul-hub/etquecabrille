<!DOCTYPE html>
<html>
<head>
    <title>Compte refusé</title>
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
            <h2>Votre compte a été refusé</h2>
        </div>
        <div class="content">
            <p>Bonjour {{$user->userFname}} {{$user->userLname}},</p>
            <p>Nous sommes désolés de vous informer que votre compte a été refusé pour la raison suivante : {{$raison}}</p>
            <p>Nous vous encourageons à revoir les informations que vous avez fournies et à soumettre une nouvelle demande si vous estimez que cela a été une erreur.</p>
            <p>Si vous avez besoin de plus d'informations ou d'assistance, n'hésitez pas à nous contacter.</p>
            <p>Cordialement,</p>
        </div>
        <div class="footer">
            <p>© 2023 [Votre Entreprise]. Tous droits réservés.</p>
        </div>
    </div>
</body>
</html>
