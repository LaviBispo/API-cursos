import express from 'express'
import cursosRouter from "./routes/cursosRoutes"
import instrutoresRouter from "./routes/instrutoresRoutes"

const app = express()

app.use(express.json())
app.use("/api/cursos", cursosRouter)
app.use("/api/instrutores", instrutoresRouter)

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})