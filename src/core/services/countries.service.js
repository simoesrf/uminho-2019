import { get } from "./firebase.service";
import { CountryModel } from "../models/country.model";

const buildCountryModel = ({ id, name, locale, language, flag }) =>
    new CountryModel(id, name, locale, language, flag);

const getCountries = async () => {
    const countries = await get("countries");
    return countries.map(buildCountryModel);
};

export { getCountries };
