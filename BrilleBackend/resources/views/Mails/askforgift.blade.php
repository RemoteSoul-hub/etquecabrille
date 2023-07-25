<!DOCTYPE html>
<html>
<head>
    <title>Notification de cadeau pour utilisateur</title>
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
            <h2>Notification d'éligibilité au cadeau</h2>
        </div>
        <div class="content">,
            <p>Cher Administrateur</p>
            <p>Nous avons le plaisir de vous informer que l'utilisateur {{$user->userFname}} {{$user->userLname}} a rempli toutes les conditions nécessaires pour recevoir un cadeau de notre part.</p>
            <p>C'est une excellente occasion pour nous de montrer notre appréciation et d'encourager l'engagement des utilisateurs envers notre marque.</p>
            <p>Veuillez procéder à la préparation et à l'envoi du cadeau à {{$user->userFname}} {{$user->userLname}} à votre convenance.</p>
            <p>Email: {{$user->email}}</p>
            <p>Si vous avez besoin de plus d'informations sur cette opération ou si vous avez d'autres questions, n'hésitez pas à nous contacter.</p>
            <p>Cordialement,</p>
        </div>
        <div class="footer">
            <p>© 2023 [Votre Entreprise]. Tous droits réservés.</p>
        </div>
    </div>
</body>
</html>
