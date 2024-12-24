const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listings.js");
const path = require('path');

if(process.env.NODE_ENV != "production"){
    require("dotenv").config({ path: path.resolve(__dirname, '../.env') });
};

const MONGO_URL = process.env.MONGO_URL;

main()
.then(() => {
    console.log("Connected to DB");
})
.catch(e => {
    console.log("Error : ", e);
    process.exit(1);
});

async function main(){
    try{
        await mongoose.connect(MONGO_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
    catch(e){
        console.log("Error : ",e);
    }
}

const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner : "654726bcf0adfb9e3bdac0e0" }));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
}

initDB();

//2nd Option

// const mongoose = require("mongoose");
// const initData = require("./data.js");
// const Listing = require("../models/listings.js");
// const path = require('path');

// if (process.env.NODE_ENV !== "production") {
//     require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
// }

// const MONGO_URL = process.env.MONGO_URL;

// // Define the main function first
// async function main() {
//     try {
//         await mongoose.connect(MONGO_URL, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log("Connected to DB");
//     } catch (e) {
//         console.log("Error connecting to MongoDB:", e);
//         process.exit(1);
//     }
// }

// // Now call the main function
// main()
//     .then(() => {
//         // Once connected, initialize the database
//         initDB();
//     })
//     .catch((e) => {
//         console.log("Error: ", e);
//     });

// async function initDB() {
//     try {
//         await Listing.deleteMany({});
//         initData.data = initData.data.map((obj) => ({ ...obj, owner: "654726bcf0adfb9e3bdac0e0" }));
//         await Listing.insertMany(initData.data);
//         console.log("Data was initialized");
//     } catch (error) {
//         console.error("Error initializing data:", error);
//     } finally {
//         // Make sure to close the MongoDB connection when initialization is complete
//         mongoose.connection.close();
//     }
// }


//                      ----------------------------------------------------------------------------

// const initDB = async ()=>{
//     await Listing.deleteMany({});
//     initData.data = initData.data.map((obj) => ({...obj, owner : "654726bcf0adfb9e3bdac0e0" }));
//     await Listing.insertMany(initData.data);
//     console.log("Data was initialized");
// }

//                      ----------------------------------------------------------------------------

// const isPrime = (num) => {
//     if (num < 2) return false;
//     for (let i = 2; i <= Math.sqrt(num); i++) {
//         if (num % i === 0) return false;
//     }
//     return true;
// };

// const initDB = async () => {
//     await Listing.deleteMany({});

//     const owners = {
//         prime: "676a53f252c57a424f265f7c",
//         even: "676a53cb52c57a424f265f75",
//         odd: "676a52eb52c57a424f265f65",
//     };

//     initData.data = initData.data.map((obj, index) => {
//         let owner;
//         if (isPrime(index)) {
//             owner = owners.prime;
//         } else if (index % 2 === 0) {
//             owner = owners.even;
//         } else {
//             owner = owners.odd;
//         }
//         return { ...obj, owner };
//     });

//     await Listing.insertMany(initData.data);
//     console.log("Data was initialized with multiple owners");
// };

// initDB();
