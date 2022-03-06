import { useEffect, useState } from "react";
import {playerStats, opponentStats, attack, wait, magic} from 'shared'

export const useBattleSequence =(sequence)=>{

    const [turn,setTurn] = useState(0);
    const [inSequence, setInSequence] = useState(false);
    const [opponentHealth, setOpponentHealth] = useState(opponentStats.info.maxHealth);
    const [playerHealth, setPlayerHealth] = useState(playerStats.info.maxHealth);
    const [announcerMessage, setAnnouncerMessage] = useState('')
    const [playerAnimation, setPlayerAnimation] = useState('static');
    const [opponentAnimation, setOpponentAnimation] = useState('static');

    useEffect(()=> {
        const {mode,turn} = sequence;

        if(mode){

            const attacker = turn=== 0 ? playerStats: opponentStats;
            const receiver = turn=== 1 ? playerStats: opponentStats;

            switch(mode){
                case 'attack':
                    {
                        const damage = attack({attacker, receiver});
                        
                        ( async()=> {
                            setInSequence(true)
                            setAnnouncerMessage(`${attacker.name} decided to attack!`)

                            await wait(1000);
                            
                            turn === 0
                            ? setPlayerAnimation('attack')
                            : setOpponentAnimation('attack');
                            await wait(100);

                            turn === 0
                            ? setPlayerAnimation('static')
                            : setOpponentAnimation('static');
                            await wait(500);

                            turn === 1
                            ? setPlayerAnimation('damage')
                            : setOpponentAnimation('damage');
                            await wait(750);

                        turn === 1
                            ? setPlayerAnimation('static')
                            : setOpponentAnimation('static');
                            
                            setAnnouncerMessage(`${receiver.name} got hurt`)

                            turn === 1
                            ? setPlayerHealth( h => ( h - damage > 0 ? h - damage : 0))
                            : setOpponentHealth( h => ( h - damage > 0 ? h - damage : 0));

                            await wait(2000);

                            setAnnouncerMessage(`Now it's  time for ${receiver.name} to go`);

                            await wait(1500);

                            setTurn(turn === 0? 1:0);
                            setInSequence(false);

                        })();
                        break;
                    }

                    case 'magic':
                    {
                        const damage = magic({attacker, receiver});
                        
                        ( async()=> {
                            setInSequence(true)
                            setAnnouncerMessage(`${attacker.name} decided to magic!`)

                            await wait(1000);
                            
                            turn === 0
                            ? setPlayerAnimation('magic')
                            : setOpponentAnimation('magic');
                            await wait(1000);

                            turn === 0
                            ? setPlayerAnimation('static')
                            : setOpponentAnimation('static');                            
                            await wait(500);

                            turn === 1
                            ? setPlayerAnimation('damage')
                            : setOpponentAnimation('damage');
                            await wait(750);

                        turn === 1
                            ? setPlayerAnimation('static')
                            : setOpponentAnimation('static');
                            
                            setAnnouncerMessage(`${receiver.name} got hurt`)

                            turn === 1
                            ? setPlayerHealth(h=>{h-damage> 0? h-damage: 0})
                            : setOpponentHealth(h=>{h-damage> 0? h-damage: 0});

                            await wait(2000);

                            setAnnouncerMessage(`Now it's  time for ${receiver.name} to go`);

                            await wait(1500);

                            setTurn(turn === 0? 1:0);
                            setInSequence(false);

                        })();
                        break;
                    }

                    case 'heal':
                    {
                        const undamage = heal({attacker});
                        
                        ( async()=> {
                            setInSequence(true)
                            setAnnouncerMessage(`${attacker.name} decided to magic!`)

                            await wait(1000);
                            
                            turn === 0
                            ? setPlayerAnimation('magic')
                            : setOpponentAnimation('magic');
                            await wait(1000);

                            turn === 0
                            ? setPlayerAnimation('static')
                            : setOpponentAnimation('static');                            
                            await wait(500);

                            turn === 1
                            ? setPlayerAnimation('damage')
                            : setOpponentAnimation('damage');
                            await wait(750);

                        turn === 1
                            ? setPlayerAnimation('static')
                            : setOpponentAnimation('static');
                            
                            setAnnouncerMessage(`${receiver.name} got hurt`)

                            turn === 1
                            ? setPlayerHealth(h=>{h-damage> 0? h-damage: 0})
                            : setOpponentHealth(h=>{h-damage> 0? h-damage: 0});

                            await wait(2000);

                            setAnnouncerMessage(`Now it's  time for ${receiver.name} to go`);

                            await wait(1500);

                            setTurn(turn === 0? 1:0);
                            setInSequence(false);

                        })();
                        break;
                    }
                default:
                    break;
            }
        }
    }, [sequence]);

    return{
        turn, 
        inSequence, 
        playerHealth,
        opponentHealth,
        announcerMessage,
        playerAnimation,
        opponentAnimation,
    }

};