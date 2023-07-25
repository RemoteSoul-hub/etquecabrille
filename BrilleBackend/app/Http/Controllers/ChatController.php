<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ChatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function createChat($idUser)
    {
        if(!Auth::user())
            return response([
                'error' => "Veuille Connecter"
            ]);


        $chat = new Chat();
        $chat->userOne = Auth::user()->idUser;
        $chat->userTwo = $idUser;
        if($chat->save())
            return response([
                'message' => 'Le Chat a ete Cree Avec Succe'
            ]);

        return response([
            'error' => 'Une Erreur Est Suvenu'
        ]);

    }

    public function sendMessage(Request $request)
    {
        if(!Auth::user())
            return response([
                'error' => "Veuille Connecter"
            ]);

        $message = new Message();
        $message->idChat = $request->idChat;
        $message->idUser = Auth::user()->idUser;
        $message->contenu = $request->contenu;
        if($message->save()) {
            event(new \App\Events\Message(Auth::user(),$message->content));
            return response([
                'message' => "Votr Message A ete Envoyer"
            ]);
        }
        return response([
            'error' => 'error est survenu'
        ]);

    }

    public function displayMyChats()
    {
        if(!Auth::user())
            return response([
                'error' => "Veuille Connecter"
            ]);
        $myChatsArray = [];

        if($myChats = DB::table('chats')->join('users','userTwo','=','idUser')->where('chats.userOne',Auth::user()->idUser)->select('users.userLname','users.userFname')->orderBy('chats.created_at','asc')->get())
        {
            foreach ($myChats as $myChat) {
                $myChatsArray = [$myChat->userFname => $myChat->userLname];
            }
            return response($myChatsArray);
        }

        return response([
            'message' => "Vous Avez Aucune Chat"
        ]);


    }

    public function displayChat($idChat)
    {
        if(!Auth::user())
            return response([
                'error' => "Veuille Connecter"
            ]);


        if($messages = DB::table('messages')->join('users','messages.idUser','=','users.idUser')->where('idChat',$idChat)->select('messages.*','users.userFname','users.userLname','users.idUser')->orderBy('created_at','asc')->get())
            return $messages;

        return response([
            'error' => 'Un Erreur Est Survenu'
        ]);



    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Chat $chat)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Chat $chat)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Chat $chat)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Chat $chat)
    {
        //
    }
}
