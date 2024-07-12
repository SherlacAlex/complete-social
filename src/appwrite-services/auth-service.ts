import configs, { account } from "../configs/configs";
import { Client, Account, ID } from "appwrite";
import { ISignUpData } from "../models/AuthData";

export class AuthService {

    public async createAccount(userData: ISignUpData) {
        try {
            const userAccount = await account.create(ID.unique(),userData.email, userData.password, userData.username);
            return userAccount;
        } catch (error) {
            throw error;
        }
    }

    public async userLogin(email:string, password: string){
        try {
            const userAccount = await account.createEmailPasswordSession(email, password);
            return userAccount; 
        } catch (error) {
            throw error;
        }
    }

    public async getCurrentUser() {
        try {
            return await account.get();
        } catch (error) {
            throw error
        }
    }

    public async logUserOut() {
        try {
            await account.deleteSession('current')
        } catch (error) {
            throw error
        }
    }
}

const authService = new AuthService();

export default authService;