<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\ServiceImages;
use App\Models\SubService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use PHPUnit\Exception;
use MongoDB\Driver\Session;

class ServiceController extends Controller
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


    public function getService()
    {
        if(!Auth::user())
            return response([
                'error'=> "Veuille Connecter"
            ]);

        return Service::all();
    }

    public function getSubService($idSubService){
        $subService = DB::table('sub_services')
        ->join('services','sub_services.idService','=','services.idService')
        ->where('idSubService',$idSubService)->first();
        return response()->json($subService);
    }

    public function getSubServices(){
        $subServices = DB::table('sub_services')
                        ->join('services','sub_services.idService','=','services.idService')
                        ->where('trashSubService','=',0)
                        ->get();
        return response()->json($subServices);
    }

    public function getMedias($idSubService){

        $medias = ServiceImages::where('idSubService',$idSubService)->get();
        return response()->json($medias);
    }

    public function getServiceWithSubService()
    {

        $services = Service::with('subServices')->get();
        return response()->json($services);
    }

    public function getRelatedSubServices($idService){
        $relatedSubService = SubService::where('idService',$idService)->get();
        return response()->json($relatedSubService);
    }


    public function saveMediaToService(Request $request){

        if(!Auth::user() || !Auth::user()->typeUser == 0)
            return response([
                            'error'=> "Vous n'êtes pas autorisé à ce service"
            ]);

        $media = new ServiceImages();
        try {
            $media->idSubService = $request->idSubService;
            $path = $request->file('media')->store('Images');
            $media->src = $path;
            $media->typeMedia = $request->typeMedia;
            $media->save();

            return response([
                'message' => 'Success'
            ]);
        } catch (Exception $exception) {
            return back()->with('Error', 'Erreur De System');
        }
    }



    /**
     * Store a newly created resource in storage.
     */
    public function storeService(Request $request)
    {
        if (Auth::user() && Auth::user()->typeUser == 0) {
            try {
                try {
                    $request->validate([
                        'serviceName'=>'unique:services'
                    ]);
                }catch (\Exception $exception){
                    return back()->with('ErrorAddingServices','Ce Service Est Déja Exister');
                }
                $service = new Service();
                $service->serviceName = $request->serviceName;
                $service->descService = $request->descService;
                $service->save();
                return response([
                    'message'=>'ajouter avec sucsse'
                ]);
            } catch (Exception $exception) {
                return back()->with('Error','Erreur De System');
            }
        }
        return response([
            'message'=>'problem'
        ]);


    }

    public function storeSubService(Request $request)
    {
        if (!Auth::user() || !Auth::user()->typeUser == 0) {
            return back()->with('ErrorLogin','Vous Etes Pas Un Admin');
        }
        $subService = new SubService();
        try {
            $request->validate([
                'subServiceName'=>'unique:sub_services'
            ]);
            $subService->idService = $request->idService;
            $subService->subServiceName = $request->subServiceName;
            $subService->descSubService = $request->descSubService;
            $subService->subServicePrice = $request->subServicePrice;
            $subService->save();
            return response([
                'message'=>'c bon'
            ]);
        } catch (Exception $exception){
            return back()->with('Error','Erreur De System');
        }
    }
    /**
     * Display the specified resource.
     */
    public function show(Service $service)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Service $service)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Service $service)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroyService($idService)
    {
        if (Auth::user() && Auth::user()->typeUser == 0) {
            return back()->with('ErrorLogin','Vous Etes Pas Un Admin');
        }
        $service = Service::where('idService',$idService)->first();
        $service->trashService = 1;
        $service->save();
    }

    public function destroySubService($idSubService)
    {
        if (Auth::user() && Auth::user()->typeUser == 0) {
            return back()->with('ErrorLogin','Vous Etes Pas Un Admin');
        }
        $subService = SubService::wehere('idSubService',$idSubService)->first();
        $subService->trashSubService = 1;
        $subService->save();
    }
}
