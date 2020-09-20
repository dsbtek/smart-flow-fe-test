<template>
<v-list dense nav class="py-0">
    <v-list-item two-line :class="miniVariant && 'px-0'">
        <v-list-item-avatar>
            <img :src="`${BASE_URL}/images/title-logo.png`">
        </v-list-item-avatar>

        <v-list-item-content>
            <v-list-item-title id="text-weight-bold" class="text-uppercase">{{ user.firstName }} {{ user.lastName }}</v-list-item-title>
            <v-list-item-subtitle class="text-capitalize">{{ user.role }}</v-list-item-subtitle>
        </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list-item v-for="item in items" :key="item.title" :to="item.link" class="my-2" link>
        <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
    </v-list-item>
</v-list>
</template>

<script>
import {
    // mapActions,
    mapGetters
} from 'vuex';

export default {
    name: 'Drawer',
    data: () => ({}),
    props: {
        user: {
            type: Object,
            required: true
        },
        items: {
            type: Array,
            required: true
        },
        miniVariant: {
            type: Boolean,
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
