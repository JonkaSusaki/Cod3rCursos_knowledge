<template>
    <div class="article-item">
        <router-link :to="{name: 'articlePage', params: {id: article.id}}">
            <div class="article-item-image">
            <img v-if="article.imageUrl" :src="article.imageUrl" alt="ArticleImage"> 
            <img v-else src="../../assets/article.png" alt="ArticleImage">
            </div>

            <div class="article-item-info">
                <div class="title">
                    <span class="articleName">{{article.name}}</span>
                
                    <span class="articleDescription">{{article.description}}</span>
                </div>

                <div class="articleAuthor">
                <span><strong>Autor: </strong>{{article.author}}</span>

                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'ArticleItem',
    props: ['article']
}
</script>

<style>
img {
    max-width: 150px;
}
.article-item {
    border-radius: 8px;
    margin-bottom: 20px;
    background-color: #FFF;
    padding: 20px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
}

.article-item a {
    display: flex;
    align-items: flex-start;
    text-decoration: none;
    color: #000;
}

.article-item-info .articleName {
    font-size: 2rem;
    font-weight: 400;
}

.article-item-image {
    padding-right: 20px;
    margin-right: 20px;
    border-right: 1px solid #AAA;
}

.title {
    display: flex;
    flex-direction: column;

    padding-bottom: 40px;
}

.articleDescription {
    font-size: 20px;
    color: #444;
}
</style>