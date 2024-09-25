import { NextResponse } from 'next/server';
import { getStatsigData } from '@vercel/flags/providers/statsig';
import { verifyAccess } from '@vercel/flags';
import { precomputeFlags } from '@/flags'

export async function GET(request) {
    const access = await verifyAccess(request.headers.get('Authorization'));
    if (!access) return NextResponse.json(null, { status: 401 });

    // gets all features, experiements, and analytics instances on statsig
    const statsigFlags = await getStatsigData({
        consoleApiKey: 'console-1mOZxsYXtWMLDsbUxbPaQFoF464j7OeyQiSatz85RdV',
    });

    const toolbarFlags = { definitions: {} }

    // adds any statsig flag that is has been declared vercel side to the toolbar 
    precomputeFlags.forEach(precomputeFlag => {
        const flagName = precomputeFlag.key
        if (statsigFlags.definitions[flagName]) {
            toolbarFlags.definitions[flagName] = statsigFlags.definitions[flagName]
        }
    })

    return NextResponse.json(toolbarFlags);
}
