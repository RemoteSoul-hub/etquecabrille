@extends('include.header')
@section('title')
    Confirmer un Compte
@endsection
@section('container')
<div class="container" style="margin-top: 100px">
    <center>


        <h6 style="text-align: center">{{$user->userFname}} - {{$user->userLname}}</h6>

        @foreach ($useridentities  as $identity)
            <img src="/storage/Identities/{{$identity->identity}}" style="height: 500px;margin-bottom:20px" class="img-fluid" alt="Responsive image">
        @endforeach
        <form action="/confirmeuser" method="post">
            {{ csrf_field() }}
            <div class="d-block" style="margin-bottom: 20px;">
                <input type="hidden" name="idUser" value="{{$user->idUser}}">
                <textarea name="raison" id="" cols="30" rows="10" placeholder="En cas Ou refuser Un Compte Veuille Remplire pourqoi"></textarea>
                <div>
                    <button class="btn btn-success" name="response" value="accept">Accepter</button>
                    <button class="btn btn-danger" name="response" value="reject">Refuser</button>
                </div>
            </div>
        </form>
    </center>
</div>
@endsection
