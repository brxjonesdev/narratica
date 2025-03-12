export type Location = {
    id: string;
    name: string;
    subname: string;
    narrative: string;
    description: string;

    coreIdentity: {
        type: string; // City, Village, Fortress, etc.
        geography: string;
        climate: string;
        technologyLevel: string;
    };

    societyCulture: {
        inhabitants: string;
        languages: string;
        traditions?: string;
        beliefs?: string;
        arts?: string;
        dailyLife?: string;
    };

    governmentPower: {
        politicalSystem: string;
        laws?: string;
        majorFactions?: string;
        conflictsAlliances?: string;
    };

    economyInfrastructure: {
        industries: string;
        trade?: string;
        currency?: string;
        technology?: string;
        transportation?: string;
    };

    narrativeSignificance: {
        keyEvents: string;
        importantCharacters?: string;
        secretsMysteries?: string;
    };
};
