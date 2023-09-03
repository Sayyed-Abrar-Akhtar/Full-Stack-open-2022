const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) mongoose.set('strictQuery', false);

//console.log('connecting to', mongoURI);
mongoose
  .connect(mongoURI)
  .then((result) => console.log('Connected to MongoDB'))
  .catch((error) => console.log('error connecting to MongoDB:', error.message));

const phonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    validate: {
      validator: function (v) {
        return v.length > 2;
      },
      message: (props) =>
        `Name ${props.value} is shorter than the minimum allowed length (3)`,
    },
  },
  number: String,
});

phonebookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Phonebook', phonebookSchema);
