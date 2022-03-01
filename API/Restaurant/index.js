import express from "express";

import { RestaurantModel } from "../../database/allModels";

const Router = express.Router();

/*
Route       /
Des         Get all the restaurant details
params      None
Access      Public
Method      GET
*/

Router.get("/", async(req,res)=> {
    try {
        const {city} = req.query;
        const restaurants = await RestaurantModel.find({city});
        return res.json({restaurants});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

/*
Route       /
Des         Get a particular restaurant details based on id
params      _id
Access      Public
Method      GET
*/

Router.get("/:_id", async(req,res)=> {
    try {
        const {_id} = req.query;
        const restaurant = await RestaurantModel.find({_id});
        return res.json({restaurant});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

/*
Route       /search
Des         Get a particular restaurant details based on id
params      searchString
Access      Public
Method      GET
*/

Router.get("/search", async(req,res)=> {
    try {
        const {searchString} = req.body;
        const restaurants = await RestaurantModel.find({
            name: {$regex: searchString, $options: "i"}
        });
        return res.json({restaurants});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

export default Router;