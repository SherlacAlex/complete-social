import configs from "../configs/configs";
import { Client, Databases, Storage, Query } from "appwrite";
import { Article } from "../models/Article";

export class PostService {

    private _client: Client = new Client();
    private _databases: Databases;
    private _storage: Storage;

    constructor() {
        this._client.setEndpoint(configs.appwriteUrl).setProject(configs.projectId);
        this._databases = new Databases(this._client);
        this._storage = new Storage(this._client);
    }

    public async getAllPost() {
        const queries: string[] = [
            Query.equal('status', 'active')
        ];
        try {
            return await this._databases.listDocuments(configs.databaseId, configs.collectionId, queries)
        } catch (error) {
            console.error(error);
        }
    }

    public async getPost(referenceId: string) {
        try {
            return await this._databases.getDocument(configs.databaseId, configs.collectionId, referenceId)
        } catch (error) {
            console.error(error)
        }
    }

    public async createPost(referenceId: string, post: Article) {
        try {
            return await this._databases.createDocument(configs.databaseId, configs.collectionId, referenceId, post);
        } catch (error) {
            console.error(error);
        }
    }

    public async updatePost(referenceId: string, post: Article) {
        try {
            return await this._databases.updateDocument(configs.databaseId, configs.collectionId, referenceId, post);
        } catch (error) {
            console.error(error)
        }
    }

    public async deletePost(referenceId: string) {
        try {
            await this._databases.deleteDocument(configs.databaseId, configs.collectionId, referenceId);
            return true;
        } catch (error) {
            console.error(error)
            return false;
        }
    }
}

const postService = new PostService();

export default postService;