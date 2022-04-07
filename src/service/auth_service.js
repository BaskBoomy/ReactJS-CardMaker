/*
    사용자 로그인, 로그아웃
    
    providerName : 구글, 페이스북, 깃헙 등등
*/
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider
} from 'firebase/auth';
class AuthService{
    constructor(){
        this.firebaseAuth = getAuth();
        this.googleProvider = new GoogleAuthProvider();
        this.githubProvier = new GithubAuthProvider();
    }
    login(providerName){
        const authProvider = this.getProvider(providerName);
        return signInWithPopup(this.firebaseAuth, authProvider);
    }
    logout(){
        this.firebaseAuth.signOut();
    }
    onAuthChange(onUserChnaged){
        this.firebaseAuth.onAuthStateChanged((user)=>{
            onUserChnaged(user);
        })
    }
    getProvider(providerName){
        switch(providerName){
            case 'Google':
                return this.googleProvider;
            case 'Github':
                return this.githubProvier;
            default :
                throw new Error('not supported provider');
        }
    }
}

export default AuthService;