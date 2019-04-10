import React from "react";

import { MarketsComponent } from "../components/market/markets.component";
import { MarketTypesComponent } from "../components/market/market-types.component";
import { MarketComponent } from "../components/market/market.component";
import { CompetitionComponent } from "../components/competition/competition.component";
import { BetButtonComponent } from "../components/bet-button/bet-button.component";

import {
    getEvents,
    getMarkets,
    getCompetitions,
    getEventsByCompetition,
    getEventsMatchOddsMarkets
} from "../core/core.api";

class Homepage extends React.PureComponent {
    state = {
        events: [],
        markets: [],
        competitions: []
    };

    componentDidMount = async () => {
        const events = await getEvents();
        const markets = await getMarkets();
        const competitions = await getCompetitions();

        this.setState({ events, markets, competitions });
    };

    render() {
        const { events, markets, competitions } = this.state;

        return competitions.map(competition => {
            const competitionEvents = getEventsByCompetition(competition, events);

            const eventMarkets = getEventsMatchOddsMarkets(
                competitionEvents,
                markets
            );

            return (
                <CompetitionComponent
                    key={competition.getId()}
                    name={competition.getName()}
                >
                    <MarketsComponent>
                        <MarketTypesComponent
                            types={
                                (eventMarkets[0] &&
                                    eventMarkets[0]
                                        .getRunners()
                                        .map(runner => runner.getType())) ||
                                []
                            }
                        />
                        {eventMarkets.map(eventMarket => (
                            <MarketComponent
                                key={eventMarket.getId()}
                                name={eventMarket.getName()}
                            >
                                {eventMarket.getRunners().map(runner => (
                                    <BetButtonComponent
                                        key={runner.getId()}
                                        odd={runner.getOdds()}
                                    />
                                ))}
                            </MarketComponent>
                        ))}
                    </MarketsComponent>
                </CompetitionComponent>
            );
        });
    }
}

export { Homepage };
