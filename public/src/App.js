import React from 'react';
import Info from './components/info' ;
import Input from './components/input' ;
import { AddBtn , DoAllBtn , DoBtn } from './components/btns' ;


function App() {
  return (
    <main>
      <div>
        <Input />
        <Info btn={<DoBtn />} />
      </div>
      <div>
        <AddBtn />
        <DoAllBtn />
      </div>
    </main>
  );
}


export default App
