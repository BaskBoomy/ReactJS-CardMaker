import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../card/card';
import Editor from '../editor/editor';
import Footer from '../footer/footer';
import Header from '../header/header';
import Preview from '../preview/preview';
import styles from './maker.module.css';

const Maker = ({ FileInput, authService, cardRepository}) => {
    const locationState = useLocation().state;
    const [cards,setCards] = useState({});
    const [userId, setUserId] = useState(locationState&&locationState.id);
    const navigate = useNavigate();
    const onLogout = () => {
        authService.logout();
    };
        

    useEffect(()=>{
        if(!userId){
            return;
        }
        // stopSync = card_repository.js에서 return gks off(query); 함수임
        const stopSync = cardRepository.syncCards(userId, cards =>{
            setCards(cards);
        })
        //컴포넌트가 unmount되었을 때, syncCards함수에서 구현한 return 함수(return () => off(query);)를 호출해준다.
        return () => {
            //리소스정리, 메모리정리 => 불필요한 네트워크 사용 최소화
            stopSync();
        }
    },[userId]);
    useEffect(()=>{
        authService.onAuthChange(user=>{
            if(user){
                setUserId(user.uid);
            }else{
                navigate('/');
            }
        })
    })

    const createOrUpdateCard = (card) => {
        /*
        방법 1
        //updated에 cards의 데이터를 모두 복사
        const updated = {...cards};
        //받아온 card의 데이터를 key를 활용하여 정보를 수정한다.
        updated[card.id] = card;
        //수정한 정보를 set해준다.
        setCards(updated);
        */
       //방법 2
        setCards(cards => {
            const updated = {...cards};
            updated[card.id] = card;
            return updated;
        });
        cardRepository.saveCard(userId, card);
    }
    const deleteCard = (card) => {
        setCards(cards => {
            const updated = {...cards};
            delete updated[card.id];
            return updated;
        });
        cardRepository.removeCard(userId, card);
    }
    return(
        <section className={styles.maker}>
            <Header onLogout={onLogout}/>
            <div className={styles.container}>
                <Editor FileInput={FileInput} cards={cards} addCard={createOrUpdateCard} updateCard={createOrUpdateCard} deleteCard={deleteCard}/>
                <Preview cards={cards}/>
            </div>
            <Footer/>
        </section>
    )
};

export default Maker;