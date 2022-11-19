import React from 'react';
import Info from './components/info' ;
import { AddBtn , DoAllBtn , Input } from './components/form' ;


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
