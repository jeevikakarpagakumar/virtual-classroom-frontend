export const authenticateWithGoogle = async () => {
    const CLIENT_ID = "757017806701-739meoss57t41mb72ov8jvj4629bi0f8.apps.googleusercontent.com"; // Replace with your Client ID
    const REDIRECT_URI = "http://localhost:3000/auth/callback"; // Update if using prod
    const SCOPES = encodeURIComponent("https://www.googleapis.com/auth/calendar.events");
  
    const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=${SCOPES}&include_granted_scopes=true`;
  
    window.location.href = authUrl; // Redirect to Google OAuth login
  };
  