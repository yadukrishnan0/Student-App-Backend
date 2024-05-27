const express =require('express')
const app =express()
const dotenv =require('dotenv')
const dbConnection =require('./config/dbConnection')
dotenv.config();
const port = 3000
const userRouter =require('./routers/userRouter')
const adminRouter =require('./routers/adminRouter')
const cors =require('cors')
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const corsOption ={
    origin:'http://localhost:5173'
};
app.use(cors())
app.use('/',userRouter)
app.use('/',adminRouter)

dbConnection().then(()=>{
    app.listen(port,()=>{
        console.log(`server running ${port}`)
    })
})