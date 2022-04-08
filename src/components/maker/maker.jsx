import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Editor from '../editor/editor';
import Footer from '../footer/footer';
import Header from '../header/header';
import Preview from '../preview/preview';
import styles from './maker.module.css';

const Maker = ({authService}) => {
    const [cards,setCards] = useState([
        {
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
        {
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
        {
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
    ]);
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
    return(
        <section className={styles.maker}>
            <Header onLogout={onLogout}/>
            <div className={styles.container}>
                <Editor cards={cards}/>
                <Preview cards={cards}/>
            </div>
            <Footer/>
        </section>
    )
};

export default Maker;