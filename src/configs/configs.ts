import { Account, Client, Databases } from "appwrite";

const configs = {
    appwriteUrl: String(process.env.REACT_APP_APPWRITE_URL),
    projectId: String(process.env.REACT_APP_APPWRITE_PROJECT_ID),
    databaseId: String(process.env.REACT_APP_APPWRITE_DATABASE_ID),
    collectionId: String(process.env.REACT_APP_APPWRITE_COLLECTION_ID),
    bucketId: String(process.env.REACT_APP_APPWRITE_BUCKET_ID),
}

export const client = new Client();
client.setProject(configs.projectId);
client.setEndpoint(configs.appwriteUrl);

export const account = new Account(client);
export const database = new Databases(client);

export default configs;