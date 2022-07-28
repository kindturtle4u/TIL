<template>
    <button type="button" @click="childFunc" ref="btn">click</button>
</template>

<script>
export default {
    name: "ChildComponent",
    data () {
      return {
          msg: '자식 컴포넌트로부터 보내는 메세지'
      }
    },
    methods : {
        childFunc() {
            console.log('부모 컴포넌트에서 직접 발생시킨 이벤트');
        }
    },
    mounted() {
        this.$emit('send-message', this.msg);
    }
}
</script>

<style scoped>

</style>