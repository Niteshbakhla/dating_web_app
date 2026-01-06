import app from "./src/app.js";
import { ConnectDB } from "./src/config/db.js";
ConnectDB();


app.listen(5000, () => {
            console.log("Server is listening at port 5000")
})