import PostMessage from "../models/postMessage.js";
import moongose from "mongoose";

export const getPosts = async(req,res) => {
    try{
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages)
    }catch(error){
        res.status(400).json({message : error.message})
    }
}

export const createPosts = async (req , res) => {
    const body = req.body;
    const newPost = new PostMessage({...body,creator:req.userId,createdAt:new Date().toISOString()});
    try{
        await newPost.save()
        res.status(201).json(newPost);
    }catch(error){
        res.status(409).json({message : error.message})
    }
}


export const updatePost = async (req , res ) => {
  const { id : _id } = req.params;
  const post = req.body
  if(!moongose.Types.ObjectId.isValid(_id)) return res.status(404).json({message : "Post not found"});
    try{
        const updatedPost = await PostMessage.findByIdAndUpdate(_id , { ...post , _id} , {new : true});
        res.status(200).json(updatedPost);
    }catch(error){
        res.status(400).json({message : error.message})
    }
}


export const deletePost = async (req,res) => {
    const {id} = req.params;
    if(!moongose.Types.ObjectId.isValid(id)) return res.status(404).json({message : "post not found "});
    try{
        await PostMessage.findByIdAndRemove(id);
        res.status(200).json({message : "post deleted"})
    }catch{
        res.status(400).json({message : error.message})
    }
}


export const likePost = async (req,res) => {
    const { id } = req.params ; 
    if(!req.userId) return res.status(401).json({message : "you are not authorized"});

    if(!moongose.Types.ObjectId.isValid(id)) return res.status(404).json({message : "Post not found"});
    try{
         const  post = await PostMessage.findById(id); 
         const index = post.likes.findIndex((id) => id === String(req.userId));
            if(index === -1){
                post.likes.push(req.userId);
            }else{
                post.likes = post.likes.filter((id) => id !== String(req.userId))
            }
         const updatedPost = await PostMessage.findByIdAndUpdate(id ,  post , { new : true});
         res.status(200).json(updatedPost);
    }catch (error) {
        res.status(400).json({message : error.message})
    }
}