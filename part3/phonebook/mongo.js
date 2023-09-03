const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Password is not provided 😌');
  process.exit(1);
}

const password = process.argv[2];

const mongoURI = `mongodb+srv://sayyedabrarakhtarr:${password}@cluster0.ibw45kc.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(mongoURI);

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Phonebook = mongoose.model('Phonebook', phonebookSchema);

if (process.argv.length === 3) {
  Phonebook.find({}).then((result) => {
    console.log('✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨');
    console.log('📖 Phonebook:');
    result.forEach((record) => {
      console.log(`🚻 ${record.name}: 📞 ${record.number}`);
    });
    console.log('✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨');
    mongoose.connection.close();
  });
} else {
  const phonebook = new Phonebook({
    name: process.argv[3],
    number: process.argv[4],
  });

  phonebook.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close();
  });
}
