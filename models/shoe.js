var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ShoeSchema = new Schema({
    name: {
        type: String,
        required: true,
        max: 100,
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    image: {
        type: Schema.Types.ObjectId,
        ref: 'Image',
        required: true
    },
    price: {
        type: Number,
        required: false,
    },
    inStock: {
        type: Number,
        required: false,
    },
    sizes: [{
        type: Number,
        required: false,
    }]
});

// virtual
ShoeSchema.virtual('url').get(function () {
    return '/catalog/shoe/' + this._id;
});

module.exports = mongoose.model('Shoe', ShoeSchema);