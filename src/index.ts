import { createApp } from "./app";

async function init() {
    const app = await createApp();
    app.listen(8000, () => {
        console.log('Server is listening on port 8000');
    });
}

init();