require('dotenv').config();
let mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Define the Person schema.
let personSchema =  new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    default: 18
  },
  favoriteFoods: [String]
});

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {

  let person = new Person({
    name: "Freecode Camp",
    age: 20,
    favoriteFoods: ["Rice", "Beans"]
  });

  person.save(function(err, data){
    if(err) {
      return done(err);
    }
    
    done(null, data);

  });
  
};

const createManyPeople = (arrayOfPeople, done) => {
  
  Person.create(arrayOfPeople, function(err, data){
    if (err) return done(err);
    console.log("we loaded", data);
    done(null, data);
  });
  
};

const findPeopleByName = (personName, done) => {

  Person.find({ name: personName}, function(err, data){

    if (err) return done(err);

    done(null, data);
  });
  
};

const findOneByFood = (food, done) => {

  Person.findOne({favoriteFoods: [food]}, function(err, data){
    if (err) return done(err);
    
    done(null, data);
  });
  
};

const findPersonById = (personId, done) => {
  
  Person.findById({_id: personId}, function(err, data){
    if (err) return done(err);

    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById({_id: personId}, function(err, person){
    
    if(err) return done(err);
    
    // Update favoriteFoods.
    person.favoriteFoods.push(foodToAdd);
    person.save(function(err, updatedPerson){
      if (err) return done(err);

      done(null, updatedPerson);
    });
  });

};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
