import configs, { account, avatars, database } from "../configs/configs";
import { ID, Query } from "appwrite";
import { ILoginData, ISignUpData } from "../models/AuthData";
import { IUserData } from "../models/UserData";

export class AuthService {

    public async createAccount(userData: ISignUpData) {
        try {
            const userAccount = await account.create(ID.unique(), userData.email, userData.password, userData.username);
            
            if(!userAccount) throw Error;

            const avatar = avatars.getInitials(userData.username);
            const userDetails: IUserData = {
                accountid: userAccount.$id,
                email: userAccount.email,
                name: userAccount.name,
                username: userData.username,
                imageurl: avatar
            }

            const newUser = await this.addNewUser(userDetails)
            return userAccount;
        } catch (error) {
            throw error;
        }
    }

    public async addNewUser(userData: IUserData) {
        try {
            const newUser = await database.createDocument(configs.databaseId,
                configs.usersCollectionId, 
                ID.unique(),
                userData)

            return newUser;
        } catch (error) {
            console.log(error)
        }
    }

    public async userLogin(userData: ILoginData){
        try {
            const userAccount = await account.createEmailPasswordSession(userData.username, userData.password);
            return userAccount; 
        } catch (error) {
            throw error;
        }
    }

    public async getCurrentUser() {
        try {
            const currentAccount = await account.get();
            if(!currentAccount) throw Error;

            const currentUser = await database.listDocuments(configs.databaseId, configs.usersCollectionId, [Query.equal('accountid', currentAccount.$id)]);
            if(!currentUser) throw Error;

            return currentUser.documents[0];
        } catch (error) {
            console.log(error);
            return null;
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