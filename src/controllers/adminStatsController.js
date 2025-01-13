// const { ObjectId } = require('mongodb');
const {getDatabase} = require('../config/dbConnection');
const usersCollection = getDatabase().collection('users');
// const cartsCollection = getDatabase().collection('carts');
const menuCollection = getDatabase().collection('menu');
const paymentCollection = getDatabase().collection('payment');

const adminStats = async (req, res) => {
    try {
        const userCount = await usersCollection.estimatedDocumentCount();
        const menuCount = await menuCollection.estimatedDocumentCount();
        const ordersCount = await paymentCollection.estimatedDocumentCount();
        const result = await paymentCollection.aggregate([
            {
                $group:{
                    _id: null,
                    totalRevenue: {
                        $sum: '$price'
                    }
                }
            }
        ]).toArray();
        const revenue = result.length > 0 ? result[0].totalRevenue : 0;

        
        // const result2 = await paymentCollection.aggregate([
        //     {
        //         $group: {
        //             _id: null,
        //             menuItems: {
        //                 $push: '$menuItems'
        //             }
        //         }
        //     }
        // ]).toArray();
        // const menuItems = result2.length > 0 ? result2[0].menuItems : [];
        // const menu = await menuCollection.find().toArray();

        res.json({
            userCount,
            menuCount,
            ordersCount,
            revenue,
            
            
        });
    } catch (error) {
        res.status(500).json({message: 'Error fetching admin stats', error});
    }
}

module.exports = {adminStats};