import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URL);

async function transfer(fromAccountNumber, toAccountNumber, amount, remark) {
    const session = client.startSession();

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('bank_accounts');
        const accountsCollection = db.collection('accounts');

        session.startTransaction();
        console.log('Transaction is started');

        const fromAccount = await accountsCollection.findOne(
            { account_number: fromAccountNumber },
            { session }
        );
        const toAccount = await accountsCollection.findOne(
            { account_number: toAccountNumber },
            { session }
        );

        if (!fromAccount || !toAccount) {
            console.log('One or both accounts not found');
            await session.abortTransaction();
            return;
        }

        if (fromAccount.balance < amount) {
            console.log('Insufficient balance in the from account');
            await session.abortTransaction();
            return;
        }

        await accountsCollection.updateOne(
            { account_number: fromAccountNumber },
            {
                $set: { balance: fromAccount.balance - amount },
                $push: {
                    account_changes: {
                        change_number: fromAccount.account_changes.length + 1,
                        amount: -amount,
                        changed_date: new Date().toISOString(),
                        remark: `Transfer to account ${toAccountNumber}: ${remark}`
                    }
                }
            },
            { session }
        );

        await accountsCollection.updateOne(
            { account_number: toAccountNumber },
            {
                $set: { balance: toAccount.balance + amount },
                $push: {
                    account_changes: {
                        change_number: toAccount.account_changes.length + 1,
                        amount: amount,
                        changed_date: new Date().toISOString(),
                        remark: `Transfer from account ${fromAccountNumber}: ${remark}`
                    }
                }
            },
            { session }
        );

        console.log('Transfer successful');
        session.commitTransaction();
        console.log('Transaction is commited');
    } catch (error) {
        console.error('Error:', error);
        await session.abortTransaction();
        console.log('Transaction is aborted');
    } finally {
        await session.endSession();
        console.log('Transaction is ended');
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}

async function testTransfer() {
    await transfer(101, 102, 1000, 'Rent payment');
    console.log('testTransfer works');
}

testTransfer();
