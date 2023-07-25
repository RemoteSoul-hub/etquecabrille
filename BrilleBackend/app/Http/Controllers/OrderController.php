<?php

namespace App\Http\Controllers;

use App\Mail\NewOrder;
use App\Mail\OrderConfirmation;
use App\Models\Adresse;

use App\Models\MakeOrder;
use App\Models\Order;
use App\Models\SubService;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Stripe\Stripe;

class OrderController extends Controller
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
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */

    public function displayOrdersAdmin(){
        if(!Auth::user() || !Auth::user()->typeUser == 0)
            return response([
                'message' => 'Veuille Connecter'
            ]);

        $orders = DB::table('orders')
                    ->leftJoin('make_orders','orders.idOrder','=','make_orders.idOrder')
                    ->leftJoin('users as prof','prof.idUser','=','make_orders.idUser')
                    ->join('users as part','part.idUser','=','orders.idUser')
                    ->join('sub_services','sub_services.idSubService','=','orders.idSubService')
                    ->select('orders.*','prof.userFname as pf','prof.userLname as pl','prof.email as pe','prof.telUser as pt','part.userFname as paf','part.userLname as pal','part.email as pae','part.telUser as pat','sub_services.*')
                    ->get();

        return view('admin.commandes',['orders'=>$orders]);

    }


    public function confirmOrder(Request $request){

        if(!Auth::user() || !Auth::user()->typeUser == 0)
            return response([
                'message'=> "Veuille Connecter"
            ]);
            $idOrder = $request->idOrder;
        $order = Order::where('idOrder',$idOrder)->first();
        $order->orderStatus = 2;
        if($order->save()){
            $user = DB::table('make_orders')
                        ->join('users','make_orders.idUser','=','users.idUser')
                        ->where('idOrder',$idOrder)
                        ->first();
            Mail::to($user->email)->send(new OrderConfirmation($user));
        }
        return redirect('/orders')->with('message',"La Comande a ete accepter avec sucsse");

    }


     public function createPaymentIntent(Request $request) {
        Stripe::setApiKey(env('STRIPE_SECRET'));

        $intent = \Stripe\PaymentIntent::create([
            'amount' => $request->amount,
            'currency' => 'usd',
        ]);

        return response()->json([
            'clientSecret' => $intent->client_secret
        ]);
    }

    public function storeCommande(Request $request)
    {
        if(!Auth::user())
            return response([
                'erreur' => "Veuille Connecter"
            ]);


        $order = new Order();
        $order->idUser = Auth::user()->idUser;
        $order->idSubService = $request->idSubService;
        if(isset($request->idAdrs)) {
            $order->idAdrs = $request->idAdrs;
        }else{
            $adrs = new Adresse();
            $adrs->idUser = Auth::user()->idUser;
            $adrs->adrs = $request->adrs;
            $adrs->ville = $request->ville;
            $adrs->save();
            $order->idAdrs = $adrs->idAdrs;
        }

        $order->dateDelivery = $request->date;
        $order->information = $request->information;
        $order->orderStatus = 0;
        $price = SubService::where('idSubService',$request->idSubService)->first();
        $order->totalPrice = $price->subServicePrice;

        if(!$order->save())
            return response([
                'error' => 'erreur de system'
            ]);


        $adrsOrder = Adresse::where('idAdrs',$request->idAdrs)->first();
        $allAdrsses = Adresse::where('ville',$adrsOrder->ville)->get();

        foreach ($allAdrsses as $adresse) {
            $user = User::where('idUser',$adresse->idUser)->where('typeUser',1)->where('trashUser',0)->first();
            if($user){
                Mail::to($user->email)->send(new NewOrder(Auth::user(),$order));
            }

        }

        return response([
            'message' => "La commande a ete Envoyer"
        ]);

    }


    public function mesCommandes() {
        if(!Auth::user())
            return response([
                            'erreur' => "Veuillez vous connecter"
                ]);
        $orders = DB::table('orders')
                    ->join('sub_services','orders.idSubService','=','sub_services.idSubService')
                    ->leftJoin('make_orders','orders.idOrder','=','make_orders.idOrder') // changed to leftJoin
                    ->leftJoin('users','make_orders.idUser','=','users.idUser') // changed to leftJoin
                    ->where('orders.idUser', Auth::user()->idUser)
                    ->where('orders.orderStatus','<>',-1)
                    ->select('sub_services.*','orders.*','users.*')
                    ->get();

        return response()->json($orders);
    }


    public function mesDemmandes(){
        if(!Auth::user())
            return response([
                'error' => "Veuille Connecter"
            ]);

        $ville = Adresse::where('idUser',Auth::user()->idUser)->first();
        $orders = DB::table('orders')
                    ->join('adresses','orders.idAdrs','=','adresses.idAdrs')
                    ->join('users','users.idUser','=','orders.idUser')
                    ->join('sub_services','orders.idSubService','=','sub_services.idSubService')
                    ->where('ville',$ville->ville)
                    ->where('orderStatus',0)
                    ->select('adresses.*','sub_services.*','users.userFname','users.userLname','users.email','users.telUser','orders.*')
                    ->get();

        return response()->json($orders);
    }

    public function mesDemadesAccepter(){
        if(!Auth::user() || !Auth::user()->typeUser == 1)
            return response([
                'error' => "Veuille Connecter"
            ]);

        $orders = DB::table('orders')
                    ->join('make_orders','make_orders.idOrder','=','orders.idOrder')
                    ->join('users','users.idUser','=' ,'orders.idUser')
                    ->join('adresses','adresses.idAdrs','=','orders.idAdrs')
                    ->join('sub_services','sub_services.idSubService','=','orders.idSubService')
                    ->where('make_orders.idUser',Auth::user()->idUser)
                    ->select('orders.*','sub_services.*','adresses.*','users.userFname','users.userLname','users.telUser','users.email')
                    ->get();

        return response()->json($orders);

    }


    public function anullerCommande($idOrder){
        if(!Auth::user())
            return response([
                'error' => "Veuille Connecter"
            ]);


        $order = Order::where('idOrder',$idOrder)->first();
        $order->orderStatus = -1;

        if(!$order->save())
             return response([
                'error' => "Veuille Connecter"
            ]);

        return response([
            'message'=>"La Commande a ete anuler avec sucsse"
        ]);
    }

    public function acceptOrder($idOrder)
    {
        if(!Auth::user() || !Auth::user()->typeUser == 1)
            return response([
                'message' => 'veuille connecter'
            ]);

        if(MakeOrder::where('idOrder',$idOrder)->first())
            return response([
               'message' => 'Cette Demmande Est Deja Accepter'
            ]);

        if($order = Order::where('idOrder',$idOrder)->where('orderStatus',0)->first()){
            $makeOrder = new MakeOrder();
            $makeOrder->idUser = Auth::user()->idUser;
            $makeOrder->idOrder = $idOrder;
            if($makeOrder->save()){
                $order->orderStatus = 1; // Make The Order accepted From Someone
                $order->dateConfiramtion = date('y-m-d:h-m-s');
                if($order->save()){
                    //$user = User::where('idUser',$order->idUser)->first();
                        return response([
                            'message' => "Commande Confirmer"
                        ]);  // Emaill que La commande A ete Accepter
                }

            }


        }

        return response([
            'message' => 'Erreur Est Survenu'
        ]);

    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
