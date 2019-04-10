import { get } from "./firebase.service";
import { EventModel } from "../models/event.model";
import { getCompetitions } from "./competitions.service";

const getEvents = async () => {
    const events = await get("events");
    const competitions = await getCompetitions();

    return events.map(({ id, name, status, startTime, competitionId }) => {
        const competition = competitions.find(
            competition => competition.getId() === competitionId
        );
        return new EventModel(id, name, status, startTime, competition);
    });
};

export { getEvents };
