<!DOCTYPE html>
<html>
<head>
    <title>Confirmation de nouvelle commande</title>
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
            <h2>Nouvelle commande locale</h2>
        </div>
        <div class="content">
            <p>MR/ {{$user->userFname}} {{$user->userLname}},</p>
            <p>Nous sommes ravis de vous informer qu'une commande a été passée dans la même ville où vous résidez !</p>
            <p>C'est une excellente nouvelle, non seulement pour notre entreprise, mais aussi pour notre communauté locale. Nous sommes ravis de voir que nos clients apprécient nos produits/services, et c'est encore plus spécial quand cela se passe juste à notre porte.</p>
            <p>Nous tenions à partager cette nouvelle avec vous et vous remercier pour le soutien que vous apportez à notre entreprise. C'est grâce à des clients comme vous que nous sommes en mesure de continuer à fournir des services de qualité.</p>
            <p>Merci encore pour votre soutien. N'hésitez pas à nous contacter si vous avez des questions ou si vous avez besoin d'assistance.</p>
            <p>Cordialement,</p>
        </div>
        <div class="footer">
            <p>© 2023 [Votre Entreprise]. Tous droits réservés.</p>
        </div>
    </div>
</body>
</html>
