const bcrypt = require('bcrypt');
const firebaseAdmin = require('firebase-admin');
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_KEY;

async function signUp(req, res, next) {
  try {
    // Extract user data from request body
    const { username, email, password } = req.body;
    const userRecord = await admin.auth().getUserByEmail(email);

    if(userRecord){
      return res.status(409).json({ message: 'User already exists' });
    } else {

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Initialize Firestore
    const firestore = firebaseAdmin.firestore();

    // Add user data to Firestore
    const userRef = firestore.collection('users').doc(email); // Use email as document ID
    await userRef.set({
      username,
      email,
      hashedPassword
      // Add other user data as needed
    });


    // Send success response
    res.status(201).json({ message: 'User created successfully' });
  }
  } catch (error) {
    console.error("Error adding user to Firestore:", error);
    next(error);
  }

}

async function logIn(req, res, next) {
  try {
    // Extract user data from request body
    const { username, email, password } = req.body;

    // Check if the user exists in Firebase Authentication
    const userRecord = await admin.auth().getUserByEmail(email);

    if (!userRecord) {
      // If user doesn't exist, return an error response
      return res.status(404).json({ error: 'User not found' });
    }

    // If user exists, generate JWT token
    const token = jwt.sign({
      username: userRecord.username,
      email: userRecord.email
    }, secretKey, { expiresIn: '3h' }); // Change the expiration time as needed

    // Send back the token
    res.json({ token });
  } catch (error) {
    // Handle error
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'An error occurred while logging in' });
  }
}

module.exports = {
  signUp,
  logIn
};
