<template>
<v-app class="home">
    <div class="log">
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card class="mx-auto" max-width="400" elevation="1" :loading="loading" loader-height="5">
                    <v-img class="white--text align-end" height="90" :src="`${BASE_URL}/images/logo.png`" gradient="to top right, rgba(22, 22, 85), rgba(22, 22, 85,.3)" contain>
                        <v-card-title>Admin Login</v-card-title>
                    </v-img>

                    <v-card-text>
                        <div class="red--text passage-big my-4">{{ error }}</div>
                        <v-form v-model="valid">
                            <v-text-field v-model="usr" label="Email" name="email" prepend-icon="mdi-account" type="text" :rules="rules.required" @keyup.enter="userLogin" />

                            <v-text-field v-model="pwd" prepend-icon="mdi-lock" :append-icon="
                    show ? 'mdi-eye' : 'mdi-eye-off'
                  " :rules="rules.required" :type="show ? 'text' : 'password'" name="pwd" label="Password" autocomplete @click:append="show = !show" @keyup.enter="userLogin" />
                        </v-form>
                    </v-card-text>
                    <div class="b center">
                        <v-row align="center" justify="center">
                            <v-btn width="250" dark rounded :id="valid ? 'allowedBtn' : 'notAllowedBtn'" class="mb-10" @click="valid ? userLogin() : null" :elevation="valid ? '4' : '0'" :ripple="valid">
                                Login
                            </v-btn>
                        </v-row>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </div>
</v-app>
</template>

<script>
import {
    mapGetters,
    mapActions
} from "vuex"

export default {
    name: 'Home',
    components: {},
    data() {
        return {
            loading: false,
            show: false,
            valid: true,
            error: '',
            usr: '',
            pwd: '',
            rules: {
                required: [
                    v => !!v || 'Required.'
                ],
                validEmail: [
                    v => !!v || 'Required.',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
                ]
                // emailMatch: () => ('The email and password you entered don\'t match'),
            }
        }
    },
    computed: {
        ...mapGetters({
            BASE_URL: 'baseURL'
        })
    },
    methods: {
        ...mapActions({
            login: 'auth/login'
        }),
        async userLogin() {
            this.loading = '#abc033'
            this.error = ''
            const res = await this.login({
                email: this.usr,
                password: this.pwd
            })
            if (res.statusText === 'OK') {
                return this.$router.push('/dashboard')
            }
            this.loading = false
            this.error = res.data.message
        }
    }
}
</script>

<style scoped>
.logo {
    font-size: 1.7rem;
}

.errCard {
    padding: 0.5rem;
    margin: 0 2rem;
}

.err {
    height: 3rem;
    padding: 0;
}

.b {
    margin-bottom: 1rem;
}

.log {
    margin-top: 5rem;
}

img {
    height: 5rem;
}

.r {
    padding: 1rem;
}

.q a {
    margin-left: 0.5rem;
    text-decoration-line: none;
}

.q {
    padding: 1rem 4rem;
    font-size: 0.8rem;
}

.home {
    height: 100vh;
}
</style>
