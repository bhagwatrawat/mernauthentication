require('dotenv').config();
const express =require('express');
const connectDB= require('./config/db');
connectDB();
const app = express();
app.use(express.json());
app.use('/api/auth',require('./routes/auth'));
const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});  