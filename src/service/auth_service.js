/*
    사용자 로그인, 로그아웃
    
    providerName : 구글, 페이스북, 깃헙 등등
*/
import firebase from 'firebase';
class AuthService{
    login(providerName){
        const authProvider = new firebase.auth[`${providerName}AuthProvider`]();
        return firebase.auth().signInWithPopup(authProvider);
    }
}

export default AuthService;