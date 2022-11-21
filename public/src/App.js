import React from 'react';
import Info from './components/info' ;
import { AddBtn , DoAllBtn , Input } from './components/form' ;


function App() {
  var inf ;
  var s = n => {
    inf = n ;
    console.log('App.inf   : '+inf)
  }
  return (
    <main>
      <div>
        <Input />
        <Info da={inf} />
      </div>
      <div>
        <AddBtn sw={s} />
        <DoAllBtn />
      </div>
    </main>
  );
}


export default App
