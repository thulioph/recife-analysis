import React from 'react';
import { Link } from 'react-router-dom';

//  ====

class Menu extends React.Component {
    render() {
        const { pathname } = this.props;

        return(
            <aside className="menu">
                <p className="menu-label">
                    Dados
                </p>

                <ul className="menu-list">
                    <li>
                        <Link to="/" className={pathname === '/' ? 'is-active' : ''}>
                            Listagem
                        </Link>
                    </li>

                    <li>
                        <a>Gráficos</a>

                        <ul>
                            <li>
                                <Link to="/graphic/bubble" 
                                    className={pathname === '/graphic/bubble' ? 'is-active' : ''}>
                                    Bubble
                                </Link>
                            </li>

                            <li>
                                <Link to="/graphic/pie" 
                                    className={pathname === '/graphic/pie' ? 'is-active' : ''}>
                                    Pizza
                                </Link>
                            </li>

                            <li>
                                <Link to="/graphic/bar" 
                                    className={pathname === '/graphic/bar' ? 'is-active' : ''}>
                                    Barra
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>

                <p className="menu-label">
                    Fonte
                </p>

                <ul className="menu-list">
                    <li>
                        <a href="http://dados.recife.pe.gov.br/dataset/despesas-orcamentarias/" target="_blank" rel="noopener noreferrer">
                            Prefeitura
                        </a>
                    </li>
                </ul>
            </aside>
        )
    }
};

// ====

export default Menu;