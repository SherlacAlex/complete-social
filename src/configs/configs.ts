import { Account, Avatars, Client, Databases, Storage } from "appwrite";

const configs = {
    appwriteUrl: String(process.env.REACT_APP_APPWRITE_URL),
    projectId: String(process.env.REACT_APP_APPWRITE_PROJECT_ID),
    databaseId: String(process.env.REACT_APP_APPWRITE_DATABASE_ID),
    postsCollectionId: String(process.env.REACT_APP_APPWRITE_POSTS_COLLECTION_ID),
    usersCollectionId: String(process.env.REACT_APP_APPWRITE_USERS_COLLECTION_ID),
    bucketId: String(process.env.REACT_APP_APPWRITE_BUCKET_ID),
}

export const client = new Client();
client.setProject(configs.projectId);
client.setEndpoint(configs.appwriteUrl);

export const account = new Account(client);
export const database = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);

export default configs;