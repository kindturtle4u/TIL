<template>
    <h1>hello, {{ title }}!</h1>

    <div>{{htmlString}}</div>
    <div v-html="htmlString"></div>
</template>

<script>
export default {
    data() {
        return {
            title: 'World',
            htmlString: '<p style="color:red;">This is a red string.</p>'
        };
    },
    name: "DataBinding"
}
</script>

<style scoped>

</style>