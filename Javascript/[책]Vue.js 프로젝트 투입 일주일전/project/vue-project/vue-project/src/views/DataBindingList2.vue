<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th>제품명</th>
                    <th>가격</th>
                    <th>카테고리</th>
                    <th>배송료</th>
                </tr>
            </thead>
            <tbody>
                <tr :key="i" v-for="(product,i) in produectList">
                    <td>{{product.product_name}}</td>
                    <td>{{product.price}}</td>
                    <td>{{product.category}}</td>
                    <td>{{product.delivery_price}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            produectList: []
        };
    },

    created() {
        console.log("created")
        this.getList();
    },
    methods: {
        async getList() {
            this.produectList = await this.$api("https://c09e6951-8ce4-4cc0-8f7a-6dbe42d8ade3.mock.pstmn.io/list","get")
            console.log(this.produectList)
        }
    }
}
</script>

<style scoped>
table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
}
</style>