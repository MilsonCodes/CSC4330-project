let backendHost

const hostname = window && window.location && window.location.hostname;

if(hostname === "chaseyourdreams.noahtemplet.dev")                      //Imagine that. This will likely never happen lol
    backendHost = "https://api.chaseyourdreams.noahtemplet.dev/api"
else
    backendHost = "http://ec2-3-22-110-115.us-east-2.compute.amazonaws.com/api"

const API_HOST = backendHost

export default API_HOST