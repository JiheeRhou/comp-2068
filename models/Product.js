import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "You must provide a name"],
        maxlength: [300, "Your first name cannot exceed 300 characters."]
    },
    description: {
        type: String,
        required: [false],
        maxlength: [1000, "Your last name cannot exceed 1000 characters."]
    },
    price: {
        type: Number,
        required: [true, "You must provide a price."],
        match: [/^\d{1,3}(,\d{3})*(\.\d{1,2})?$/, "Please enter a valid price"],
        validate: {
            validator: function(value) {
                // Check if the value is a number and greater than 0
                return typeof value === 'number' && value > 0;
            },
            message: "Please enter a valid numeric price greater than 0."
        }
    },
    stock_quantity: {
        type: Number,
        required: [true, "You must provide a stock quantity."],
        validate: {
            validator: function(value) {
                // Check if the value is a number and greater than 0
                return typeof value === 'number' && value > 0;
            },
            message: "Please enter a valid numeric price greater than 0."
        }
    },
    category: {
        type: String,
        enum: ["PRODUCE", "DAIRY", "BAKERY", "MEAT", "SNACKS", "BEVERAGES", "HOUSEHOLD"],
        required: [true, "You must choose a category."]
    },
}, { timestamps: true });

export default mongoose.model("Product", ProductSchema);