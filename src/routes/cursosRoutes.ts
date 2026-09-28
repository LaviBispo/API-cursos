import { Router, Request, Response } from "express";
import prisma from "../prismaClient";

const router = Router()

router.post("/", async (req: Request, res: Response) => {
    const {title, description, instrutor, instrutorId } = req.body;

    if (!title || !instrutor || !instrutorId) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios para o cadastro" });
    }

    const cursos = await prisma.cursos.create({
        data: {
            title,
            description,
            instrutorId
        }
    })

    return res.status(201).json(cursos)

})

router.get("/", async (req: Request, res: Response) => {
    try{
        const cursos = await prisma.cursos.findMany()
        res.json(cursos)
    } catch (error) {
        res.status(500).json({error: "Erro interno no servidor"})
    }
})

router.get("/:id", async (req: Request, res: Response) => {
    try{
        const cursos = await prisma.cursos.findUnique({
            where: {id: Number(req.params.id)}
        })

        if(!cursos) {
            return res.status(404).json({error: " Curso não encontrado"})
        }

        res.json(cursos)
    } catch (error) {
        res.status(500).json({error: "Erro interno no servidor"})
    }
})

router.put("/:id", async (req: Request, res: Response) => {
    try{
        const {title, description, instrutorId} = req.body

        const cursos = await prisma.cursos.update({
            where: {id: Number(req.params.id)},
            data: {title, description, instrutorId}
        })

        res.json(cursos)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Erro interno no servidor"})
    }
})

router.delete("/:id", async (req: Request, res:Response) => {
    try {
        await prisma.cursos.delete({
            where: {id: Number(req.params.id)}
        })
        return res.status(204).send()
    } catch (error) {
         res.status(500).json({error: "Erro interno do servidor"})
    }
})

export default router