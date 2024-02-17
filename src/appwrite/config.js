import conf from "../conf";
import { Client, Databases, Storage, Query, ID } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwrite_Url)
      .setProject(conf.appwrite_ProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  //Database service for storing blog
  //slug is unique for each blog post (UNIQUE ID)

  // get a blog post
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwrite_DatabaseId,
        conf.appwrite_CollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite service :: getPost() :: ", error);
      return false ;
    }
  }

  // get list of active status blog posts
  async getPosts(queries = [Query.equal("status", true)]) {
    try {
      return await this.databases.listDocuments(
        conf.appwrite_DatabaseId,
        conf.appwrite_CollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite service :: getPosts() :: ", error);
      return false;
    }
  }

  //create a blog post
  async createPost({ title, content, featuredImage, status, userId, slug }) {
    try {
      return await this.databases.createDocument(
        conf.appwrite_DatabaseId,
        conf.appwrite_CollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createPost() :: ", error);
      return false;
    }
  }

  //update a blog post
  async updatePost({ slug, title, content, featuredImage, status }) {
    console.log("Updated Queued",{slug,title,content,featuredImage,status})
    try {
      return await this.databases.updateDocument(
        conf.appwrite_DatabaseId,
        conf.appwrite_CollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost() :: ", error);
      return false;
    }
  }

  //delete a blog post
  async deletePost( slug ) {
    try {
      await this.databases.deleteDocument(
        conf.appwrite_DatabaseId,
        conf.appwrite_CollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost() :: ", error);
      return false;
    }
  }

  //Storage service for storing images
  //upload featuredImage
  
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwrite_BucketId,
        ID.unique(), //generate unique id for file/image
        file
      );
    } catch (error) {
      console.log("Storage service :: uploadFile() :: ", error);
      return false;
    }
  }

  //delete featuredImage
  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(conf.appwrite_BucketId, fileId);
    } catch (error) {
      console.log("Storage service :: deleteFile() :: ", error);
      return false;
    }
  }

  //preview featuredImage
  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwrite_BucketId, fileId).href;
  }
}

const appwriteService = new Service();
export default appwriteService;
