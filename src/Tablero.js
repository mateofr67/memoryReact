import React , {useState, useEffect, useRef}  from 'react';
import Card from './Card.js';
import Mensaje from './Mensaje.js';

function Tablero(){

    const [cardList, setCardList] = useState([]);
    //const flippedCards = useRef([]); 
    const flippedCards = useRef([]);
    const [indexCards,setIndexCard] = useState([]);
    const intervalId  = useRef(null);
    const executedTimes = useRef(0);
    const [msgWin, setMsgWin] = useState("");
    const flagInterval = useRef(false);


    const initCards = ()=>
        {
            let aux= [];
            aux.push({id:0, state:0, imagen:'./carta1.png'});
            aux.push({id:1, state:0, imagen:'./carta1.png'});
            aux.push({id:2, state:0, imagen:'./carta2.png'});
            aux.push({id:3, state:0, imagen:'./carta2.png'});
            aux.push({id:4, state:0, imagen:'./carta3.png'});
            aux.push({id:5, state:0, imagen:'./carta3.png'});
            aux.push({id:6, state:0, imagen:'./carta4.png'});
            aux.push({id:7, state:0, imagen:'./carta4.png'});
            setCardList(aux);
            let arr = [0,1, 2, 3, 4, 5, 6,7]
            arr.sort((a, b) => 0.5 - Math.random());
            setIndexCard(arr);
        }


    const init = ()=>{
        initCards();
        setMsgWin("");
  
    }    

    const flip = (index) => {
       
       if(flippedCards.current!=undefined) 
       { 
            if(cardList[indexCards[index]].state==1 || flagInterval.current) return ;

            if (flippedCards.current.length== 0 )
            {
                flippedCards.current.push(cardList[indexCards[index]]);
                cardList[indexCards[index]].state=1;
            }
            else if(flippedCards.current.length==1)  
            {
                    // caso de que hemos encontrado dos cartas iguales
                    if (flippedCards.current[0].imagen != cardList[indexCards[index]].imagen )
                    {   
                        const fInterval= (paramid) => {
                            cardList[indexCards[index]].state=0;    
                            cardList.map((card)=> { if (card.id ==paramid )  card.state = 0 });            
                            setCardList([...cardList]);                            
                            executedTimes.current = 1;
                            flagInterval.current=false;
                          };

                        // caso de que hemos encontrado dos cartas distintas
                        executedTimes.current = 0;
                        flagInterval.current=true;
                        intervalId.current= setInterval(fInterval, 2000,flippedCards.current[0].id );
                          
                        
                    }
                    cardList[indexCards[index]].state=1;                
                    flippedCards.current = []; 

            }            
            setCardList([...cardList]);
        }
       
    }   

    useEffect( ()=>{
        initCards();
        },[]);

    useEffect( ()=>{
            if  (intervalId !=null && intervalId.current !=null && executedTimes!=null && executedTimes.current==1)
            {
                clearInterval(intervalId.current);
                executedTimes.current=0;
                intervalId.current = null;
            }
            if (cardList.length>0)
            {    
            var flag = true;
            cardList.map((card) => { 
                if (card.state==0) 
                 {
                     flag=false ;                     
                 }
                });
            if (flag) setMsgWin("Felicidades, ganaste!");
            }
            else{
                setMsgWin("");
            }
            },[cardList,setCardList]);


    return(
       <>{msgWin.length>1 && <Mensaje texto={msgWin} handler={init}></Mensaje>}
        <div className='container'>
             <div className='row'>
                &nbsp;
            </div>
            <div className='row'>
                {indexCards.map((value,index) => <Card key={cardList[value].id} indice={index} data={cardList[value]} handler={flip}></Card>) }
            </div>
        </div>
        </>
    );
}

export default Tablero;