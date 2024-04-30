const configs = {
    appwriteUrl: String(process.env.REACT_APP_APPWRITE_URL),
    projectId: String(process.env.REACT_APP_APPWRITE_PROJECT_ID),
    databaseId: String(process.env.REACT_APP_APPWRITE_DATABASE_ID),
    collectionId: String(process.env.REACT_APP_APPWRITE_COLLECTION_ID),
    bucketId: String(process.env.REACT_APP_APPWRITE_BUCKET_ID),
}

export default configs;