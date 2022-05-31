const database = require('../models/index.js')
//findAll()
class PessoaController {
    static async pegaTodasAsPessoas(req, res) {
        try {
            const todasAsPessoas = await database.Pessoas.findAll()
            return res.status(200).json(todasAsPessoas)
        } catch (error) {
            return res.status(500).json(error.message)
        }

    }
    //findOne: Search for a single instance. Returns the first instance found, or null if none can be found.
    static async pegaUmaPessoa(req, res) {
        const { id } = req.params //indica q vou receber um parametro na req.
        try {
            const umaPessoa = await database.Pessoas.findOne({
                where: {
                    id: Number(id) //primeiro id da linha é a coluna id
                }
            })
            return res.status(200).json(umaPessoa)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    //create(): Creates an object that has the specified prototype or that has null prototype.
    static async criaPessoa(req, res) {
        const novaPessoa = req.body
        try {
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa)
            return res.status(200).json(novaPessoaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    //update(): Updated the record pointed at by the cursor with a new value. 
    //retona 0 ou 1. Fez ou não fez, por isso criar uma const pessoaAtualizada
    static async atualizaPessoa(req, res) {
        const { id } = req.params
        const novasInfos = req.body
        try {
            await database.Pessoas.update(novasInfos, { where: { id: Number(id) } })
            //primeiro atualizou com o update
            //agora pedir para voltar o registro atualizado
            const pessoaAtualizada = await database.Pessoas.findOne({
                where: {
                    id: Number(id) //primeiro id da linha é a coluna id
                }
            })
            return res.status(200).json(pessoaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    //destroy()
    static async apagaPessoa(req, res) {
        const { id } = req.params
        try {
            await database.Pessoas.destroy({ where: { id: Number(id) } })
            return res.status(200).json({ mensagem: `O id ${id} foi deletado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    //MATRICULAS 
    //http://localhost:3000/pessoas/:estudanteId/matricula/:matriculaId
    static async pegaUmaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params //sequelize vai nos params da requisição e encontrar esses dois params e vai guardar na const
        try {
            const umaMatricula = await database.Matriculas.findOne({
                where: {
                    id: Number(matriculaId), //primeiro id da linha é a coluna id da table Matriculas
                    estudante_id: Number(estudanteId)
                }
            })
            return res.status(200).json(umaMatricula)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    //CRIAR MATRICULA
    static async criaMatricula(req, res) {
        const { estudanteId } = req.params //vai receber um id através dos params da requisição
        const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) }
        try {
            const novaMatriculaCriada = await database.Matriculas.create(novaMatricula)
            return res.status(200).json(novaMatriculaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    //ATUALIZA MATRICULA (precisa id da pessoa e id da matricula)
    static async atualizaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        const novasInfos = req.body //é o q vai ser passado no corpo da req
        try {
            await database.Matriculas.update(novasInfos, { 
                where: { 
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                } })
            //primeiro atualizou com o update
            //agora pedir para voltar o registro atualizado
            //o metodo update não volta o registro atualizado, apenas 0 ou 1
            const matriculaAtualizada = await database.Matriculas.findOne({
                where: {
                    id: Number(matriculaId) 
                }
            })
            return res.status(200).json(matriculaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    //DELETAR MATRICULA
    static async apagaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        try {
            await database.Matriculas.destroy({ where: { id: Number(matriculaId) } })
            return res.status(200).json({ mensagem: `O id ${matriculaId} foi deletado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = PessoaController