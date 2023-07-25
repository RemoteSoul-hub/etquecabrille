<!DOCTYPE html>
<html>
<head>
    <title>Demande de Retrait d'Argent</title>
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
            <h2>Demande de Retrait d'Argent</h2>
        </div>
        <div class="content">
            <p>Bonjour Administrateur,</p>
            <p>Nous voulons vous informer que l'utilisateur {{$user->userFname}} {{$user->userLname}} a fait une demande de retrait d'argent. Voici les détails :</p>
            <p>Nom : {{$user->userFname}} {{$user->userLname}}</p>
            <p>Email : {{$user->email}}</p>
            <p>Nom Du Banque : {{$user->bankName}}</p>
            <p>Type Compte Bnacaire : {{$user->typeCompt}}</p>
            <p>Num Compte Bancaire : {{$user->numCompt}}</p>
            <p>Nous vous prions de bien vouloir vérifier cette demande et de prendre les mesures nécessaires.</p>
            <p>Si vous avez des questions ou avez besoin de plus d'informations, n'hésitez pas à nous contacter.</p>
            <p>Cordialement,</p>
        </div>
        <div class="footer">
            <p>© 2023 [Votre Entreprise]. Tous droits réservés.</p>
        </div>
    </div>
</body>
</html>
