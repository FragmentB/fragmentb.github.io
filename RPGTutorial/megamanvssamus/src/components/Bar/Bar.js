import styles from './styles.module.css';

export const Bar =({label,current,max})=>{
    return(
        <div className={styles.main}>
            <div className={styles.label}> {label}</div>
            <div className={styles.max}>
                <div className={styles.current} style={{width: `${(current/max)*100}%`}}></div>
            </div>
        </div>
    )
};