const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// Connect to MongoDB (replace with your actual connection string)
mongoose.connect('mongodb+srv://archie08b2000:!123Akansha@pms.xpwewbd.mongodb.net/?retryWrites=true&w=majority&appName=PMS')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Create schema
const CustSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensure unique usernames
   
  },
  password: {
    type: String,
    required: true,
    minlength: 5// Minimum password length (adjust as needed)
  }
});


// Hash password before saving (NEVER store passwords in plain text!)
// CustSchema.pre('save', async function (next) {
//   if (this.isModified('password')) {
//     const salt = await bcrypt.genSalt(10); // Generate a salt (adjust rounds as needed)
//     this.password = await bcrypt.hash(this.password, salt);
//   }
//   next(); // Proceed with saving
// });



// Create model
const customerModel = mongoose.model('customerDetails', CustSchema);

module.exports = { customerModel };


