const { Artist } = require('../models/artists');
//const {pool} = require('../database/database');

const getArtists = async (req, res) => {
    try {
        const response = await Artist.findAll();
        res.status(200).json(response);
    } catch (err) {
        res.status(405).end();
    } 
};

const getArtistById = async (req, res) => {
    const { id } = req.params;
    try {
        const response =  await Artist.findOne({ where: {
            id: id
        }})
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(405).end();
    }
}


const createArtist = async (req, res) => {
    const { name, age } = req.body;
    try {
        if (typeof(name) == 'string' && typeof(age) == 'number' && name != null && age != null) {
            let name_token = Buffer.from(name).toString('base64');
            if (name_token.length > 22) {
                name_token = name_token.substr(0,22);
            } 
            const artist = await Artist.findOne({
                where: {
                    id: name_token
                }
            });
            if (artist) {
                res.status(409).json(artist);
            } else {
                const albums = 'https://t2-ti-rest-api.herokuapp.com/artists/'+name_token+'/albums';
                const tracks = 'https://t2-ti-rest-api.herokuapp.com/artists/'+name_token+'/tracks';
                const self = 'https://t2-ti-rest-api.herokuapp.com/artists/'+name_token;
                const response = await Artist.create({
                    id: name_token,
                    name: name,
                    age: age,
                    albums: albums,
                    tracks: tracks,
                    self: self
                }, { fields: ['id', 'name', 'age', 'albums', 'tracks', 'self'] });
                res.status(201).json(response);
            }
        } else {
            res.status(400).end()
        }
    } catch(err) {
        console.log(err);
        res.status(400).end();
    }
};

const deleteArtists = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await Artist.destroy({
            where: {
                id: id
            }
        });
        if (response == 0) {
            res.status(404).end();
        } else {
            res.status(204).end();
        }
    } catch (err) {
        res.status(405).end();
    }
}

module.exports = {
    getArtists, 
    createArtist,
    getArtistById,
    deleteArtists
}