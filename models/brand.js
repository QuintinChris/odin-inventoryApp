var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BrandSchema = new Schema({
    name: {
        type: String,
        required: true,
        max: 100,
    },
    logo: {
        type: Schema.Types.ObjectId,
        ref: 'Logo',
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    shoes: [{
        type: Schema.Types.ObjectId,
        required: false,
    }]
});

// virtual
BrandSchema.virtual('url').get(function () {
    return '/catalog/brand/' + this._id;
});

module.exports = mongoose.model('Brand', BrandSchema);