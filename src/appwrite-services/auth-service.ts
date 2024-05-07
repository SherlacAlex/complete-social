import configs from "../configs/configs";
import { Client, Account, ID } from "appwrite";

export class AuthService {

    client = new Client();
    
    account;

    constructor() {
        this.client.setEndpoint(configs.appwriteUrl)
        .setProject(configs.projectId); 
        this.account = new Account(this.client);
    }

    public async createAccount(email: string, password: string, name: string) {
        try {
            const userAccount = await this.account.create(ID.unique(),email, password, name);
            
            if(userAccount) {
                this.userLogin(email, password);
            }
            else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    public async userLogin(email:string, password: string){
        try {
            const userAccount = await this.account.createEmailPasswordSession(email, password);
            return userAccount; 
        } catch (error) {
            throw error;
        }
    }

    public async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            throw error
        }
    }

    public async logUserOut() {
        try {
            await this.account.deleteSession('current')
        } catch (error) {
            throw error
        }
    }
}

const authService = new AuthService();

export default authService;