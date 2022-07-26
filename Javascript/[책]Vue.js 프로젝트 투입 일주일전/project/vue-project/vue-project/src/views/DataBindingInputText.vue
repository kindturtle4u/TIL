<template>
    <div>
        <input type="text" v-model="valueModel" />
    </div>
</template>

<script>
export default {
    name: "DataBindingInputText",
    data() {
        return {
            valueModel: 'South korea'
        }
    }
}
</script>

<style scoped>

</style>