import Statsig from 'statsig-node';

// integrates Statsig experiments, feature gates, and analytics into Vercel's feature flag system 
import { unstable_flag as flag } from '@vercel/flags/next';


export const showAd = flag({
    key: 'sanity-vercel-ad',
    description: 'Shows an ad',
    origin: 'https://console.statsig.com/zFbkOo7wiUjPjzBZEbYVi/gates/sanity-vercel-ad',
    async decide() {
        // randomizing userIDs to get a unique result from the feature flag everytime
        const randomID = Math.floor(Math.random() * (1000 - 1)) + 1;

        await Statsig.initialize(process.env.STATSIG_SERVER);

        console.log(await Statsig.checkGateSync({ userID: `vercel-${randomID}` }, this.key), randomID, 'test')

        // queries statsig api for results of the feature flag
        return await Statsig.checkGateSync({ userID: `vercel-${randomID}` }, this.key);
    },
});

export const precomputeFlags = [showAd];
