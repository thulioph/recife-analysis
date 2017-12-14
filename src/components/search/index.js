import React from 'react';

import store from '../../store';
import { updateKeyword, updateYear } from '../../actions/search';
import {
    clearRecords, addNewRecord, addMayorEntry,
    addViceMayorEntry, updatePaidValue
} from '../../actions/table';

import RecifeApi from '../../utils/api/recife';
import Records from '../../utils/records';

// ====

class Search extends React.Component {
    constructor(props) {
        super(props);
        
        this.api = new RecifeApi();
        this.records = new Records();
    }

    handleResources(arr) {
        store.dispatch(
            clearRecords()
        );

        const allPaidValues = this.records.totalPaidValues(arr);
        console.warn('allPaidValues', allPaidValues);
        store.dispatch(updatePaidValue(allPaidValues));

        const totalByVicePrefeito = this.records.totalByViceMayor(arr);
        totalByVicePrefeito.forEach((el) => store.dispatch(addViceMayorEntry(el)));

        const totalByPrefeito = this.records.totalByMayor(arr);
        totalByPrefeito.forEach((el) => store.dispatch(addMayorEntry(el)));

        const orderedRecords = this.records.orderByMonth(arr);
        orderedRecords.forEach((el) => store.dispatch(addNewRecord(el)));
    }

    handleChange(value) {
        store.dispatch(
            updateYear(value)
        );

        this.api
            .getByResourceId(value)
            .then((data) => this.handleResources(data.records))
            .catch((err) => console.error(err));
    }

    handleSearch(value) {
        store.dispatch(
            updateKeyword(value)
        );
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