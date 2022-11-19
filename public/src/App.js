import React from 'react';
import Info from './components/info' ;
import Input from './components/input' ;
import { AddBtn , DoAllBtn } from './components/btns' ;


function App() {
  return (
    <main>
      <div>
        <Input />
        <Info />
      </div>
      <div>
        <AddBtn />
        <DoAllBtn />
      </div>
    </main>
  );
}


export default App
