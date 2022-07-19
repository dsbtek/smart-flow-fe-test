<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="4" sm="4" v-for="(item, i) in items" :key="i">
                <DashboardCards :item="item" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import { mapActions } from 'vuex'
    import DashboardCards from '../../components/DashboardCards'

    export default {
        data() {
            return {
                items: [],
                customers: [],
                users: [],
            }
        },
        components: {
            DashboardCards
        },
        computed: {},
        created() {
            
            this.loadCustomers()
            this.loadUsers()
            this.setHeaderTitle('Dashboard')
        },
        mounted() { },
        methods: {
            ...mapActions({
                setTitle: 'setTitle',
                getAllCustomers: 'customers/getAllCustomers',
                getAllUsers: 'users/getAllUser'
            }),
            async loadCustomers() {
                const customer = await this.getAllCustomers()
                const item = {
                    title: 'Customers',
                    total: customer.length
                }
                this.items.push(item)
            },
            async loadUsers() {
                const users = await this.getAllUsers()
                const item = {
                    title: 'Users',
                    total: users.length
                }
                this.items.push(item)
            },
            setHeaderTitle(title) {
                this.setTitle(title)
            },
        }
    }
</script>

<style>

</style>