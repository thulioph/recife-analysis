import React from 'react';
import { connect } from 'react-redux';

import './App.css';

import Navbar from '../../components/navbar';
import Resume from '../../components/resume';
import Search from '../../components/search';
import Table from '../../components/table';
import Modal from '../../components/modal';
import GraphicBar from '../../components/graphic/bar.js';

import RecifeApi from '../../utils/api/recife';
import Records from '../../utils/records';

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
  }

  componentDidMount() {
    this.api.getAllData().then((arr) => {
      const allPaidValues = this.records.totalPaidValues(arr.records);
      store.dispatch(updatePaidValue(allPaidValues));

      const totalByVicePrefeito = this.records.totalByViceMayor(arr.records);
      totalByVicePrefeito.forEach((el) => store.dispatch(addViceMayorEntry(el)));
      
      const totalByPrefeito = this.records.totalByMayor(arr.records);
      totalByPrefeito.forEach((el) => store.dispatch(addMayorEntry(el)));

      const orderedRecords = this.records.orderByMonth(arr.records);
      orderedRecords.forEach((el) => store.dispatch(addNewRecord(el)));
    }).catch((err) => console.error(err));
  }

  render() {
    const { 
      allRecords, allMayorEntry, 
      allViceMayorEntry, allPaidValue,
      modalIsActive, modalContent
    } = this.props;

    return (
      <div>
        <Navbar />
        
        <Resume 
          allRecords={allRecords}
          allMayorEntry={allMayorEntry}
          allViceMayorEntry={allViceMayorEntry}
          allPaidValue={allPaidValue}
        />
        
        <Search />
        
        <Table rows={allRecords} />

        <GraphicBar />
        
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
