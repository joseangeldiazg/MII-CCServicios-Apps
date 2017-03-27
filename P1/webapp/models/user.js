module.exports = function(mongoose) {

  var Schema = mongoose.Schema;

  // Objeto modelo de Mongoose
  var UserSchema = new Schema({

    // Propiedad nombre
    name : String,
  });


  return mongoose.model('user', UserSchema);
}
