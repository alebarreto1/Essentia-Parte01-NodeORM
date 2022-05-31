const database = require('../models/index.js')
const Sequelize = require('sequelize');

//findAll()
class PessoaController {
    //findAll()
    static async pegaPessoasAtivas(req, res) {
        try {
            const pessoasAtivas = await database.Pessoas.findAll();
            return res.status(200).json(pessoasAtivas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    //findAll()
    static async pegaTodasAsPessoas(req, res) {
        try {
            const todasAsPessoas = await database.Pessoas.scope('todos').findAll();
            return res.status(200).json(todasAsPessoas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    //findOne: 
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
    //create():
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
    //restore()
    static async restauraPessoa(req, res) {
        const { id } = req.params;
        try {
            await database.Pessoas.restore({ where: { id: Number(id) } }); //id = converte para número id
            return res.status(200).json({ mensagem: `id ${id} restaurado` })
        } catch (error) {
            return res.status(500).json(error.message);
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
        const { estudanteId } = req.params
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
        const novasInfos = req.body
        try {
            await database.Matriculas.update(novasInfos, {
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })
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
    //findAndCountAll()
    //limite: 10
    //ORDENANDO OS RESULTADOS POR ESTUDANTE_ID E DE FORMA DESCENDENTE
    static async pegaMatriculasPorTurma(req, res) {
        const { turmaId } = req.params
        try {
            const todasAsMatriculas = await database.Matriculas
                .findAndCountAll({
                    where: {
                        turma_id: Number(turmaId),
                        status: 'confirmado'
                    },
                    limit: 10,
                    order: [['estudante_id', 'DESC']]
                })
            return res.status(200).json(todasAsMatriculas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    //turmas lotadas (2 pessoas p/ teste)
    static async pegaTurmasLotadas(req, res) {
        const lotacaoTurma = 2
        try {
            const turmasLotadas = await database.Matriculas
                .findAndCountAll({
                    where: {
                        status: 'confirmado'
                    },
                    attributes: ['turma_id'], //passando em attrib. só o modelo do que vou trabalhar
                    group: ['turma_id'], // qual attrib. vai ser usado para agrupar
                    having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
                })
            return res.status(200).json(turmasLotadas.count)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }


}

module.exports = PessoaController