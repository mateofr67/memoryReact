import React , {useState, useEffect}  from 'react';

function Mensaje({texto, handler}){
 return(
    <div className='container'>
             <div className='row'>
                <h1>{texto}</h1>
                <button onClick={()=>handler()}> Volver a jugar</button>
            </div>
    </div>

 );

};

export default Mensaje;