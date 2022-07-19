<template>
<v-app id="inspire">
    <v-navigation-drawer v-model="drawer" :color="color" :mini-variant="miniVariant" app dark mobile-breakpoint="700">
        <DiddyDrawer :user="user" :items="items" :miniVariant="miniVariant" />
        <template v-slot:append>
            <div class="pa-2">
                <v-btn block id="bg-light" @click="userLogout">Logout</v-btn>
            </div>
        </template>
    </v-navigation-drawer>
    <v-app-bar app color="#171754" dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-btn icon @click.stop="miniVariant = !miniVariant">
            <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
        </v-btn>
        <v-toolbar-title id="text-weight-bold">{{ title }}</v-toolbar-title>
    </v-app-bar>

    <v-main>
        <v-container>
            <router-view />
        </v-container>
    </v-main>
</v-app>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex';
import DiddyDrawer from '../components/DiddyDrawer'

export default {
    props: {
        source: String,
    },
    name: 'Dashboard',
    data() {
        return {
            drawer: false,
            clipped: true,
            items: [{
                    title: 'Dashboard',
                    icon: 'mdi-view-dashboard',
                    link: '/dashboard'
                },
                {
                    title: 'Customer',
                    icon: 'mdi-account-group',
                    link: '/customer'
                },
                {
                    title: 'Users',
                    icon: 'mdi-account-voice',
                    link: '/user'
                },
                {
                    title: 'Settings',
                    icon: 'mdi-cog',
                    link: '/settings'
                }
            ],
            color: '#0a0a3e',
            permanent: false,
            miniVariant: false,
        }
    },
    components: {
        DiddyDrawer
    },
    computed: {
        ...mapGetters({
            BASE_URL: 'baseURL',
            title: 'headerTitle'
        }),
        user: () => JSON.parse(localStorage.getItem('user'))
    },
    methods: {
        ...mapActions({
            logout: 'auth/logout'
        }),
        userLogout() {
            this.logout()
            this.$router.push('/')
        }
    }
}
</script>
