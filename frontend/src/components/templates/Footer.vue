<template>
    <div class="footer">
        <span class="text">Desenvolvido com <i class="oi fa fa-heart"></i> por <strong><span class="oioi">A</span>bazaki</strong></span>
    </div>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style>
.footer {
    grid-area: footer;
    background-color: #dfe4ea;

    display: flex;
    align-items: center;
    justify-content: flex-end;

}

.text {
    margin-right: 20px;
    font: 500;
}

.oi {
    color: #c0392b;
    vertical-align: middle;
}

.oioi {
    color: #3498db;
    
}
</style>