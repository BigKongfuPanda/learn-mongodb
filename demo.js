const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {type: String, unique: true},
    posts: [{type: Schema.Types.ObjectId, ref: 'Post'}]
});
const User = mongoose.model('User', UserSchema);

const PostSchema = new Schema({
    poster: {type: Schema.Types.type, ref: 'User'},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    title: String,
    content: String
});
const Post = mongoose.model('Post', PostSchema);

const CommentSchema = new Schema({
    post: {type: Schema.Types.ObjectId, ref: 'Post'},
    commenter: {type: Schema.Types.ObjectId, ref: 'User'},
    content: String
});
const Comment = mongoose.model('Comment', CommentSchema);

User.find().populate({
    path: 'posts', 
    select: {title: 1}, 
    options: {
        sort: {title: -1}
    }
}).exec(function(err, docs) {
    console.log(docs[0].posts[0].title);
    // post-by-aikin
})