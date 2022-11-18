import React from 'react';
import Info from './components/info' ;
import Input from './components/input' ;
import { Add_btn , Do_all_btn } from './components/btns' ;


function App() {
  return (
    <main>
      <div>
        <Input />
        <Info />
      </div>
      <div>
        <Add_btn />
        <Do_all_btn />
      </div>
    </main>
  );
}


export default App
