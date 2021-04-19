const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/onlinecourse";

//mongodb connection and database creation
MongoClient.connect(url,{useUnifiedTopology: true},function(err,db){
    if(err)
        throw err;
    // console.log("Database connected and created successfully");

    //use database
    let dbName = db.db("onlinecourse");

    //creating collections in database
    dbName.createCollection("course" , function( err , result ){
        if(err)
            throw err;
        console.log("Collection created sucessfully");
        db.close();
    });

    //Insert single record using insertOne
    dbName.collection( "course" ).insertOne({ name : "Node js" , price : 4400 } , function( err , result ){
        if(err)
            throw err;
        console.log("data inserted successfully");
        db.close();
    });

    //Inserting multiple data using insertMany
    let multiDataInsert = [
        { name : "MongoDB" , price : 5600 } ,
        { name : "HTML" , price : 3350 } ,
        { name : "CSS" , price : 3400 } ,
    ];
    dbName.collection( "course" ).insertMany( multiDataInsert , function( err , result ){
        if(err)
            throw err;
        console.log("Course data inserted successfully");
        db.close();
    });
    
    let multiDataInsert = [
        { name : "Ben" , age : 18} ,
        { name : "Tom" , age : 21 } ,
        { name : "Jerry" , age : 19 } ,
    ];
    dbName.collection( "students" ).insertMany( multiDataInsert , function( err , result ){
        if(err)
            throw err;
        console.log("Students data inserted successfully");
        db.close();
    });

    //find first element using findOne({})
    dbName.collection( "course" ).findOne( {} , function( err , result ){
        if(err)
            throw err;
        console.log(result);//all field
        console.log(result.name);//partcular field
        db.close();
    });

    //find all or select all element using find
    dbName.collection( "course" ).find({}).toArray( function( err , result ){
        if(err)
            throw err;
        console.log(result);
        db.close();
    });

    //find all or select all element  from particular field using projection
    // filedname  : 0 => it selects all the other field except name field
    // fieldname : 1 => it selects the specified field only all
    dbName.collection( "course" ).find({},{ projection : { name : 0 } }).toArray( function( err , result ){
        if(err)
            throw err;
        console.log(result);
        db.close();
    });

    dbName.collection( "course" ).find({},{ projection : { name : 1 } }).toArray( function( err , result ){
        if(err)
            throw err;
        console.log(result);
        db.close();
    });

    //we can avoid id field by asigning it as 0
    dbName.collection( "course" ).find({},{ projection : { _id : 0 , name : 0 } }).toArray( function( err , result ){
        if(err)
            throw err;
        console.log(result);
        db.close();
    });
    
    //To get particular data row under some condition
    dbName.collection( "course" ).find({price : 5600},{ projection : {_id : 0 } }).toArray( function( err , result ){
        if(err)
            throw err;
        console.log(result);
        db.close();
    });

    //select the sorted values with that matches starting letter 
    dbName.collection( "course" ).find({name : /^M/},{ projection : {_id : 0 } }).toArray( function( err , result ){
        if(err)
            throw err;
        console.log(result);
        db.close();
    });

    //Update single value using upateOne - it update first occurence value only 
    let currentValue = { price : 3600 };
    let newValue = { $set : { price : 3500 }};
    dbName.collection( "course" ).updateOne( currentValue , newValue , function( err , result ){
        if(err)
            throw err;
        console.log(result);
        db.close();
    });

    //find specific element using findOne({ fieldNAme : value })
    dbName.collection( "course" ).findOne( {price : 5600} , function( err , result ){
        if(err)
            throw err;
        console.log(result);
        db.close();
    });

    dbName.collection( "course" ).find({}).toArray( function( err , result ){
        if(err)
            throw err;
        console.log(result);
        db.close();
    });

    //Update multiple value using upateMany - it update all values under condition 
    let currentValue = { price : 3500 };
    let newValue = { $set : { price : 3600 }};
    dbName.collection( "course" ).updateMany( currentValue , newValue , function( err , result ){
        if(err)
            throw err;
        console.log(result);
        db.close();
    });

    dbName.collection( "course" ).find({price : 3600}).toArray( function( err , result ){
        if(err)
            throw err;
        console.log(result);
        db.close();
    });

    // Sorting 
    // 1  - Ascending to descending order
    // -1 - DEscening to ascending
    let sortOrder = {price : 1}; 
    dbName.collection( "course" ).find().sort(sortOrder).toArray( function( err , result ){
        if(err)
            throw err;
        console.log(result);
        db.close();
    });

    let sortOrder = {price : -1}; 
    dbName.collection( "course" ).find().sort(sortOrder).toArray( function( err , result ){
        if(err)
            throw err;
        console.log(result);
        db.close();
    });

    //Delete single value using deleteOne
    let deleteValue = { name : "5600" }
    dbName.collection( "course" ).deleteOne( deleteValue , function( err , result ){
        if(err)
            throw err;
        console.log(result);
        db.close();
    });

    dbName.collection( "course" ).find({}).toArray( function( err , result ){
        if(err)
            throw err;
        console.log(result);
        db.close();
    });

    //Delete multiple value using deleteMany
    let deleteValue = { price : 3600 }
    dbName.collection( "course" ).deleteMany( deleteValue , function( err , result ){
        if(err)
            throw err;
        console.log(result);
        db.close();
    });

    dbName.collection( "course" ).find({}).toArray( function( err , result ){
        if(err)
            throw err;
        console.log(result);
        db.close();
    });

    //Drop entire collection
    dbName.dropCollection( "students" , function( err , result ){
        if(err)
            throw err;
        console.log("Student collection dropped successfully");
        db.close();
    });

});
