<?php

namespace App\Http\Controllers;

use App\Mail\AcceptUser;
use App\Mail\AskForGift;
use App\Mail\RejectUser;
use App\Mail\WithdrawRequest;
use App\Mail\YouGetGift;
use App\Models\Adresse;
use App\Models\Availability;
use App\Models\Identity;
use App\Models\MakeOrder;
use App\Models\Order;
use App\Models\Provide;
use App\Models\User;
use App\Models\Withdraw;
use Illuminate\Console\View\Components\Confirm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use PHPUnit\Exception;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Auth::user());
    }


    public function displayDashboard(){
        $users = User::where('trashUser',0)->count();
        $particulier = User::where('trashUser',0)->where('typeUser',2)->count();
        $professionel = User::where('trashUser',0)->where('typeUser',1)->count();
        $commande = Order::count();

        return view('admin.dashboard',['users' => $users,'particulier'=>$particulier,'professionel'=>$professionel,'commande'=>$commande]);
    }

    public function displayUsers(){
        if(!Auth::user() || !Auth::user()->typeUser == 0)
            return response([
                'message' => "Veuille Connecter"
            ]);


        $users = DB::table('users as u')
                    ->leftJoin('adresses','u.idUser','=','adresses.idUser')

                    ->get();
        return view('admin.users',['users'=>$users]);
    }

    public function displayIdentity($idUser){
        if(!Auth::user() || !Auth::user()->typeUser == 0)
            return response([
                'message' => "Veuille Connecter"
            ]);

        $user = DB::table('users')
                            ->where('users.idUser',$idUser)
                            ->first();

        $userIdentities = DB::table('identities')
                            ->where('identities.idUser',$idUser)
                            ->get();

        return view('admin.identityconfirm',['user'=>$user,'useridentities'=>$userIdentities]);
    }


    public function confirmerUtulisateur(Request $request){

        if(!Auth::user() || !Auth::user()->typeUser == 0)
        return response([
            'message' => "Veuille Connecter"
        ]);
        $response = $request->input('response');

        if($response == 'accept') {
            $user = User::where('idUser',$request->idUser)->first();
            $user->trashUser = 0;
            if($user->save()){
                Mail::to($user->email)->send(new AcceptUser($user));
                return redirect('/users')->with('message',"L'utilisateur a été confirmé avec succès.");
            }
        } else if($response == 'reject') {
            $user = User::where('idUser',$request->idUser)->first();
            $user->trashUser = -1;
            if($user->save()){
                Mail::to($user->email)->send(new RejectUser($user,$request->raison));
                return redirect('/users')->with('message',"L'utilisateur a été refusé");
            }
        }


    }

    public function storeUser(Request $request)
    {
        try {
            try {
                $request->validate([
                    'email' => 'unique:users|required'
                ]);
            } catch (\Exception $exception) {
                return back()->with('ErrorEmail', 'Ce Eamil Est Deja Utuliser');
            }
            $user = new User();
            $adresse = new Adresse();
            $user->userFname = $request->fname;
            $user->userLname = $request->lname;
            $user->email = $request->email;
            $hashedPassword = Hash::make($request->password);
            $user->password = $hashedPassword;
            $user->telUser = $request->telUser;
            $user->typeUser = $request->typeUser;
            $user->bankName = $request->bankName;
            $user->typeCompt = $request->typeCompt;
            $user->numCompt = $request->numCompt;
            $user->uniqueCode = $user->id . Str::random(40);
            $adresse->adrs = $request->adrs;
            $adresse->ville = $request->ville;
            if($request->typeUser == 1){
                $user->trashUser = 1;
            }
            if($request->ref){
                $user->ref = $request->ref;
            }
            if ($user->save()) {
                $idUser = $user->idUser;
                $adresse->idUser = $idUser;
                $adresse->save();
            }
            if($request->typeUser == 1){
                        foreach ($request->services as $service) {
                            $provide = new Provide();
                            $provide->idService = $service;
                            $provide->idUser = $user->idUser;
                            $provide->save();
                        }

                        if($request->hasfile('myIdentities'))
                        {
                            foreach($request->file('myIdentities') as $file)
                            {
                                $identity = new Identity();
                                $identity->idUser = $user->idUser;

                                $name = time().rand(1,100).'.'.$file->extension();
                                $file->storeAs('public/Identities', $name);
                                $identity->identity = $name;
                                $identity->save();
                            }
                        }

            }

        } catch (Exception $exception) {
            return back()->with('Error', 'Erreur Au System');
        }
    }


    public function mesParrinage(){
        if(!Auth::user() || !Auth::user()->typeUser == 1)
            return response([
                'Erreur'=>"Veuille Connecter"
            ]);

        $parinages = User::where('ref',Auth::user()->uniqueCode)->select('users.idUser','users.userFname','users.userLname')->get();
        return response()->json($parinages);
    }

    public function giveGift($idUser){
        if(!Auth::user() || !Auth::user()->typeUser == 0)
            return response([
                'Erreur'=>"Veuille Connecter"
            ]);
        $pUser = User::where('idUser',$idUser)->first();
        $user = User::where('ref',$pUser->uniqueCode)->first();
        $orders = DB::table('orders')
                    ->join('make_orders','orders.idOrder','=','make_orders.idOrder')
                    ->where('orders.orderStatus',2)
                    ->where('make_orders.idUser',$user->idUser)
                    ->count();
        if($orders >= 5){
            $user = User::where('idUser',$idUser)->first();
            $user->gift = 2;
            if($user->save()){
                Mail::to($user->email)->send(new YouGetGift($user));
                return response([
                    'message' => "Votre Message A ete Envoyer"
                ]);
            }
        }
    }

    public function askForMyGift(){
        if(!Auth::user() || !Auth::user()->typeUser == 1)
        return response([
            'Erreur'=>"Veuille Connecter"
        ]);
        if($this->doIHaveGift()){
            $user = User::where('idUser',Auth::user()->idUser)->first();
            $user->gift = 1;
            if($user->save()){
                Mail::to("merouanmezouari@gmail.com")->send(new AskForGift(Auth::user()));
                return response([
                    'message'=>"Votr Demmande A ete Envoyer"
                ]);

            }

        }
        return response([
            'message' => "Vous Pouvez pas demmander"
        ]);
    }

    public function doIHaveGift(){
        if(!Auth::user() || !Auth::user()->typeUser == 1)
            return response([
                'Erreur'=>"Veuille Connecter"
            ]);

            $user = User::where('ref',Auth::user()->uniqueCode)->first();
            $orders = DB::table('orders')
                        ->join('make_orders','orders.idOrder','=','make_orders.idOrder')
                        ->where('orders.orderStatus',2)
                        ->where('make_orders.idUser',$user->idUser)
                        ->count();

            if($orders >= 5)
                return true;

            return false;


    }


    public function addAdresse(Request $request){
        if(!Auth::user())
            return response([
                'Erreur'=>"Veuille Connecter"
            ]);
        $adresse = new Adresse();
        $adresse->idUser = Auth::user()->idUser;
        $adresse->adrs = $request->adrs;
        $adresse->ville = $request->ville;
        if($adresse->save())
            return response([
                'message' => "adresse ajouter avec suscsse"
            ]);

        return response([
                'message' => "system Problem"
            ]);


    }

    public function editUser(Request $request){


        if(!Auth::user())
            return response([
                'error' => "Veuille Connecter"
            ]);

        $user = User::where('idUser',Auth::user()->idUser)->first();
        $user->userFname = $request->userFname;
        $user->userLname = $request->userLname;
        $user->email = $request->email;
        $user->telUser = $request->telUser;

        if($user->save())
            return response([
                'message' => "Les Information est modifier"
            ]);


        return response([
            'error' => "Erreur System"
        ]);
    }

    public function deleteAdrs($idAdrs){
        if(!Auth::user())
            return response([
                'Erreur'=>"Veuille Connecter"
            ]);

        $adresse = Adresse::where('idAdrs',$idAdrs)->where('trashAdresse',0)->first();
        $adresse->trashAdresse = 1;
        if($adresse->save())
            return response([
               'message' => "adresse supprimer"
            ]);

        return response([
               'message' => "system Problem"
            ]);
    }

    public function getAddreses(){
        if(!Auth::user())
            return response([
                'erreur' => "Veuille Connecter"
            ]);


        $adresses = Adresse::where('idUser',Auth::user()->idUser)->where('trashAdresse',0)->get();
        return response()->json($adresses);

    }

    public function transfromUser($idUser)
    {
        $user = User::where('idUser', $idUser)->first();
        try {
            $user->typeUser = 2; // Means Now Your Are A professionel User
            $user->save();
        } catch (Exception $exception) {
            return back()->with('Error', 'Erreur Au System');
        }
    }

    public function uploadIdentity(Request $request)
    {
        $identity = new Identity();
        try {
            $identity->idUser = $request->idUser;
            $path = $request->file('myIdentity')->store('Identities');
            $identity->identity = $path;
            $identity->save();

        } catch (Exception $exception) {
            return back()->with('Error', 'Erreur De System');
        }
    }


    public function loginUser(Request $request)
    {
        if (!Auth::attempt([
            'email' => $request->email,
            'password' => $request->password
        ])) {
            return response([
                'message' => 'Informations Non Valide'
            ], 401);
        }


        $user = Auth::user();
        if($user->trashUser == 1){
           return response([

                'message' => "Ton Compte Est Pas Actif"
           ]);
        }
        $token = $user->createToken('token')->plainTextToken;

        $cookie = cookie('jwt', $token, 60 * 24);

        if($user->typeUser == 0){
            return redirect('/dashboard');
        }

        return response([
            'message' => 'vous etes Connecter',
            'token' => $token
        ])->withCookie($cookie);

    }

    public function provideService(Request $request)
    {
        $user = Auth::user();
        if ($user && $user->typeUser == 1) {
            $provide = new Provide();
            $provide->idUser = $user->idUser;
            $provide->idSubService = $request->idSubService;
            if ($provide->save()) {
                return response([
                    'message' => 'c bon'
                ]);
            }
            return response([
                'message' => 'erreur'
            ]);

        }
    }

    public function setAvailability(Request $request)
    {
        if (!Auth::user() || !Auth::user()->typeUser == 1)
            return response([
                'message' => 'problem'
            ]);

        $availability = new Availability();
        $availability->idUser = Auth::user()->idUser;
        $availability->start = $request->start;
        $availability->end = $request->end;
        $availability->day = $request->day;

        if ($availability->save())
            return response([
                'message' => 'done'
            ]);

        return response([
            'problem' => 'save'
        ]);
    }



    public function isAvailable(Request $request)
    {
        if (!Auth::user() || !Auth::user()->typeUser == 1)
            return response([
                'message' => 'problem'
            ]);

        $avaibilities = Availability::where('idUser', $request->idUser)->get();

        foreach ($avaibilities as $availability) {
            if ($availability->idUser == $request->idUser && $availability->day == $request->day && $request->time >= $availability->start && $request->time <= $availability->end)
                return True;
        }

        return False;
    }

    public function total($idUser)
    {

        $withdraws = Withdraw::where('idUser',$idUser)->get();
        $sumWithdraw = 0;
        foreach ($withdraws as $withdraw) {
            if($withdraw->statusWithdraw == "complete" || $withdraw->statusWithdraw == "processe" )
                $sumWithdraw += $withdraw->totalWithdraw;
        }

        $orderMakes = DB::table('make_orders')->join('orders','make_orders.idOrder','=','orders.idOrder')->where('make_orders.idUser',$idUser)->where('orderStatus',2)->get();

        $sumDeposit = 0;
        foreach ($orderMakes as $orderMake) {
            if($orderMake->orderStatus == 2)
                $sumDeposit += $orderMake->totalPrice;
        }

        $total = $sumDeposit - $sumWithdraw;

        return response([
            'total' =>$total
        ]);

    }


    public function wantWithdraw(Request $request)
    {
        if(!Auth::user() || !Auth::user()->typeUser == 1)
            return response([
                'error'=>'error'
            ]);

        if(!$this->canIWithdraw())
            return response([
                'message'=>"Tu peux Pas retirer L'argent"
            ]);

        $withdraw = new Withdraw();
        $withdraw->idUser = Auth::user()->idUser;
        $withdraw->totalWithdraw = $request->totalWithdraw;
        $withdraw->statusWithdraw = "processe";

        if($withdraw->save()){
                Mail::to('merouanmezouari@gmail.com')->send(new WithdrawRequest(Auth::user()));
                return response([
                    'message'=>'done'
                ]);
        }

        return response([
            'message'=>'error'
        ]);

    }

    public function withdrawAsk(){
        if(!Auth::user() || !Auth::user()->typeUser == 0)
        return response([
            'error'=>'error'
        ]);

        $users = DB::table('users')
                    ->join('withdraws','withdraws.idUser','=','users.idUser')
                    ->where('statusWithdraw','processe')
                    ->get();

        return view('admin.demmandederetirelargent',['users'=>$users]);

    }

    public function confirmWithdraw(Request $request){
        if(!Auth::user() || !Auth::user()->typeUser == 0)
            return response([
                'message' => "Veuille Connecter"
            ]);

        $withdraw = Withdraw::where('idWithdraw',$request->idWithdraw)->first();
        $withdraw->statusWithdraw = 'complete';
        if($withdraw->save())
            return redirect('/retire')->with('message','A été Confirmer avec Sucsse');


    }

    public function canIWithdraw()
    {
        if(!Auth::user() || !Auth::user()->typeUser == 1)
            return response([
                'error'=>'erreur'
            ]);

        if($this->total(Auth::user()->idUser))
            return True;

        return False;
    }

   public function canUserWithdraw($idUser)
    {
        if(!Auth::user() || !Auth::user()->typeUser == 0)
            return response([
                'error'=>'erreur'
            ]);

        if($this->total(Auth::user()->idUser) > 50)
            return True;

        return False;
    }
    public function getAvaibailities($idUser)
    {
        return Availability::where('idUser', $idUser)->get();
    }

    public function logOut()
    {
        $cookie = Cookie::forget('jwt');

        return response([
            'message' => 'Bien'
        ])->withCookie($cookie);

    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($idUser)
    {
        if (Auth::user() && Auth::user()->typeUser == 0) {
            try {
                $user = User::where('idUser', $idUser)->first();
                $user->trashUser = 1;
                $user->save();
            } catch (\Exception $exception) {
                return back()->with('ErrorDeletedUser', "Ce Utulisateur N'existe Pas");
            }

        }
        return back()->with('ErrorLogin', 'Vous Etes Pas Un Admin');

    }
}
