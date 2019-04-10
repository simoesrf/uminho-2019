import React from "react";
import { Route } from "react-router-dom";

import "./app.scss";

import { NavigationBar } from "./components/navigation-bar/navigation-bar.component";
import { Homepage } from "./pages/home.page";
import { LandingPage } from "./pages/landing.page";
import { BetPocketComponent } from "./components/bet-pocket/bet-pocket.component";
import { getCountries } from "./core/core.api";

class App extends React.PureComponent {
    state = {
        countries: []
    };

    componentDidMount = async () => {
        const countries = await getCountries();
        this.setState({ countries });
    };

    render() {
        const { countries } = this.state;

        return (
            <div>
                <header className="header-container">
                    <div className="navigation-container">
                        <NavigationBar countries={countries} />
                        <BetPocketComponent />
                    </div>
                </header>
                <main className="main-container">
                    <Route path="/" exact component={Homepage} />
                    <Route exact path="/countries/:country" component={LandingPage} />
                    <Route
                        path="/countries/:country/events"
                        exact
                        component={LandingPage}
                    />
                    <Route
                        path="/countries/:country/events/:event"
                        exact
                        component={LandingPage}
                    />
                </main>
            </div>
        );
    }
}

export default App;
