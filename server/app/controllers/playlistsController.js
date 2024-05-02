const admin = require('firebase-admin');
const serviceAccount = require('../../../cs411-final-project-67a43-firebase-adminsdk-cxyyc-9eedd6cb2d.json'); // Update the path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://cs411-final-project-67a43.firebaseio.com'
});
async function createPlaylist(req, res, next) {
  try {
    // Extract playlist data from request body
    const { title, owner, description } = req.body;
    // Initialize Firestore
    const firestore = admin.firestore();

    // Add playlist data to Firestore
    const playlistRef = await firestore.collection('playlists').add({
      title,
      owner,
      description
    });

    // Send success response
    res.status(201).json({ message: 'Playlist created successfully', id: playlistRef.id });
  } catch (error) {
    console.error('Error creating playlist:', error);
    next(error);
  }
}

module.exports = {
  createPlaylist
};