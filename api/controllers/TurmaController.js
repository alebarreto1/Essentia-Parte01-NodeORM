const database = require('../models/index.js')
//findAll()
class TurmaController {
    static async pegaTodasAsTurmas(req, res) {
        try {
            const todasAsTurmas = await database.Turmas.findAll()
            return res.status(200).json(todasAsTurmas)
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    //findOne: Search for a single instance. Returns the first instance found, or null if none can be found.
    static async pegaUmaTurma(req, res) {
        const { id } = req.params //indica q vou receber um parametro na req.
        try {
            const umaTurma = await database.Turmas.findOne({
                where: {
                    id: Number(id) //primeiro id da linha é a coluna id
                }
            })
            return res.status(200).json(umaTurma)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    //create(): Creates an object that has the specified prototype or that has null prototype.
    static async criaTurma(req, res) {
        const novaTurma = req.body
        try {
            const novaTurmaCriada = await database.Turmas.create(novaTurma)
            return res.status(200).json(novaTurmaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    //update(): Updated the record pointed at by the cursor with a new value. 
    //retona 0 ou 1. Fez ou não fez, por isso criar uma const turmaAtualizada
    static async atualizaTurma(req, res) {
        const { id } = req.params
        const novasInfos = req.body
        try {
            await database.Turmas.update(novasInfos, { where: { id: Number(id) } })
            const turmaAtualizada = await database.Turmas.findOne({
                where: {
                    id: Number(id) //primeiro id da linha é a coluna id
                }
            })
            return res.status(200).json(turmaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    //destroy()
    static async apagaTurma(req, res) {
        const { id } = req.params
        try {
            await database.Turmas.destroy({ where: { id: Number(id) } })
            return res.status(200).json({ mensagem: `O id ${id} foi deletado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    //restore()
    static async restauraTurma(req, res) {
        const { id } = req.params;
        try {
            await database.Turmas.restore({ where: { id: Number(id) } });
            return res.status(200).json({ mensagem: `id ${id} restaurado` })
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = TurmaController
