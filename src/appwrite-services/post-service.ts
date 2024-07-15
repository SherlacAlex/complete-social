import configs from "../configs/configs";
import { Client, Databases, Storage, Query } from "appwrite";
import { Article } from "../models/Article";

export class PostService {

    client = new Client();
    private _databases: Databases;
    private _storage: Storage;

    constructor() {
        console.log(configs.appwriteUrl)
        this.client.setEndpoint(configs.appwriteUrl)
        .setProject(configs.projectId); 
        this._databases = new Databases(this.client);
        this._storage = new Storage(this.client);
    }

    public async getAllPost() {
        const queries: string[] = [
            Query.equal('status', 'active')
        ];
        try {
            return await this._databases.listDocuments(configs.databaseId, configs.postsCollectionId, queries)
        } catch (error) {
            console.error(error);
        }
    }

    public async getPost(referenceId: string) {
        try {
            return await this._databases.getDocument(configs.databaseId, configs.postsCollectionId, referenceId)
        } catch (error) {
            console.error(error)
        }
    }

    public async createPost(referenceId: string, post: Article) {
        try {
            return await this._databases.createDocument('65c279c625b68885b0ae', '65c27a0233ff7d562c07', referenceId, post);
        } catch (error) {
            console.error(error);
        }
    }

    public async updatePost(referenceId: string, post: Article) {
        try {
            return await this._databases.updateDocument(configs.databaseId, configs.postsCollectionId, referenceId, post);
        } catch (error) {
            console.error(error)
        }
    }

    public async deletePost(referenceId: string) {
        try {
            await this._databases.deleteDocument(configs.databaseId, configs.postsCollectionId, referenceId);
            return true;
        } catch (error) {
            console.error(error)
            return false;
        }
    }
}

const postService = new PostService();

export default postService;