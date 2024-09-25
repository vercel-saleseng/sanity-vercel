import { NextResponse } from 'next/server';
import { unstable_precompute as precompute } from '@vercel/flags/next';
import { precomputeFlags } from '@/flags';

// Note that we're running this middleware for / only, but
// you could extend it to further pages you're experimenting on
export const config = { matcher: ['/'] };

export async function middleware(request) {
    const response = NextResponse.next()

    // sets headers for location
    const city = request.geo?.city ?? 'Unknown'
    const latitude = request.geo?.latitude ?? 'Unknown'
    const longitude = request.geo?.longitude ?? 'Unknown'

    // add the location information to the request headers
    response.headers.set('x-user-city', city)
    response.headers.set('x-user-latitude', latitude.toString())
    response.headers.set('x-user-longitude', longitude.toString())

    // sets headers for the flag
    // precompute returns a string encoding each flag's returned value
    // https://vercel.com/docs/workflow-collaboration/feature-flags/flags-pattern-nextjs#precomputing-flags
    const code = await precompute(precomputeFlags);

    response.headers.set('encoded-feature-flags', code);

    return response;
}