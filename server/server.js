import express from 'express'
import cors from 'cors'
//Loads environment variables from a .env file into process.env.
//I can use process.env.PORT to access the .env vars
import 'dotenv/config'

import {clerkMiddleware, requireAuth} from '@clerk/express'
import aiRouter from './routes/aiRoutes.js'
import connectCloudinary from './configs/cloudinary.js'
import userRouter from './routes/userRoutes.js'

//Creates an Express application object app.
//I can use app to define routes, middlewares, and server behavior.
const app=express()

await connectCloudinary()
  
/* 
By default, browsers block requests from one domain to another (for security reasons).
cors middleware allows my backend to accept requests from other origins (e.g., React frontend running on http://localhost:5173 making requests to your API at http://localhost:3000).
*/

//Middlewares
//Registers the CORS middleware so all requests to my API are allowed from different origins. Without this, my frontend might get blocked by the browser with a CORS error
app.use(cors())

//Express by default doesn’t know how to handle JSON request bodies.
//This middleware parses JSON payloads (Content-Type: application/json) and makes the data available in req.body.
app.use(express.json())

//adding clerk middleware so we can handle auth request, integrating clerk in the backend
app.use(clerkMiddleware())

app.get('/',(req,res)=>res.send('server is live'))

//only logged in user can access the routes coming after those lines
app.use(requireAuth())
       //url that my express server listens to,mounts the aiRouter.js routes
app.use('/api/ai',aiRouter)
//or any request that starts with /api/users, send control to this router & the router will check the sub route and forward the req to the right controller
app.use('/api/user',userRouter)


//Looks for a PORT variable in the environment (from .env file or deployment platform).
const PORT=process.env.PORT || 3000;
//Starts the server and makes it listen for incoming HTTP requests.
app.listen(PORT,()=>{
    console.log('server is runnig on port',PORT)
})