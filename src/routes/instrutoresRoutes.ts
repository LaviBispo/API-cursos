import { Router, Request, Response } from "express";
import prisma from "../prismaClient";

const router = Router()

router.post("/", async (req: Request, res: Response) => {
    const {name, email} = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios para o cadastro" });
    }

    const instrutor = await prisma.instrutor.create({
        data: {
            name,
            email,
            
        }
    })

    return res.status(201).json(instrutor)

})

router.get("/", async (req: Request, res: Response) => {
    try{
        const instrutores = await prisma.instrutor.findMany()
        res.json(instrutores)
    } catch (error) {
        res.status(500).json({error: "Erro interno no servidor"})
    }
})

router.get("/:id", async (req: Request, res: Response) => {
    try{
        const instrutores = await prisma.instrutor.findUnique({
            where: {id: Number(req.params.id)}
        })

        if(!instrutores) {
            return res.status(404).json({error: " Instrutor não encontrado"})
        }

        res.json(instrutores)
    } catch (error) {
        res.status(500).json({error: "Erro interno no servidor"})
    }
})

router.put("/:id", async (req: Request, res: Response) => {
    try{
        const {name, email} = req.body

        const instrutores = await prisma.instrutor.update({
            where: {id: Number(req.params.id)},
            data: {name, email,}
        })

        res.json(instrutores)
    } catch (error) {
        res.status(500).json({error: "Erro interno no servidor"})
    }
})

router.delete("/:id", async (req: Request, res:Response) => {
    try {
        await prisma.instrutor.delete({
            where: {id: Number(req.params.id)}
        })
        return res.status(204).send()
    } catch (error) {
         res.status(500).json({error: "Erro interno do servidor"})
    }
})




export default router