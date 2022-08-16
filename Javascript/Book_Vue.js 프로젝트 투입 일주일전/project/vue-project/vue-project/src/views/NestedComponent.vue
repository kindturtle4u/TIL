<template>
<div>
    <PageTitle title="부모 컴포넌트에서 자식 컴포넌트로 데이터 전달"/>
    <PageTitle :title="title"/>
</div>
</template>

<script>
import PageTitle from "@/components/PageTitle";
export default {
    name: "NestedComponent",
    components: {PageTitle},
    data() {
        return {
            title: '동적 페이지 타이틀'
        }
    }
}
</script>

<style scoped>

</style>