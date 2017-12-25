import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import Home from '../App';
import Graphic from '../Graphic';
import Bubble from '../Bubble';
import Pie from '../Pie';
import Bar from '../Bar';

// ====

const HomeComponent = ({ location }) => (<Home pathname={location.pathname} />);
const GraphicComponent = ({ location }) => (<Graphic pathname={location.pathname} />);
const BubbleComponent = ({ location }) => (<Bubble pathname={location.pathname} />);
const PieComponent = ({ location }) => (<Pie pathname={location.pathname} />);
const BarComponent = ({ location }) => (<Bar pathname={location.pathname} />);

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
                        
                        <Route 
                            path='/graphic/bubble'
                            render={(history) => <BubbleComponent {...history} />}
                        />
                        
                        <Route 
                            path='/graphic/pie'
                            render={(history) => <PieComponent {...history} />}
                        />
                        
                        <Route 
                            path='/graphic/bar'
                            render={(history) => <BarComponent {...history} />}
                        />
                    </Switch>
                </Router>
            </main>
        )
    }
};

export default Main;

// ====