const express = require("express");
const User = require("../models/massusers")
const fs = require('fs');
const router = express.Router();
const objectsize = require('object-sizeof');
const radash = require('radash');
const jsonlParser = require('stream-json/jsonl/Parser');
const parser = new jsonlParser();
let count = 0;
async function asyncMass(req, res){
   
    count ++;
    console.log(count)
    const path_200kUsers = 'C:\\projects\\Orchastrator-NodeJS\\mass2ml.json';
    let started = Date.now()
    objectCounter = 0;
    objToInsert = [];

    try {
        console.time('Reading Data')
    const pipeline = fs.createReadStream(path_200kUsers).pipe(parser);
        console.timeEnd('Reading Data')
    pipeline.on('data', async data => {
        objectCounter++;
        console.log(objectCounter);
        objToInsert.push(data.value);
        console.log(objToInsert);

        if (objectCounter % 100_000 === 0){
            pipeline.pause();
            console.time('Persisting Data')
            const result = await User.insertMany(objToInsert);
            //console.log(result);
            console.timeEnd('Persisting Data')
            await radash.sleep(100);
            pipeline.resume();
        }


    })

    pipeline.on('end', async () => {
        console.log('Operation took - ', (Date.now() - started) * 0.001, ' seconds\n');
        process.exit()
    });
    } catch (err) {
        console.log(err)
    }

}
asyncMass();