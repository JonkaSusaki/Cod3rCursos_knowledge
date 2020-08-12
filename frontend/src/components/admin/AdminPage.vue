<template>
    <div class="adminPage">
        <PageTitle title="Administração" sub="Criar, Editar ou Excluir" icon="fa fa-cogs"/>

        <b-card no-body>
            <b-tabs card>
            <b-tab title="Artigos" active>
                <ArticleAdmin/>
            </b-tab>
            <b-tab title="Categorias">
                <CategoryAdmin />
            </b-tab>
            <b-tab title="Usuários">
                <UserAdmin/>
            </b-tab>
            </b-tabs>
        </b-card>
    </div>
</template>

<script>
import PageTitle from '../templates/PageTitle'
import UserAdmin from './UserAdmin'
import CategoryAdmin from './CategoryAdmin'
import ArticleAdmin from './ArticleAdmin'

export default {
    name: 'AdminPage',
    components: {
        PageTitle,
        UserAdmin,
        CategoryAdmin,
        ArticleAdmin
    }
}
</script>

<style>

</style>