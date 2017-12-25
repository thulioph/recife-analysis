import React from 'react';
import { connect } from 'react-redux';

import './App.css';

import Navbar from '../../components/navbar';
import Resume from '../../components/resume';
import Table from '../../components/table';
import Modal from '../../components/modal';
import Menu from '../../components/menu';

import RecifeApi from '../../utils/api/recife';
import Records from '../../utils/records';
import Storage from '../../utils/storage';

import store from '../../store';
import { 
  addNewRecord, addMayorEntry, 
  addViceMayorEntry, updatePaidValue
} from '../../actions/table';

// ====

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.api = new RecifeApi();
    this.records = new Records();

    this.storage = new Storage('api_data');

    this.handleData = this.handleData.bind(this);
  }

  handleData(arr) {
    this.storage.save(arr);

    const allPaidValues = this.records.totalPaidValues(arr.records);
    store.dispatch(updatePaidValue(allPaidValues));

    const totalByVicePrefeito = this.records.totalByViceMayor(arr.records);
    totalByVicePrefeito.forEach((el) => store.dispatch(addViceMayorEntry(el)));
    
    const totalByPrefeito = this.records.totalByMayor(arr.records);
    totalByPrefeito.forEach((el) => store.dispatch(addMayorEntry(el)));

    const orderedRecords = this.records.orderByMonth(arr.records);
    orderedRecords.forEach((el) => store.dispatch(addNewRecord(el)));
  }

  componentDidMount() {
    const storageData = this.storage.get();

    if (storageData) {
      this.handleData(storageData);
    } else {
      this.api.getAllData()
        .then((arr) => this.handleData(arr))
        .catch((err) => console.error(err));
    }
  }

  render() {
    const { 
      allRecords, allMayorEntry, 
      allViceMayorEntry, allPaidValue,
      modalIsActive, modalContent, 
      pathname
    } = this.props;

    return (
      <div>
        <Navbar />

        <section className="hero is-medium is-dark is-bold">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Análise</h1>
              <h2 className="subtitle">Despesas Orçamentárias do <strong>Recife</strong>.</h2>
            </div>
          </div>
        </section>

        <section className="section resume-container">
          <Resume
            boxOne={{ 
              'title': 'Movimentações', 
              'amount': allRecords.length
            }}

            boxTwo={{ 
              'title': 'Gasto anual', 
              'amount': this.records.buildPaidValue(allPaidValue)
            }}

            boxTree={{
              'title': 'Transações do Prefeito', 
              'amount': allMayorEntry.length
            }}

            boxFour={{
              'title': 'Transações do Vice Prefeito', 
              'amount': allViceMayorEntry.length
            }}
          />
        </section>

        <section className="section app-container">
          <div className="wrapper-menu">
            <Menu pathname={pathname} />
          </div>

          <div className="section wrapper-content">
            <Table rows={allRecords} />
          </div>
        </section>

        <Modal 
          isActive={modalIsActive} 
          content={modalContent}
        />
      </div>
    );
  }
}

// ====

export default connect(
  (state) => ({
    allRecords: state.table.allRecords,
    allMayorEntry: state.table.allMayorEntry,
    allViceMayorEntry: state.table.allViceMayorEntry,
    allPaidValue: state.table.allPaidValue,
    modalIsActive: state.system.modalIsActive,
    modalContent: state.system.modalContent
  })
)(App);
