<template>
    <div class="container is-max-desktop">
        <div class="titulo">
            <h2>Produtos.com</h2>
        </div>
        <div class="form">
            <ul id="error">
                <li v-for="(erro, index) of errors" :key="index">
                    campo <b>{{erro.field}}</b> - {{erro.defaultMessage}}
                 </li>
            </ul>

            <form @submit.prevent="adicionar">
                <div class="field">
                    <div class="control">
                        <label class="label">Nome:</label>
                        <input class="input" type="text" placeholder="Nome do produto" v-model="produto.nome">
                    </div>
                </div>

                <div class="field">
                    <div class="control">
                        <label class="label">Quantidade:</label>
                        <input class="input" type="number" placeholder="Quantidade" v-model="produto.quantidade">
                    </div>
                </div>

                <div class="field">
                    <div class="control">
                        <label class="label">Preço:</label>
                        <input class="input" type="text" placeholder="Preço do produto" v-model="produto.valor">
                    </div>
                </div>
                <div>
                    <button id="add" type="submit" class="button is-success"><img src="../assets/plus.png">Adicionar</button>
                </div>
            </form>
        </div>  

        <div class="table-container">
            <h2>Tabela de produtos</h2>
            <table class="table is-fullwidth">
                <tr>
                    <th>Nome</th>
                    <th>Quantidade</th>
                    <th>Preço</th>
                </tr>
                <tr v-for="produto of produtos" :key="produto.id">
                    <td>{{produto.nome}}</td>
                    <td>{{produto.quantidade}}</td>
                    <td>{{produto.valor}}</td>
                    <td>
                        <button @click="editar(produto)" id="edit" class="button is-warning"><img src="../assets/pencil-outline.png"> Editar</button>
                        <button @click="remover(produto)" id="delet" class="button is-black"><img src="../assets/delete-forever.png"> Deletar</button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import Produto from '../service/produtos'
export default {
    data(){
        return{
            produto:{
                id: '',
                nome:'',
                quantidade:'',
                valor:''
            },
            produtos: [],
            errors: []
        }
    },
    
    mounted(){
        this.listar()
    },

    methods:{
        listar(){
            Produto.listar().then(res => {
                this.produtos = res.data
            }).catch(e => {console.log(e)})
        },

        adicionar(){
            if(!this.produto.id){
                Produto.salvar(this.produto).then(() => {
                    this.produto = {}
                    alert('Adicionado com sucesso ^_^')
                    this.listar()
                    this.errors = {}
                }).catch(e => {this.errors = e.response.data.errors})
            } else{
                Produto.editar(this.produto).then(() =>{
                    this.produto = {}
                    this.errors = {}
                    alert('Edição feita com sucesso ^_^')
                    this.listar()
                }).catch(e => {this.errors = e.response.data.errors})
            }
        },

        editar(produto){
            this.produto = produto
        },

        remover(produto){
            if(confirm('Deseja remover o produto?')){
                Produto.apagar(produto).then(() =>{
                    this.listar()
                    this.errors = {}
                }).catch(e => {
                    this.errors = e.response.data.errors
                })
            }
        }
    }
}
</script>

<style>
    .container{
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    .titulo{
        background-color: #D2B4DE;
        color: black;
    }
    .titulo h2{
        font-size: 50px;
        text-align: center;
        font-weight: lighter;
    }

    .form{
        width: 500px;
        height: 250px;
        padding: 15px;
        margin-top: 20px;
        margin-left: 25%;
    }
    .form input{
        border-color: #b189c0;
    }
    .table-container{
        margin-top: 150px;
    }
    .table-container h2{
        font-size: 25px;
        background-color:#AED6F1;
        color: black;
        padding: 10px;
        font-weight: bolder;
    }
    .table tr td button{
        margin-right: 25px;
    }

    #add img,#edit img, #delet img{
        margin-right: 5px;
    }
    #add{
        margin-left: 72%;
        background-color: #8E44AD;
    }
    #edit{
        background-color: #AED6F1;
        font-weight: bold;
        color: black;
    }

    #error{
        color: red;
    }

</style>