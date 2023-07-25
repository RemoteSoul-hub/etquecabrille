<!DOCTYPE html>
<html>
<head>
    <title>Confirmation de Cadeau</title>
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
            <h2>Félicitations pour votre cadeau !</h2>
        </div>
        <div class="content">
            <p>Bonjour {{$user->userFname}} {{$user->userLname}},</p>
            <p>Nous avons le plaisir de vous informer que vous avez rempli toutes les conditions nécessaires pour recevoir un cadeau de notre part !</p>
            <p>C'est une façon pour nous de vous remercier pour votre fidélité et votre soutien à notre entreprise. Nous apprécions grandement votre engagement envers notre marque et nous sommes ravis de pouvoir vous offrir ce petit quelque chose en retour.</p>
            <p>Nous vous enverrons prochainement des détails supplémentaires concernant votre cadeau. Restez à l'écoute !</p>
            <p>Merci encore pour votre soutien. N'hésitez pas à nous contacter si vous avez des questions ou besoin d'assistance.</p>
            <p>Cordialement,</p>
            <p>[Votre Nom]</p>
            <p>[Votre Entreprise]</p>
        </div>
        <div class="footer">
            <p>© 2023 [Votre Entreprise]. Tous droits réservés.</p>
        </div>
    </div>
</body>
</html>
