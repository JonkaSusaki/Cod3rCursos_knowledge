<template>
    <div class="stat">
        <div class="statIcon">
            <i :class="icon" :style="style"></i>
        </div>

        <div class="statInfo">
            <span class="statTitle">
                {{name}}
            </span>

            <span class="statValue">
                {{value}}
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Stat',
    props: ['name', 'value', 'color', 'icon'],
    computed: {
        style() {
            return 'color: ' + (this.color || '#000')
        }
    }
}
</script>

<style>
.stat {
    display: flex;
    justify-content: space-between;
    
    border-radius: 8px;
    width: 300px;
    margin: 15px;
    padding: 15px;
    background-color: #fff;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);
}

.statIcon {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 70px;
    margin-right: 70px;
}

.statInfo {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.statTitle {
    font-size: 1.5rem;
}

.statValue {
    font-size: 1.3rem;
    color: #34495e;    
}
</style>