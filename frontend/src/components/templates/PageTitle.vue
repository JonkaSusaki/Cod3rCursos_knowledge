<template>
    <div class="pageTitle">
        <div class="main">
            <div class="icon">
                <i :class="icon"></i>
            </div>

            <h1>{{title}}</h1>
        </div>
        <span class="sub">{{sub}}</span>
        <hr>
    </div>
</template>

<script>
export default {
    name: 'PageTitle',
    props: {
        title: String,
        sub: String,
        icon: String
    }
}
</script>

<style>
.main {
    display: flex;
}

.icon {
    font-size: 30px;
    margin: 10px;

    display: flex;
    align-items: center;
    justify-content: center;
}

.sub {
   margin: 0 10px;
   color: #636e72; 
}
</style>