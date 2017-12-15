import React from 'react';
import { Link } from 'react-router-dom';

// ====

class Navbar extends React.Component {
    render() {
        const { pathname } = this.props;

        return(
            <nav className="navbar">
                <div className="navbar-brand">
                    <a className="navbar-item" href="https://bulma.io">
                        <img 
                            src="https://bulma.io/images/bulma-logo.png" 
                            alt="Bulma: a modern CSS framework based on Flexbox" 
                        />
                    </a>
                </div>

                <div className="navbar-menu">
                    <div className="navbar-start">
                        <Link to="/" className={pathname === '/' ? 'navbar-item is-active' : 'navbar-item'}>
                            Tabela
                        </Link>

                        <Link to="/graphics" className={pathname === '/graphics' ? 'navbar-item is-active' : 'navbar-item'}>
                            Gráficos
                        </Link>
                    </div>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="field is-grouped">
                            <p className="control">
                                <a className="bd-tw-button button" data-social-network="Twitter" data-social-action="tweet"
                                    target="_blank" rel="noopener noreferrer" href="https://twitter.com/intent/tweet?text=Despesas orçamentárias da Prefeitura do Recife 2016&amp;hashtags=recife&amp;url=http://localhost:4000&amp;via=github">
                                    <span className="icon">
                                        <i className="fa fa-twitter"></i>
                                    </span>

                                    <span>Tweet</span>
                                </a>
                            </p>

                            <p className="control">
                                <a className="button is-primary" href="">
                                    <span className="icon">
                                        <i className="fa fa-download"></i>
                                    </span>

                                    <span>Download</span>
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
};

// ====

export default Navbar;