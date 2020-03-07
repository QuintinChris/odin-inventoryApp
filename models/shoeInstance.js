var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ShoeInstanceSchema = new Schema({
    name: {
        type: String,
        required: true,
        max: 100,
    },
    image: {
        type: Schema.Types.ObjectId,
        ref: 'Logo',
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    brand: {
        type: Schema.Types.ObjectId,
        required: false,
    }
});

// virtual
ShoeInstanceSchema.virtual('url').get(function () {
    return '/catalog/shoeinstance/' + this._id;
});

module.exports = mongoose.model('ShoeInstance', ShoeInstanceSchema);