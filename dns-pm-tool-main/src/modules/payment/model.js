const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({
    title:  String,
    description: String
},{
    timestamps:true
});

export default mongoose.model('Project', projectSchema);
