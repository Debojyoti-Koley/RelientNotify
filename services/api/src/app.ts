import express from "express";
const app = express();
app.use(express.json());

app.get('/', (req: any, res: any) => {
    res.send("ReliantNotify API Running 🚀");
});

app.get("/health", (req: any, res: any) => {
    res.json({ status: "ok" });
})

export default app;