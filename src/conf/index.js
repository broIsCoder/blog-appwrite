const conf = {
  appwrite_Url: String(process.env.REACT_APP_APPWRITE_URL),
  appwrite_ProjectId: String(process.env.REACT_APP_APPWRITE_PROJECT_ID),
  appwrite_DatabaseId: String(process.env.REACT_APP_APPWRITE_DATABASE_ID),
  appwrite_CollectionId: String(process.env.REACT_APP_APPWRITE_COLLECTION_ID),
  appwrite_BucketId: String(process.env.REACT_APP_APPWRITE_BUCKET_ID),
};

export default conf;