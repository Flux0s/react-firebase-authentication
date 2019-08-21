// Import Server and env
let app = require("express")();
let env = require("dotenv").config();
// Import Middleware stack
let middleware = require("./middleware");

middleware.initalize(app);



// // ------- API Endpoints ------- //
// app.post("/sign-in", cors(), (req, res, next) => {
//     Firebase.doSignInWithEmailAndPassword(req, res, next);
// });
// app.get("/getListOfDevices", (req, res, next) => {
//     api.getDevices(req, res, next);
// });
// app.get("/getEmptyDeviceObject", (req, res, next) => {
//     api.getEmptyDevice(req, res, next);
// });
// app.get("/getListOfDeviceTypes", (req, res, next) => {
//     api.getDeviceTypes(req, res, next);
// });
// app.put("/addNewDevice", (req, res, next) => {
//     api.addDevice(req, res, next);
// });

// ------- Environment Specific Routes ------- //
// if (process.env.NODE_ENV === "development") {
//     console.log(
//         "Server is running in development env. Sign-up endpoint has been opened!"
//     );
//     app.post("/sign-up", (req, res, next) => {
//         // console.log("Attempted to sign up with email and password!");
//         Firebase.doSignUpWithEmailAndPassword(req, res, next);
//     });
// } else if (process.env.NODE_ENV !== "development") {
//     console.log(
//         "Server is running in non-development env. Some API endpoints will be unavailable!"
//     );
//     // Serve the static files from the React app
//     app.use(express.static(path.join(__dirname, "/../build")));

//     // Handles any requests that are not specifically defined
//     app.get("*", (req, res) => {
//         res.sendFile(path.join(__dirname + "/../build/index.html"));
//     });
// }

const port = process.env.NODE_ENV === "production" ? 80 : process.env.PORT;
app.listen(port, function() {
    console.log("Server listening on port " + port);
});
