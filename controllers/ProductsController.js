import Product from "../models/Product.js";

const productCategories = Product.schema.path("category").enumValues;

export const index = async (req, res, next) => {
    try {
        const products = await Product.find();

        res.format({
            "text/html": () => {
                res.render("products/index", { products, title: "Products List" })
            },
            "application/json": () => {
                res.json({ status:200, message: "SUCCESS", products });
            },
            default: () => {
                res.status(406).send("NOT ACCEPTABLE");
            }
        });
    } catch(error) {
        next(error);
    }
};

export const show = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
    
        if (!product) {
            req.status = 404;
            throw new Error("Product does not exist")
        }
    
        res.format({
            "text/html": () => {
                res.render("products/show",{ product, title: "Product View" });
            },
            "application/json": () => {
                res.json({ product });
            },
            default: () => {
                res.status(406).send("NOT ACCEPTABLE");
            }
        });
    } catch(error) {
        next(error);
    }
};

export const add = async (req, res, next) => {
    try {
        res.render("products/add", {
            productCategories,
            formType: "create",
            title: "New Product",
            activeMenu: "products"
        });
    } catch(error) {
        next(error);
    }
};


export const edit = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            req.status = 404;
            throw new Error("Product does not exist")
        }

        res.render("products/edit", {
            product,
            productCategories,
            formType: "update",
            title: "Edit Product",
            activeMenu: "products"
        });
    } catch(error) {
        next(error);
    }
};

export const create = async (req, res, next) => {
    try {
        const { name, description, price, stock_quantity, category } = req.body;

        const newProduct = new Product({ name, description, price, stock_quantity, category });

        await newProduct.save();

        res.redirect("/products");
    } catch(error) {
        next(error);
    }
};

export const update = async (req, res, next) => {
    try {
        const { name, description, price, stock_quantity, category } = req.body;
    
        const product = await Product.findById(req.params.id);
    
        if (!product) {
            req.status = 404;
            throw new Error("Product does not exist");
        }
    
        product.name = name;
        product.description = description;
        product.price = price;
        product.stock_quantity = stock_quantity;
        product.category = category;
    
        await product.save();
    
        res.redirect("/products");
    } catch(error) {
        next(error);
    }
};

export const remove = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            req.status = 404;
            throw new Error("Product does not exist");
        }

        await Product.findByIdAndDelete(req.params.id);

        res.redirect("/products");
    } catch(error) {
        next(error);
    }
};