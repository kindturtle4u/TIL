<template>
    <div>
        <label><input type="checkbox" value="서울" v-model="checked"/> 서울</label>
        <label><input type="checkbox" value="부산" v-model="checked"/> 부산</label>
        <label><input type="checkbox" value="제주" v-model="checked"/> 제주</label>
        <br>
        <span>체크한 지역: {{ checked }}</span>
        <br>

        <label><input type="checkbox" value="가나" v-model="checked2"/> {{ checked2 }}</label>
    </div>
</template>

<script>
export default {
    name: "DataBindingCheckbox2",
    data() {
        return {
            checked: [],
            checked2:true
        }
    }
}
</script>