import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../card/card';
import Editor from '../editor/editor';
import Footer from '../footer/footer';
import Header from '../header/header';
import Preview from '../preview/preview';
import styles from './maker.module.css';

const Maker = ({authService}) => {
    const [cards,setCards] = useState({
        '1':{
            id: '1',
            name: 'Jack1',
            company: 'Samsung',
            theme: 'dark',
            title: 'Software Engineer',
            email: 'whdgurtpqms@gmail.com',
            message: 'go for it',
            fileName: 'jack',
            fileURL: 'jack.png'
        },
        '2':{
            id: '2',
            name: 'Jack2',
            company: 'Samsung',
            theme: 'light',
            title: 'Software Engineer',
            email: 'whdgurtpqms@gmail.com',
            message: 'go for it',
            fileName: 'jack',
            fileURL: null
        },
        '3':{
            id: '3',
            name: 'Jack3',
            company: 'Samsung',
            theme: 'colorful',
            title: 'Software Engineer',
            email: 'whdgurtpqms@gmail.com',
            message: 'go for it',
            fileName: 'jack',
            fileURL: null
        }
    });
    const navigate = useNavigate();
    const onLogout = () => {
        authService.logout();
    };

    useEffect(()=>{
        authService.onAuthChange(user=>{
            if(!user){
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
    }
    const deleteCard = (card) => {
        setCards(cards => {
            const updated = {...cards};
            delete updated[card.id];
            return updated;
        });
    }
    return(
        <section className={styles.maker}>
            <Header onLogout={onLogout}/>
            <div className={styles.container}>
                <Editor cards={cards} addCard={createOrUpdateCard} updateCard={createOrUpdateCard} deleteCard={deleteCard}/>
                <Preview cards={cards}/>
            </div>
            <Footer/>
        </section>
    )
};

export default Maker;