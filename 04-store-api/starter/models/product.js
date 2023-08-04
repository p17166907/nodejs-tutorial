// Import the Mongoose library
const mongoose = require('mongoose')

// Define the Mongoose Schema for the 'product' collection.
// The schema specifies the structure of documents in the collection.
const productSchema = new mongoose.Schema({

    name: { type: String, required: [true, 'product name must be provided'], trim: true },
    price: { type: Number, required: [true, 'price must be provided'] },
    featured: { type: Boolean, default: false },
    rating: { type: Number, default: 4.5, },
    createdAt: { type: Date, default: Date.now() },
    company: { type: String, enum: { values: ['ikea', 'liddy', 'caressa', 'marcos'], message: '{VALUE} is not supported' } }
})

module.exports = mongoose.model('Product', productSchema)