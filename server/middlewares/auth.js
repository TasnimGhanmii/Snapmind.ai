//middleware to check userId & hasPremiumPlan
//Middleware is all about preparing the request object with everything downstream handlers need, so those handlers don’t care where the data originally came from.
import { clerkClient } from "@clerk/express";
import { use } from "react";

export const auth=async(req,res,next)=>{
    try{
        //auth() is a clerk method returning an object containing attributes & methods,gives lightweight infos
        const {userId,has}=await req.auth();
        //has is a clerk predefined helper, returns a boolean
        const hasPremiumPlan=await has({plan: 'premium'});
        
        //full user object
        const user=await clerkClient.users.getUser(userId);

        //This branch is for non-premium users who still have free quota.
                              //checks if private metadata has free_usage
        if(!hasPremiumPlan && user.privateMetadata.free_usage)
        {
                           //free_usage of the already fetched user (in memory)
            req.free_usage=user.privateMetadata.free_usage;
        }
        //user is premium or have no quota
        else{
            //updates clerk's DB
            await clerkClient.users.updateUserMetadata(userId,{
                privateMetadata:{
                    free_usage:0
                } 
            })
            //gotta do it explicitly cause ser.privateMetadata.free_usage contains the old in memory value
            req.free_usage=0;
        }
        
        req.plan=hasPremiumPlan ? 'premium' : 'free';
        //is an Express middleware function that tells Express:
        //“I’m done with this middleware, pass control to the next middleware or route handler.”
        //Without next(), the request would hang forever because Express doesn’t know to move on.
        //Express waits for the middleware to finish before moving on to the next middleware or the route handler, if I don't call next() it wouldn't know what to do 
        next();

    }
    catch (error)
    {
        res.json({success:false,message: error.message});
    }
}