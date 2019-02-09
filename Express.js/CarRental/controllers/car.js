const Car = require('../models/Car');
const Rent = require('../models/Rent');

module.exports = {
    addGet: (req, res) => {
        res.render('car/add');
    },
    addPost: (req, res) => {
        const reqCar = req.body;

        if (!reqCar.model || !reqCar.image || !reqCar.pricePerDay) {
            reqCar.error = 'Please fill all fields !'
            res.render('car/add', reqCar);
            return;
        }
        
        Car.create({
            model: reqCar.model,
            image: reqCar.image,
            pricePerDay: reqCar.pricePerDay
        }).then(car => {
            res.redirect('/car/all')
        }).catch(err => {
            reqUser.error = err;
            res.render('user/register', reqUser);
        });
    },
    editGet: (req, res) => {
        let carId = req.params.id;
        Car.findById(carId)
            .then(car => {
                res.render('car/edit', car);
            })
            .catch(err => {
                console.log(err);
            })
        
    },
    editPost: (req, res) => {
        const reqCar = req.body;
        let carId = req.params.id;

        if (!reqCar.model || !reqCar.image || !reqCar.pricePerDay) {
            reqCar.error = 'Please fill all fields !'
            res.render('car/edit', reqCar);
            return;
        }

        Car.findById(carId)
            .then(car => {
                car.model = reqCar.model;
                car.pricePerDay = reqCar.pricePerDay;
                car.image = reqCar.image;

                return car.save();
            })
            .then(() => {
                res.redirect('/car/all')
            })
            .catch(err => {
                reqCar.error = 'Something went wrong !'
                res.render('car/edit', reqCar);
            })
    },
    allGet: (req, res) => {
        Car.find()
            .where('isRented').equals(false)
            .then(cars => {
                res.render('car/all', { cars });
            }).catch(err => {
                conosle.log(err);
            })
    },
    rentGet: (req, res) => {
        const id = req.params.id;

        Car.findById(id)
            .then(car => {
                res.render('car/rent', car);
            })
            .catch(err => {
                console.log(err);
            });
    },

    rentPost: (req, res) => {
        const id = req.params.id;

        Car.findById(id)
            .then(car => {
                car.isRented = true;
                return car.save()
            })
            .then(() => {
                let rent = {
                    days: Number(req.body.days),
                    car: id,
                    owner: req.user._id
                }
                return Rent.create(rent);
            })
            .then(() => {
                res.redirect('/car/all');
            })
            .catch(err => {
                console.log(err);
            });
    },

    search: (req, res) => {
        let query = req.query;
        Car.find()
            .where('isRented').equals(false)
            .where('model').regex(new RegExp(`.*${query.model}.*`,'i'))
            .then(cars => {
                res.render('car/all', { cars });
            }).catch(err => {
                conosle.log(err);
            })
    }
}