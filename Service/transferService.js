// const { error } = require('express-openapi-validator');
const { ObjectId } = require ('mongodb');

const getAllTransfers = async (req, res) => {
    try {
        const transfers = await req.db.collection('transfers').find().toArray()

        res.status(200).json({
            message: 'Transfer Success',
            data: transfers
        })
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}

const createTransfers = async (req, res) => {
    const { amount, currency, sourceAccount, destinationAccount } = req.body
    
    try{
        const newTransfer = await req.db.collection('transfers').insertOne({ 
            amount, 
            currency, 
            sourceAccount, 
            destinationAccount, 
            status:'pending'})

        res.status(200).json({
            message: 'transfer successful',
            data: newTransfer
        })
    } catch (error) {
            res.status(401).json({ error: error.message })
        }
    }

const updateTransfers = async (req, res) => {
    const id = req.params.id
    const { status } = req.body

    const newStatus = await req.db.collection('transfers').updateOne({ _id: new ObjectId(id) }, { $set:{status:status} })
    
    res.status(200).json({
        message: 'updated',
        data: newStatus
    })
}
// const transferApproval = async (req, res) => {
//     const id = req.params.id
//     const { status } = req.body
//     console.log(req.query, `<=================== STATUS ==================`);
//     const statusUpdate = await db.collection('transfers').updateOne({ _id: new ObjectId(id) }, { $set: { status:status } })
//     res.status(200).json({
//       message: 'success',
//       data: statusUpdate
//     })
//   }

    module.exports = {
        getAllTransfers,
        createTransfers,
        updateTransfers
    }