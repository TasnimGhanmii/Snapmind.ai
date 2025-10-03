//api controller fct
import OpenAI from "openai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import {v2 as cloudinary} from 'cloudinary'
import FormData from 'form-data'


const AI = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export const generateArticle=async(req,resp)=>{
    try{
       const{userId}=req.auth();
       const{prompt,length}=req.body;
       const plan=req.plan;
       const free_usage=req.free_usage;

       if(plan!=='premium' && free_usage>=10)
       {
          return resp.json({success:false,message:"limit reached.Upgrade to continue."}) 
       }

       const response = await AI.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [
        {
            role: "user",
            content:prompt,
        },
    ],
    temperature:0.7,
    max_tokens:length,
  });

  const content=response.choices[0].message.content;
  
  await sql`insert into creations (user_id,prompt,content,type) values (${userId},${prompt},${content},'article')`
  
  if(plan!=='premium'){
    await clerkClient.users.updateUserMetadata(userId,{
        privateMetadata:{
            free_usage:free_usage+1
        }
    })
  }
  resp.json({success:true,content})
    }
    catch (error) {
         console.log(error.message)
         resp.json({success:false,message:error.message})
    }
}

export const generateBlogTitle=async(req,resp)=>{
    try{
       const{userId}=req.auth();
       const{prompt}=req.body;
       const plan=req.plan;
       const free_usage=req.free_usage;

       if(plan!=='premium' && free_usage>=10)
       {
          return resp.json({success:false,message:"limit reached.Upgrade to continue."}) 
       }

       const response = await AI.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [
        {
            role: "user",
            content:prompt,
        },
    ],
    temperature:0.7,
    max_tokens:100,
  });

  const content=response.choices[0].message.content;
  
  await sql`insert into creations (user_id,prompt,content,type) values (${userId},${prompt},${content},'blog-article')`
  
  if(plan!=='premium'){
    await clerkClient.users.updateUserMetadata(userId,{
        privateMetadata:{
            free_usage:free_usage+1
        }
    })
  }
  resp.json({success:true,content})
    }
    catch (error) {
         console.log(error.message)
         resp.json({success:false,message:error.message})
    }
}

export const generateImage=async(req,resp)=>{
    try{
       const{userId}=req.auth();
       const{prompt,publish}=req.body;
       const plan=req.plan;

       if(plan!=='premium')
       {
          return resp.json({success:false,message:"Only available for Premium!"}) 
       }


  
  const formData = new FormData()
 formData.append('prompt', prompt)
 const {data}=await axios.post('https://clipdrop-api.co/text-to-image/v1',formData,{
    headers:{'x-api-key': process.env.CLIP_DROP_API_KEY,},
    responseType:"arraybuffer"
 })

 const base64Image=`data:Image/png;base64,${Buffer.from(data,'binary').toString('base64')}`
 
 const {secure_url}=await cloudinary.uploader.upload(base64Image)
  
  await sql`insert into creations (user_id,prompt,content,type,publish) values (${userId},${prompt},${secure_url},'image',${publish ?? false})`
  
  
  resp.json({success:true,content:secure_url})
    }
    catch (error) {
         console.log(error.message)
         resp.json({success:false,message:error.message})
    }
}


export const removeBackround=async(req,resp)=>{
    try{
       const{userId}=req.auth();
       const{photo}=req.file;
       const plan=req.plan;

       if(plan!=='premium')
       {
          return resp.json({success:false,message:"Only available for Premium!"}) 
       }


  
  
  const {secure_url}=await cloudinary.uploader.upload(photo.path,{transformation:[{
       effect:'backround_removal',
       backround_removal:'remove_the_backround'
  }]})


  
  await sql`insert into creations (user_id,prompt,content,type) values (${userId},'Remove backround from image',${secure_url},'image')`
  
  
  resp.json({success:true,content:secure_url})
    }
    catch (error) {
         console.log(error.message)
         resp.json({success:false,message:error.message})
    }
}


export const RemoveObject=async(req,resp)=>{
    try{
       const{userId}=req.auth();
       const{object}=req.body;
       const{photo}=req.file;
       const plan=req.plan;

       if(plan!=='premium')
       {
          return resp.json({success:false,message:"Only available for Premium!"}) 
       }


  
  
  const {public_id}=await cloudinary.uploader.upload(photo.path)
  
  const image_url=cloudinary.url(public_id,{
    transformation:[{effect:`gen_remove:${object}`}],
    resource_type:'image'
  })

  
  await sql`insert into creations (user_id,prompt,content,type) values (${userId},'${`Removed ${object} from image`},${image_url},'image')`
  
  
  resp.json({success:true,content:image_url})
    }
    catch (error) {
         console.log(error.message)
         resp.json({success:false,message:error.message})
    }
}