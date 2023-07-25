<?php

namespace App\Http\Middleware;

use Closure;

class CorsMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $headers = [
            'Access-Control-Allow-Origin' => '*',
            'Access-Control-Allow-Methods' => 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers' => 'Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With',
        ];

        if ($request->isMethod('OPTIONS')) {
            return response('', 200)->withHeaders($headers);
        }

        return $next($request)->withHeaders($headers);
    }
}