<template>
    <child-component @send-message="sendMessage" ref="child_component" />
</template>

<script>
import ChildComponent from "@/components/ChildComponent";
export default {
    components: {ChildComponent},
    mounted() {
        this.$refs.child_component.$refs.btn.click();
    },
    methods: {
        sendMessage(data) {
            console.log(data)
        }
    }

}
</script>

<style scoped>

</style>