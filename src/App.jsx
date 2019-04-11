import React from "react";
import { Route } from "react-router-dom";

import "./app.scss";

import { NavigationBar } from "./components/navigation-bar/navigation-bar.component";
import { Homepage } from "./pages/home.page";
import { LandingPage } from "./pages/landing.page";
import { BetPocketComponent } from "./components/bet-pocket/bet-pocket.component";
import { DataStore } from "./core/data-store";

class App extends React.PureComponent {
    state = {
        countries: []
    };

    componentDidMount = async () => {
        const store = await DataStore.getInstance();
        this.setState({ countries: store.getCountries() });
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
