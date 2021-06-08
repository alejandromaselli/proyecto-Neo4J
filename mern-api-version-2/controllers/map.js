const { findOneAndUpdate } = require('../models/map');
const MapModel = require('../models/map');

exports.connectToMap = (req, res) => {

    const { name, location } = req.body;

    console.log(location);

    MapModel.findOne({ name: name }, (err, user) => {
        console.log('ERR', err);
        console.log('USER', user);
        if (err)
            res.status(404).json({ error: err })
        else if (user) {
            MapModel.findOneAndUpdate({ _id: user._id }, { location: location }, (err, user) => console.log('ERROR on update', err))
        } else {
            console.log('No hay usuario');
            const mapStream = new MapModel({
                name: name,
                location: location
            })

            mapStream.save((err, data) => {
                if (err) {
                    console.log('ERROR SAVING MAP', err)
                }
            })

        }
        res.json({ message: 'sucess' })

        console.log(req.body);

    })
};

exports.readMapStream = (req, res) => {

    MapModel.find({}, { _id: 0, __v: 0 }).exec((err, users) => {
        let newUsers = users.map(item => {
            console.log(item);
            let newItem = { name: '', location: {lat:0,lng:0} };
            newItem.name = item.name;
            newItem.location.lat = item.location.lat;
            newItem.location.lng = item.location.lng;
            return newItem
        });

        res.json(newUsers)
    }
    )
}