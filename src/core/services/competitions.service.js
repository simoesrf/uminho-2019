import { get } from "./firebase.service";
import { getCountries } from "./countries.service";
import { CompetitionModel } from "../models/competition.model";

const getCompetitions = async () => {
    const countries = await getCountries();
    const competitions = await get("competitions");
    
    return competitions.map(
        ({ id, name, countryId }) => {
            const country = countries.find((country) => countryId === country.getId());
            return new CompetitionModel(id, name, country)
        }
    );
};

export { getCompetitions };
