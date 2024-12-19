import React , {useState, useEffect}  from 'react';

function Card({data, indice,handler}){

    return(
        <div className='col-md-3 col-12' onClick={()=>handler(indice)} >
            <img src={data.state==0?'./background.png':data.imagen} width="90%" height="90%"></img>
        </div>
    );
};
export default Card;