import sql from "../configs/db.js"

export const getUserCreations=async(req,resp)=>{
   try{
       const {userId}=req.auth()
       
       const creations=await sql`select * from creations where user_id=${userId} order by created_at DESC`
       resp.json({success: true,creations})
   }
   catch (error){
     resp.json({success:false, message:error.message})
   }
}

export const getPublishedCreations=async(req,resp)=>{
   try{
       const creations=await sql`select * from creations where publish=true`
       resp.json({success: true,creations})
   }
   catch (error){
     resp.json({success:false, message:error.message})
   }
}


export const toggleLikeCreation=async(req,resp)=>{
   try{
       const {userId}=req.auth()
       const {id}=req.body
       const [creation]=await sql`select * from creations where id=${id}`
       
       if(!creation)
       {
              resp.json({success:false, message:"creation not found!"})

       }

       const currentLikes=creation.likes
       const userIdStr=userId.toString()
       let update_likes;
       let message;

       if(currentLikes.includes(userIdStr)){
          update_likes=currentLikes.filter((user)=>user!==userIdStr)
          message='creation unliked'
       }

       else{
        update_likes=[...currentLikes,userIdStr]
        message='creation liked'
       }
                             //converts the JS array to a comma-separated string
       const formattedArray=`{${update_likes.join(',')}}`
                                      //tells postgres this is an array literal not a string
       await sql`update creations set likes=${formattedArray}::text[] where id=${id}`
       
       resp.json({success: true,message})

   }
   catch (error){
     resp.json({success:false, message:error.message})
   }
}