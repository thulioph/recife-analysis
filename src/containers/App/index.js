import React from 'react';
import { connect } from 'react-redux';

import './App.css';

import Navbar from '../../components/navbar';
import Resume from '../../components/resume';
import Search from '../../components/search';
import Table from '../../components/table';
import Modal from '../../components/modal';

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
        <Navbar pathname={pathname} />

        <Resume
          boxOne={{ 'title': 'Movimentações', 'amount': allRecords.length}}
          boxTwo={{ 'title': 'Gasto anual', 'amount': this.records.buildPaidValue(allPaidValue)}}
          boxTree={{ 'title': 'Transações do Prefeito', 'amount': allMayorEntry.length}}
          boxFour={{ 'title': 'Transações do Vice Prefeito', 'amount': allViceMayorEntry.length}}
        />
        
        <Search />
        
        <Table rows={allRecords} />
        
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
    year: state.search.year,
    modalIsActive: state.system.modalIsActive,
    modalContent: state.system.modalContent
  })
)(App);
