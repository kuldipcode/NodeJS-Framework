const mongoose = require('mongoose');

const { Schema } = mongoose;

const massSchema = new Schema({
    user_id: String,
    name: String,
    review_count: Number,
    yelping_since: Date,
    useful: Number,
    funny: Number,
    cool: Number,
    elite: String,
    friends: String,
    fans: Number,
    average_stars: Number,
    compliment_hot: Number,
    compliment_more: Number,
    compliment_profile: Number,
    compliment_cute: Number,
    compliment_list: Number,
    compliment_note: Number,
    compliment_plain: Number,
    compliment_cool: Number,
    compliment_funny: Number,
    compliment_writer: Number,
    compliment_photos: Number
})

const User = mongoose.model('Users', massSchema);

module.exports = User;