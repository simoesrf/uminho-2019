import React from "react";

import "./landing.page.scss";

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
    getEventsMatchOddsMarkets,
    getCompetitionsByCountry,
    getCountries
} from "../core/core.api";

class LandingPage extends React.PureComponent {
    state = {
        events: [],
        markets: [],
        country: null,
        countries: [],
        competitions: []
    };

    componentDidMount = async () => {
        const {
            match: { params }
        } = this.props;
        const events = await getEvents();
        const markets = await getMarkets();
        const countries = await getCountries();
        const competitionsData = await getCompetitions();

        const country = countries.find(
            country => country.getId() === params.country
        );
        const competitions = getCompetitionsByCountry(
            country,
            competitionsData
        );

        this.setState({
            events,
            markets,
            country,
            countries,
            competitions
        });
    };

    componentDidUpdate = async () => {
        const {
            match: { params }
        } = this.props;
        const { country: prevCountry, countries } = this.state;

        if (!prevCountry || prevCountry.getId() === params.country) {
            return null;
        }

        const competitionsData = await getCompetitions();
        const country = countries.find(
            country => country.getId() === params.country
        );
        const competitions = getCompetitionsByCountry(
            country,
            competitionsData
        );

        this.setState({
            country,
            competitions
        });
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

export { LandingPage };
