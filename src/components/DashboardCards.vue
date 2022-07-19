<template>
    <v-card class="pa-6 py-10 mb-12" elevation="24">
        <v-row justify="center" align="center">
            <v-card-title id="text-weight-bold">
                {{ item.title }}
            </v-card-title>
        </v-row>
        <v-row justify="center" align="center">
            <v-chip class="pa-6" text-color="#171756" id="text-weight-bold" color="#e6e6fa"><span
                    color="white">{{ item.total }}</span>
            </v-chip>
        </v-row>
    </v-card>
</template>

<script>
    import {
        mapGetters
    } from 'vuex';

    export default {
        name: 'DashboardCards',
        data: () => ({}),
        props: {
            item: {
                type: Object,
                required: true
            }
        },
        computed: {
            ...mapGetters({
                BASE_URL: 'baseURL'
            })
        },
        methods: {}
    }
</script>

<style scoped>
    #text-weight-bold {
        font-size: 1.2rem;
    }
</style>