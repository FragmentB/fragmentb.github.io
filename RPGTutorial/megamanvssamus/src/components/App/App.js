import { useState } from 'react';
import styles from './styles.module.css'
import { Battle, StartMenu } from 'components';

export const App =()=>{
  const [gameMode,setMode] = useState("start");

  return (

    <div className={styles.main}>
      {
        (function (){
          switch (gameMode) {
            case 'start':
              return <StartMenu onStartClick={ ()=>setMode('battle')} />

            case 'battle':
              return <Battle />
            case 'result':
              return <>Winning</>
            default:
              return null
          }
        })()
      }
    </div>
  );
}