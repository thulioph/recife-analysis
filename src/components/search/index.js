import React from 'react';

// ====

class Search extends React.Component {
    state = {
        year: null,
        keyword: null
    };

    handleChange(value) {
        this.setState({ year: value });
    }

    handleSearch(value) {
        this.setState({ keyword: value });
    }

    render() {
        return (
            <section className="section">
                <div className="container">
                    <div className="field has-addons">
                        <div className="control is-expanded">
                            <input 
                                className="input" 
                                type="text" 
                                placeholder="Find by something"
                                onChange={(evt) => this.handleSearch(evt.target.value)}/>
                        </div>

                        <div className="control">
                            <a className="button is-dark">Search</a>
                        </div>
                    </div>

                    <div className="btn-group">
                        <div className="field">
                            <label className="label">Filtre por Ano</label>

                            <div className="control">
                                <div className="select">
                                    <select id="year-select" 
                                        onChange={(evt) => this.handleChange(evt.target.value)}>
                                        <option value="2013">2013</option>
                                        <option value="2014">2014</option>
                                        <option value="2015">2015</option>
                                        <option value="2016" selected>2016</option>
                                        <option value="2017">2017</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

// ====

export default Search;
