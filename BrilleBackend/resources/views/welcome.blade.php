<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <script>
        window.csrfToken = '{{ csrf_token() }}';
    </script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
    <style>
        .form-signin {
            max-width: 330px;
            padding: 1rem;
        }
    </style>
    <title>Connexion</title>
</head>
<body>
    <body class="d-flex align-items-center py-4 bg-body-tertiary">
    <main class="form-signin w-100 m-auto">
      <form method="post" action="/loginadmin">
      @csrf
        {{ csrf_field() }}
        <h1 class="h3 mb-3 fw-normal">Connecter</h1>

        <div class="form-floating">Informations Non Valides
          <input type="email" class="form-control" name="email" id="floatingInput" placeholder="name@example.com">
          <label for="floatingInput">Email </label>
        </div>
        <div class="form-floating">
          <input type="password" name="password" class="form-control" id="floatingPassword" placeholder="Mot de passe">
          <label for="floatingPassword">Mot De Passe</label>
        </div>

        <button class="btn btn-primary w-100 py-2" type="submit">Connecter</button>
        <p class="mt-5 mb-3 text-body-secondary">© 2023–2024</p>
      </form>
    </main>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>



</body>
</html>
