import { getEvents } from "./services/events.service";
import { getMarkets } from "./services/markets.service";
import { getCountries } from "./services/countries.service";
import { getCompetitions } from "./services/competitions.service";
import { MARKET_TYPES } from "./models/market.model";

const getCompetitionsByCountry = (country, competitions) =>
    competitions.filter(
        competition => competition.getCountry().getId() === country.getId()
    );

const getEventsByCompetition = (competition, events) =>
    events.filter(
        event => event.getCompetition().getId() === competition.getId()
    );

const getMarketsByEvent = (event, markets) =>
    markets.filter(market => {
        return market.getEvent().getId() === event.getId();
    });

const getEventsMatchOddsMarkets = (events, markets) =>
    events
        .reduce((acc, event) => [...getMarketsByEvent(event, markets), ...acc], [])
        .filter(market => market.getType() === MARKET_TYPES.MATCH_ODDS);

export {
    getEvents,
    getMarkets,
    getCountries,
    getCompetitions,
    getMarketsByEvent,
    getEventsByCompetition,
    getCompetitionsByCountry,
    getEventsMatchOddsMarkets
};
