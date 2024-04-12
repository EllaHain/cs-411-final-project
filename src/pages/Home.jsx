import Footer from "../components/Footer"
import Login from "../components/Login"

export function Home() {
    
    return (
        <>
      <div style={{display: "flex",
        justifyContent: "center",
        alignItems: "center"}}>
          <h1> Spotify/Weather Application</h1>
          </div>
          <div style={{display: "flex",
        justifyContent: "center",
        alignItems: "center"}}>
          <h2>Login</h2>
          </div>
          <Login />
      
      </>
    );
  }