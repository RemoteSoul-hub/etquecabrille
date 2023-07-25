@extends('include.header')

@section('title')
Dashboard
@endsection

@section('container')
    <div class="container">
        <h1 style="margin-top:100px">
            DASHBOARD
        </h1>

        <h6 style="margin:20px 0px">Statistique</h6>

        <div class="d-flex card-contain">
            <div class="card mr-3" style="width: 18rem; margin-right:10px;">
                <div class="card-body">
                  <h5 class="card-title">Nombre Utulisateurs: {{$users}}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">Utilisateurs</h6>

                  <a href="/users" class="card-link">Utilisateurs</a>

                </div>
            </div>
            <div class="card" style="width: 18rem; margin-right:10px;">
                <div class="card-body">
                  <h5 class="card-title">Nombre Particuliers: {{$particulier}}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">Particuliers</h6>
                  <a href="/users" class="card-link">Utilisateurs</a>

                </div>
            </div>
            <div class="card" style="width: 18rem; margin-right:10px;">
                <div class="card-body">
                  <h5 class="card-title">Nombre Professionnels:{{$professionel}}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">Professionnels</h6>
                  <a href="/users" class="card-link">Utilisateurs</a>
                </div>
            </div>
            <div class="card" style="width: 18rem; margin-right:10px;">
                <div class="card-body">
                  <h5 class="card-title">Nombre Commnades:{{$commande}}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">Commandes</h6>

                  <a href="/orders" class="card-link">Commandes</a>
                </div>
            </div>
        </div>
    </div>

@endsection
