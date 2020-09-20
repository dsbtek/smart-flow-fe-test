<template>
    <v-container>
        <v-card :loading="loading">
            <v-expansion-panels>
                <v-expansion-panel>
                    <v-expansion-panel-header>
                        <template v-slot:default="{ open }">
                            <v-row no-gutters>
                                <v-col cols="6">Change Password</v-col>
                                <v-col cols="6">
                                    <v-fade-transition leave-absolute>
                                        <span v-if="open" class="green--text" key="0">
                                            {{error}}
                                        </span>
                                        <span v-else key="1">

                                        </span>
                                    </v-fade-transition>
                                </v-col>
                            </v-row>
                        </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-form v-model="valid">
                            <v-text-field v-model="newPassword" :rules="rules.required" placeholder="New Password">
                            </v-text-field>
                            <v-text-field v-model="confirmPassword" :rules="rules.conform"
                                placeholder="Confirm Password">
                            </v-text-field>
                            <v-btn :id="valid ? 'allowedBtn' : 'notAllowedBtn'" @click="valid ? save() : null">Save
                            </v-btn>
                        </v-form>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-card>
    </v-container>
</template>

<script>
    import {
        mapActions
    } from 'vuex'

    export default {
        data() {
            return {
                loading: false,
                valid: false,
                error: '',
                rules: {
                    required: [
                        v => !!v || 'Required.'
                    ],
                    conform: [
                        v => v === this.newPassword || 'Password mismatch! Try again',
                        v => !!v || 'Required.'
                    ]
                },
                newPassword: '',
                confirmPassword: ''
            }
        },
        created() {
            this.setHeaderTitle('Settings')
        },
        mounted() { },
        methods: {
            ...mapActions({
                setTitle: 'setTitle',
                changePassword: 'auth/changePassword'
            }),
            setHeaderTitle(title) {
                this.setTitle(title)
            },
            save() {
                this.loading = '#abc033'
                this.error = ''
                setTimeout(async () => {
                    const res = await this.changePassword({
                        password: this.newPassword
                    })

                    if (res.statusText === 'OK') {
                        this.error = res.data.message
                        this.newPassword = null
                        this.confirmPassword = null
                    } else {
                        this.error = 'Oops! Something went wrong!'
                    }
                    this.loading = false
                    setTimeout(() => {
                        this.error = ''
                    }, 3000)
                }, 1000)
            }
        }
    }
</script>

<style>

</style>