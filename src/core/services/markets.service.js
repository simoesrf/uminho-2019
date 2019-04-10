import { get } from "./firebase.service";
import { getEvents } from "./events.service";
import { MarketModel } from "../models/market.model";
import { RunnerModel } from "../models/runner.model";

const getMarkets = async () => {
    const events = await getEvents();
    const markets = await get("markets");

    return markets.map(({ id, name, eventId, marketType, status, runners }) => {
        const event = events.find(event => event.getId() === eventId);
        const runnersList = runners.map(
            ({ selectionId, type, odds }) => new RunnerModel(selectionId, type, odds)
        );
        return new MarketModel(id, name, event, marketType, status, runnersList);
    });
};

export { getMarkets };
