const mongoose = require('mongoose')

// mongoose
//     .connect(MONGODB_URI)
//     .then(() => {
//         console.log('connected to MongoDB')
//     })
//     .catch((error) => {
//         console.log('error connection to MongoDB:', error.message)
//     })
mongoose.set('strictQuery', true)
mongoose.set('debug', true)
const connectDB = async () => {
    try {
        const connection = await mongoose.connect(
            'mongodb+srv://FullStack:Iy0GNJkGURYCRrmj@cluster0.iq4mx.mongodb.net/persons_db?retryWrites=true&w=majority'
        )
        console.log('connected to MongoDB')
    } catch (error) {
        console.log('error connection to MongoDB:', error.message)
    }
}
module.exports = connectDB
