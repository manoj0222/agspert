class AuthService{
 
    login(username=null,password=null){
         sessionStorage.setItem("username",username);
         sessionStorage.setItem("password",password);
    }
    logout(){
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("password");
    }
    isLoggedIn(){
        return !!sessionStorage.getItem('username');
    }

}


export default new AuthService();