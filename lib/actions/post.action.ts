"use server"

import { revalidatePath } from "next/cache";
import Post from "../models/post.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose"
import { FilterQuery, SortOrder } from "mongoose";

interface Params{
    text: string,
    image:string,
    author:string,
    groupId: string|null,
    path:string,
}
export async function createPost({text, author,image, groupId, path}:Params){
    connectToDB();
    
    const createdPost= await Post.create({
        text,
        image,
        author,
        group: null,

    });
    
    await User.findByIdAndUpdate(author, {
        $push:{posts: createdPost._id}
    })

    revalidatePath(path);
}

export async function fetchPosts(pageNUmber=1, pageSize=20){
    connectToDB();

    const skipAmount = (pageNUmber- 1) * pageSize;

    const postQuery= Post.find({parentId: {$in:[null, undefined]}})
    .sort({createdAt:"desc"})
    .skip(skipAmount)
    .limit(pageSize)
    .populate({path:'author', model: User})
    .populate({
        path:'children',
        populate:{
            path:'author',
            model:User,
            select:"*"
        }
    })
    const totalPostCount = await Post.countDocuments({parentId:{$in:[null, undefined]}});

    const posts= await postQuery.exec();
    const isNext= totalPostCount>skipAmount +posts.length;

    return {posts, isNext};
}

export async function fetchPostById(postId:string){
    connectToDB();
    try {
        //to do groups
        const post = await Post.findById(postId)
        .populate({
            path: 'author',
            model: User,
            select: "_id id username name image",
        }).populate({
            path: 'children',
            populate:[
                {
                    path: 'author',
                    model: User,
                    select: "_id id username parentId name image"
                },
                {
                    path:'children',
                    model: Post,
                    populate:{
                        path:'author',
                        model:User,
                        select: "_id id name parentId image"
                    }
                }
            ]
        }).exec();
        return post;
    } catch (error:any) {
        throw new Error(`Failed to fetch post: ${error.message}`)
    }

}

export async function addComment({postId,text,userId,path,image}:{
    postId: string,
    text: string,
    userId:string,
    path:string,
    image?:string,
}
){
    connectToDB();

    try {
        // find the original post by its Id
        const parentPost= await Post.findById(postId);
        if(!parentPost)
            throw new Error(`Post not found`);

        // creating a new post 
        const comment= new Post({
            text: text,
            author: userId,
            parentId: postId,
            image:image
        })

        // saving the new post
        const savedComment= await comment.save();

        // update the original post 
        parentPost.children.push(savedComment._id);

        await parentPost.save();

    } catch (error:any) {
        throw new Error(`Failed to post comment: ${error.message}`)
    }
}


export async function fetchSearchPosts({
    userId,
    searchString = "",
    pageNumber = 1,
    pageSize = 20,
    sortBy = "desc",
    }: {
    userId: string|undefined;
    searchString?: string;
    pageNumber?: number;
    pageSize?: number;
    sortBy?: SortOrder;
    }) {
        try {
            connectToDB();

            // Calculate the number of posts to skip based on the page number and page size.
            const skipAmount = (pageNumber - 1) * pageSize;

            // Create a case-insensitive regular expression for the provided search string.
            const regex = new RegExp(searchString, "i");

            // Create an initial query object to filter posts.
            const query: FilterQuery<typeof Post> = {
                author: { $ne: userId }, // Only fetch posts created by the current user.
            };

            // If the search string is not empty, add the $or operator to match the text field.
            if (searchString.trim() !== "") {
                query.text = { $regex: regex };
            }

            // Define the sort options for the fetched posts based on createdAt field and provided sort order.
            const sortOptions = { createdAt: sortBy };

            const postsQuery = Post.find(query)
            .sort(sortOptions)
            .skip(skipAmount)
            .limit(pageSize);

            // Count the total number of posts that match the search criteria (without pagination).
            const totalPostsCount = await Post.countDocuments(query);

            const posts = await postsQuery.exec();

            // Check if there are more posts beyond the current page.
            const isNext = totalPostsCount > skipAmount + posts.length;

            return { posts, isNext };
        } catch (error) {
            console.error("Error fetching posts:", error);
            throw error;
        }
}
