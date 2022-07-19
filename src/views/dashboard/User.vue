<template>
    <v-card>
        <v-data-table :headers="headers" :items="users" :search="search" :options.sync="options"
            :server-items-length="totalUsers" :loading="loading" class="elevation-1" disable-sort>
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-spacer></v-spacer>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-dialog v-model="dialog" max-width="700px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn id="bg" dark class="mb-2" v-bind="attrs" v-on="on">Add User</v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="headline">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-form v-model="valid">
                                        <v-row>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field :rules="rules.required" v-model="editedItem.name"
                                                    label="Name" dense />
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field :rules="rules.required" v-model="editedItem.email"
                                                    label="Email" dense />
                                            </v-col>
                                            <v-col cols="12" sm="12" md="12">
                                                <v-text-field :rules="rules.required" v-model="editedItem.date_joined"
                                                    label="Date Created" dense />
                                            </v-col>
                                            <v-col cols="12" sm="12" md="12">
                                                <v-text-field :rules="rules.required" v-model="editedItem.role"
                                                    label="Role" dense />
                                            </v-col>
                                        </v-row>
                                    </v-form>
                                </v-container>
                            </v-card-text>

                            <v-card-actions class="pb-10 px-10">
                                <v-spacer></v-spacer>
                                <v-btn text @click="close">Cancel</v-btn>
                                <v-btn :id="valid ? 'allowedBtn' : 'notAllowedBtn'" @click="valid ? save() : null">Save</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon color="#171756" small class="mr-2" @click="editItem(item)">
                    mdi-pencil
                </v-icon>
                <v-icon color="red" small @click="deleteItem(item)">
                    mdi-delete
                </v-icon>
            </template>
            <template v-slot:no-data>
                <span>No Record Found</span>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
    import {
        mapActions,
        mapGetters
    } from 'vuex'

    export default {
        data() {
            return {
                valid: true,
                rules: {
                    maxFileSize: [
                        value => !value || value.size < 200000 || 'Image size should be less than 200 KB!'
                    ]
                },
                dialog: false,
                search: '',
                totalUsers: 0,
                users: [],
                loading: true,
                options: {},
                headers: [{
                    text: 'Name',
                    align: 'start',
                    sortable: false,
                    value: 'name',
                },
                {
                    text: 'Email',
                    value: 'email'
                },
                {
                    text: 'Date Created',
                    value: 'date_joined'
                },
                {
                    text: 'Role',
                    value: 'role'
                },
                {
                    text: 'Actions',
                    value: 'actions',
                    sortable: false
                }
                ],
                editedIndex: -1,
                editedItem: {
                    name: '',
                    email: '',
                    date_joined: '',
                    role: ''
                },
                defaultItem: {
                    name: '',
                    email: '',
                    date_joined: '',
                    role: ''
                }
            }
        },

        watch: {
            dialog(val) {
                val || this.close()
            }
        },

        computed: {
            ...mapGetters({
                baseURL: 'baseURL'
            }),
            formTitle() {
                return this.editedIndex === -1 ? 'New User' : 'Edit User'
            }
        },

        created() {
            this.setHeaderTitle('Users')
        },

        mounted() {
            this.getDataFromApi()
        },

        methods: {
            ...mapActions({
                setTitle: 'setTitle',
                getAllUser: 'users/getAllUser',
                addNewUser: 'users/addNewUser',
                editUser: 'users/editUser',
                archiveUser: 'users/archiveUser'
            }),

            onFileChange() {
                this.editedItem.url = URL.createObjectURL(this.editedItem.img);
            },

            editItem(item) {
                this.editedIndex = this.users.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.editedItem.url = `${this.baseURL}${this.editedItem.img}`
                this.dialog = true
            },

            async deleteItem(item) {
                const index = this.testimonials.indexOf(item)
                const { id } = item

                const editedUsers = confirm('Are you sure you want to delete this item?') && await this.archiveUser(id)

                if (editedUsers) {
                    this.testimonials.splice(index, 1)
                } else {
                    alert('Unable to delete')
                }
            },

            close() {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },

            async save() {
                if (this.editedIndex > -1) {
                    let data = new FormData()
                    data.append('type', 'users')

                    Object.keys(this.editedItem).forEach((k) => {
                        if (k === 'author' || k === 'title' || k === 'body') {
                            data.append(`${k}`, this.editedItem[k])
                        }
                    })

                    const id = this.editedItem._id
                    const editedUsers = await this.editUser({ data, id })
                    Object.assign(this.users[this.editedIndex], editedUsers)
                } else {
                    let data = new FormData()
                    data.append('type', 'users')

                    Object.keys(this.editedItem).forEach((k) => {
                        if (k !== 'img') {
                            data.append(`${k}`, this.editedItem[k])
                        }
                    })

                    const newUser = await this.addNewUser(data)
                    this.users = [newUser, ...this.users]
                }
                this.close()
            },
            setHeaderTitle(title) {
                this.setTitle(title)
            },
            async getDataFromApi() {
                this.loading = true
                try {
                    const {
                        sortBy,
                        sortDesc,
                        page,
                        itemsPerPage
                    } = this.options

                    let items = await this.getAllUser()
                    const total = items.length

                    if (sortBy.length === 1 && sortDesc.length === 1) {
                        items = items.sort((a, b) => {
                            const sortA = a[sortBy[0]]
                            const sortB = b[sortBy[0]]

                            if (sortDesc[0]) {
                                if (sortA < sortB) return 1
                                if (sortA > sortB) return -1
                                return 0
                            } else {
                                if (sortA < sortB) return -1
                                if (sortA > sortB) return 1
                                return 0
                            }
                        })
                    }

                    if (itemsPerPage > 0) {
                        items = items.slice((page - 1) * itemsPerPage, page * itemsPerPage)
                    }

                    setTimeout(() => {
                        this.loading = false

                        this.users = items
                        this.totalUsers = total
                    }, 1000)
                } catch (error) {
                    return {
                        error
                    }
                }
            }
        }
    }
</script>

<style scoped>
    #banner {
        width: 100%;
    }
</style>