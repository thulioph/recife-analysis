import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import Home from '../App';
import Graphic from '../Graphic';

// ====

const HomeComponent = ({ location }) => (<Home pathname={location.pathname} />);
const GraphicComponent = ({ location }) => (<Graphic pathname={location.pathname} />);

// ====

class Main extends React.Component {
    render() {
        return(
            <main>
                <Router history={createBrowserHistory()}>
                    <Switch>
                        <Route 
                            exact 
                            path='/' 
                            render={(history) => <HomeComponent {...history} />}
                        />

                        <Route 
                            path='/graphics'
                            render={(history) => <GraphicComponent {...history} />}
                        />
                    </Switch>
                </Router>
            </main>
        )
    }
};

export default Main;

// ====