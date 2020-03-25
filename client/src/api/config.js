let backendHost

const hostname = window && window.location && window.location.hostname;

if(hostname === "chaseyourdreams.com")                      //Imagine that. This will likely never happen lol
    backendHost = "https://api.chaseyourdreams.com/api"
else
    backendHost = "http://localhost:8000/api"

const API_HOST = backendHost

export default API_HOST