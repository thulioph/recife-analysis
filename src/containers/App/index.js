import React from 'react';
import './App.css';

import Navbar from '../../components/navbar';
import Resume from '../../components/resume';
import Search from '../../components/search';
import Table from '../../components/table';
import Modal from '../../components/modal';
import GraphicBar from '../../components/graphic/bar.js';

// ====

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        
        <Resume />
        
        <Search />
        
        <Table />

        <GraphicBar />
        
        <Modal />
      </div>
    );
  }
}

// ====

export default App;
