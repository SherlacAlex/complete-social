import configs from "../configs/configs";
import { Client, Databases, Storage, ID } from "appwrite";
export class FileHandlerService {

    constructor(private _client: Client, private _databases: Databases, private _storage: Storage) {
        this._client.setEndpoint(configs.appwriteUrl).setProject(configs.projectId);
        this._databases = new Databases(this._client);
        this._storage = new Storage(this._client);
    }

    public async uploadFile(image: File) {
        try {
            return await this._storage.createFile(configs.bucketId, ID.unique(), image);
        } catch (error) {
            console.error(error);
        }
    }

    public async deleteFile(fileId: string): Promise<boolean> {
        try {
            await this._storage.deleteFile(configs.bucketId, fileId);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    public async getFileUrl(fileId: string) {
        try {
            // this._storage.getFilePreview(configs.bucketId, fileId);
            return `${configs.appwriteUrl}v1/storage/files/${fileId}/preview`;
        } catch (error) {
            console.error(error)
        }
    }
}