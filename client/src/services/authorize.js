//เก็บ token / username =>session storage
export const authenticate = (response, next) => {
    if (typeof window !== "undefined" && response.data) {
        const { token, username } = response.data;

        if (token && username) {
            sessionStorage.setItem("token", JSON.stringify(token));
            sessionStorage.setItem("user", JSON.stringify(username));
            next();
        } else {
            console.error('Token หรือ Username ไม่พบใน response');
        }
    }
};

//ดึงข้อมูล token
export const getToken=()=>{
    if(window !=="undefined"){
        if(sessionStorage.getItem("token")){
            return JSON.parse(sessionStorage.getItem("token"))
        }else{
            return false
        }
    }
}

//ดึงข้อมูล user
export const getUser=()=>{
    if(window !=="undefined"){
        if(sessionStorage.getItem("user")){
            return JSON.parse(sessionStorage.getItem("user"))
        }else{
            return false
        }
    }
}

// logout 
export const logout = (navigate) => {
    if (typeof window !== "undefined") {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");

        // Navigate ไปยังหน้า login
        navigate('/login');
    }
};