import ProductModel from '../models/Product.js';

export const getAll = async (req, res) => {
    try {
        const products = await ProductModel.find().populate('user').exec();

        res.json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to get products'
        })
    }
};

export const getOne = async (req, res) => {
    try {
        const productId = req.params.id;

        const product = await ProductModel.findOne({ _id: productId });

        if (!product) {
            return res.status(404).json({
                message: "Product is not defined"
            })
        }

        res.json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to get product'
        })
    }
}

export const create = async (req, res) => {

    try {
        const product = await ProductModel.create({
            title: req.body.title,
            price: req.body.price,
            imageUrl: req.body.imageUrl,
            user: req.userId
        });

        res.json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to create a product"
        })
    }
};

export const remove = async (req, res) => {
    try {
        const productId = req.params.id;

        ProductModel.findByIdAndDelete({
            _id: productId,
        }, (err, doc) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Failed to delete product'
                })
            }

            if (!doc) {
                return res.status(404).json({
                    message: 'Product is not defined'
                })
            }

            res.json({ success: true })
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to get product'
        })
    }
};

export const update = async (req, res) => {
    try {
        const productId = req.params.id;

        await ProductModel.updateOne({
            _id: productId
        }, {
            title: req.body.title,
            price: req.body.price,
            imageUrl: req.body.imageUrl,
            user: req.userId
        });

        res.json({ success: true });
    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: 'Failed to update product'
        })
    }
};
