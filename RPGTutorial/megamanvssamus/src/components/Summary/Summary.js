import { Bar } from 'components';
import styles from './styles.module.css';

const red = '#821200';
const blue = '#1953cb'

export const Summary =({main = false, health, name, level, maxHealth})=>{
    return(
        <div 
        style={{backgroundColor:main? red: blue}}
         className={styles.main}
         >
             <div className={styles.info}> 
                <div className={styles.name}>{name}</div>
                <div className={styles.level}>LVL: {level}</div>
             </div>
             <div className={styles.health}>
                <Bar label="HP" current={health} max={maxHealth} />
             </div>
        </div>
    )
};