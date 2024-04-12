import base64
from Flask import Flask, request, redirect
from pymongo import MongoClient
import requests

app = Flask(__name__)

# MongoDB setup
client = MongoClient('mongodb://localhost:27017/')
db = client['your_database']
users_collection = db['users']

# Spotify API credentials
SPOTIFY_CLIENT_ID = 'a92ce09ecca44a398b703c4ab2027a2f'
SPOTIFY_CLIENT_SECRET = '9ad599d41f414890a05add0285a91e13'
SPOTIFY_REDIRECT_URI = 'http://localhost:5000/spotify-redirect'

@app.route('/spotify-login')
def spotify_login():
    # Redirect the user to Spotify authorization page
    scope = 'user-read-private user-read-email'  # Add required scopes
    auth_url = f'https://accounts.spotify.com/authorize?client_id={SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri={SPOTIFY_REDIRECT_URI}&scope={scope}'
    return redirect(auth_url)

@app.route('/spotify-callback')
def spotify_callback():
    # Handle callback from Spotify
    code = request.args.get('code')
    if code:
        # Exchange code for access token
        access_token = exchange_code_for_token(code)
        # Store access token in MongoDB for the user
        user_id = request.args.get('state')  # Assuming user_id is passed as state parameter
        users_collection.update_one({'_id': user_id}, {'$set': {'spotify_access_token': access_token, 'spotify_connected': True}})
    return redirect('/')  # Redirect the user back to the frontend

def exchange_code_for_token(code):
    # Exchange authorization code for access token
    headers = {'Authorization': 'Basic ' + base64.b64encode(f"{SPOTIFY_CLIENT_ID}:{SPOTIFY_CLIENT_SECRET}".encode()).decode()}
    data = {
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': SPOTIFY_REDIRECT_URI
    }
    response = requests.post('https://accounts.spotify.com/api/token', data=data, headers=headers)
    if response.status_code == 200:
        return response.json()['access_token']
    else:
        return None

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)