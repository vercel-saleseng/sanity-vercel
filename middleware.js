import { NextResponse } from 'next/server';
import { unstable_precompute as precompute } from '@vercel/flags/next';
import { precomputeFlags } from '@/flags';

// Note that we're running this middleware for / only, but
// you could extend it to further pages you're experimenting on
export const config = { matcher: ['/'] };

export async function middleware(request) {
    // sets headers for location
    const city = request.geo?.city ?? 'Unknown'
    const latitude = request.geo?.latitude ?? 'Unknown'
    const longitude = request.geo?.longitude ?? 'Unknown'

    // add the location information to the request headers
    const requestHeaders = new Headers(request.headers)

    requestHeaders.set('x-user-city', city)
    requestHeaders.set('x-user-latitude', latitude.toString())
    requestHeaders.set('x-user-longitude', longitude.toString())

    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    })

    // gets location for personalization and sets it in the header


    console.log('location', city, latitude, longitude)

    // sets headers for the flag
    // precompute returns a string encoding each flag's returned value
    // https://vercel.com/docs/workflow-collaboration/feature-flags/flags-pattern-nextjs#precomputing-flags
    const code = await precompute(precomputeFlags);

    response.headers.set('encoded-feature-flags', code);

    return response;
}