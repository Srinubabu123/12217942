const mongoose=require('mongoose');

const clickSchema=new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    referrer: String,
    geo: String
})
const urlSchema=new mongoose.Schema({
    originalUrl: {type: String, required: true},
    shortCode:  {type: String, required: true},
    createdDate: {type: Date, default: Date.now},
    expiryDate: Date,
    clicks: [clickSchema]
});

module.exports=mongoose.model('Url',urlSchema);