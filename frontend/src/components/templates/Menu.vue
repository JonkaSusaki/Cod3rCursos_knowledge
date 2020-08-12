<template>
    <div class="menu">
        <div class="input-field">
            <i class="fa fa-search"></i>
            <input type="text" v-model="treeFilter" placeholder="Pesquisar" class="input">
        </div>
        <Tree :data="treeData" :filter="treeFilter" :options="treeOptions" ref="tree"/>
    </div>
</template>

<script>
import Tree from 'liquor-tree'
import axios from 'axios'
import {baseApi} from '@/global.js'

export default {
    name: 'Menu',
    components: {
        Tree
    },
    data() {
        return {
            treeData: this.getTree(),
            treeOptions: {
                propertyNames: {'text': 'name'}
            },
            treeFilter: ''
        }
    },
    methods: {
        getTree() {
            return axios.get(`${baseApi}/categories/tree`).then(res => res.data)
        },

        onNodeSelect(node) {
            this.$router.push({
                name: 'articlesByCategory',
                params: {id: node.id}
            })
        }
    },
    mounted() {
        this.$refs.tree.$on('node:selected', this.onNodeSelect)
    }
}
</script>

<style>
.menu {
    grid-area: menu;
    background-color: #d8d8d8;
}

.input-field {
    display: flex;
    align-items: center;
}

.input-field i {
    font-size: 30px;
    padding: 10px;
}

.input {
    border: none;
    outline: none;
    background-color: #d8d8d8;
    font-size: 20px;
    width: 100%;

    border-bottom: 1px solid black;
}

</style>