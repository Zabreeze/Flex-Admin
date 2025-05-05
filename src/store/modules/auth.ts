import { defineStore } from "pinia";
import { loginApi } from '@/api/modules/auth';
import { setToken, getToken, removeToken } from "@/utils";


const useAuthStore = defineStore("Auth",{
    state: ()=>{
        return {
            token: ""
        }
    },
    actions: {
        async login(loginForm){
            const result = await loginApi(loginForm)
            if (result.code == 200) {
                this.token = result.data.token as string;
                setToken(this.token);
                return "ok";
              } else {
                return Promise.reject(new Error(result.msg));
              }
        },
        async logout(loginForm){
            const result = await loginApi(loginForm)
            if (result.code == 200) {
                this.token = "";
                removeToken();
                return "ok";
            } else {
                return Promise.reject(new Error(result.msg));
            }
        }
    }
})

export default useAuthStore;