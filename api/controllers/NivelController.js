const database = require('../models/index.js')
//findAll()
class NivelController {
    static async pegaTodosOsNiveis(req, res) {
        try {
            const todosOsNiveis = await database.Niveis.findAll()
            return res.status(200).json(todosOsNiveis)
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    //findOne: Search for a single instance. Returns the first instance found, or null if none can be found.
    static async pegaUmNivel(req, res) {
        const { id } = req.params //indica q vou receber um parametro na req.
        try {
            const umNivel = await database.Niveis.findOne({
                where: {
                    id: Number(id) //primeiro id da linha é a coluna id
                }
            })
            return res.status(200).json(umNivel)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    //create(): Creates an object that has the specified prototype or that has null prototype.
    static async criaNivel(req, res) {
        const novoNivel = req.body
        try {
            const novoNivelCriado = await database.Niveis.create(novoNivel)
            return res.status(200).json(novoNivelCriado)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    //update(): Updated the record pointed at by the cursor with a new value. 
    //retona 0 ou 1. Fez ou não fez, por isso criar uma const nivelAtualizado
    static async atualizaNivel(req, res) {
        const { id } = req.params
        const novasInfos = req.body
        try {
            await database.Niveis.update(novasInfos, { where: { id: Number(id) } })
            //primeiro atualizou com o update
            //agora pedir para voltar o registro atualizado
            const nivelAtualizado = await database.Niveis.findOne({
                where: {
                    id: Number(id) //primeiro id da linha é a coluna id
                }
            })
            return res.status(200).json(nivelAtualizado)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    //destroy()
    static async apagaNivel(req, res) {
        const { id } = req.params
        try {
            await database.Niveis.destroy({ where: { id: Number(id) } })
            return res.status(200).json({ mensagem: `O id ${id} foi deletado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    //restore()
    static async restauraNivel(req, res) {
        const { id } = req.params;
        try {
            await database.Niveis.restore({ where: { id: Number(id) } });
            return res.status(200).json({ mensagem: `id ${id} restaurado` })
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = NivelController