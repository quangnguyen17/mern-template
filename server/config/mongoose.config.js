const mongoose = require('mongoose');

module.exports = db_name => {
    mongoose.connect(`mongodb://localhost/${db_name}`, { useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true })
        .then(() => console.log(`Successfully connected to database.`))
        .catch(err => console.log(`Failed to connect to database ${err}`));
}