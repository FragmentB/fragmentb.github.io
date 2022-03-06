import styles from './styles.module.css';

export const StartMenu  =({onStartClick})=>{
    return (
        <div className={styles.main}>
            <button className={styles.StartButton}
            onClick={onStartClick}>
            Start Gam
            </button>
            </div>
    )
}