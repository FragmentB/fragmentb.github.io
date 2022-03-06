import { BattleMenu, BattleAnnouncer, Summary } from 'components';
import styles from './styles.module.css';
import {playerStats, opponentStats} from 'shared'
import { useState } from 'react';
import { useBattleSequence } from 'hooks';


export const Battle =()=>{

    const [sequence, setSequence] = useState({});

  const {
    turn,
    inSequence,
    playerHealth,
    opponentHealth,
    playerAnimation,
    opponentAnimation,
    announcerMessage,
  } = useBattleSequence(sequence);

    return(
        <>
            <div className={styles.opponent}>
                <div className={styles.summary}>
                    <Summary
                        health={opponentStats.maxHealth}
                        level={opponentStats.level}
                        name={opponentStats.name}
                        maxHealth={opponentStats.maxHealth}
                    />
                </div>
            </div>
            <div className={styles.character}>
                <div className={styles.gameHeader}>
                    {playerStats.name} vs {opponentStats.name}
                </div>
                <div className={styles.gameImages}>
                    <div className={styles.playerSprite}>
                        <img
                            alt={playerStats.name}
                            src={playerStats.info.img}
                            style={{width:'150px'}}
                            //className={styles.playerSprite}
                        />
                    </div>
                    <div className={styles.opponentSprite}>
                    <img
                            alt={opponentStats.name}
                            src={opponentStats.info.img}
                            style={{width:'150px'}}
                            //className={styles.playerSprite}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.user}>
                <div className={styles.summary}>
                    <Summary main={true}
                        health={playerStats.playerHealth}
                        level={playerStats.level}
                        name={playerStats.name}
                        maxHealth={playerStats.maxHealth}
                    />
                </div>
                <div className={styles.hud}>
                    <div className={styles.hudChild}>
                        <BattleAnnouncer message={
                            announcerMessage || `What will ${playerStats.info.name} do?`}/>
                    </div>
                    <div className={styles.hudChild}>
                        <BattleMenu
                        onAttack = {()=> console.log('Hit')}
                        onMagic = {()=> console.log('Cry')}
                        onHeal = {()=> console.log('Sip')}
                        />
                    </div>
                </div>
            </div>
        </>
    )
};