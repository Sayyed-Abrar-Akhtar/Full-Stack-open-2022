const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) mongoose.set('strictQuery', false);

//console.log('connecting to', mongoURI);
mongoose
  .connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
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
  number: {
    type: String,
    validate: [
      {
        validator: function (v) {
          return v.length > 7;
        },
        message: (props) =>
          `Phone Number ${props.value} is shorter than the minimum allowed length (8) or more`,
      },
      {
        validator: function (v) {
          const [firstPart] = v.split('-');
          if (firstPart.length <= 3 && firstPart.length > 1) return true;
          return false;
        },
        message: 'First part must be of two or three numbers',
      },
      {
        validator: function (v) {
          const [firstPart, secondPart] = v.split('-');

          return Boolean(Number(firstPart) && Number(secondPart));
        },
        message: 'Phone numbers must be number',
      },
    ],
  },
});

phonebookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Phonebook', phonebookSchema);
