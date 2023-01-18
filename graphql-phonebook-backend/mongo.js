const mongoose = require('mongoose')

mongoose.set('strictQuery', true)
// mongoose
//     .connect(MONGODB_URI)
//     .then(() => {
//         console.log('connected to MongoDB')
//     })
//     .catch((error) => {
//         console.log('error connection to MongoDB:', error.message)
//     })
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
