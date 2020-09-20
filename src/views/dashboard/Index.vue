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
                blogs: null,
                team: [],
                testimonials: [],
            }
        },
        components: {
            DashboardCards
        },
        computed: {},
        created() {
            this.loadBlog()
            this.loadTeam()
            this.loadTestimonials()
            this.setHeaderTitle('Dashboard')
        },
        mounted() { },
        methods: {
            ...mapActions({
                setTitle: 'setTitle',
                getAllBlogs: 'blogs/getAllBlogs',
                getAllTeamMembers: 'team/getAllTeamMembers',
                getAllTestimonials: 'testimonials/getAllTestimonials'
            }),
            async loadBlog() {
                const blog = await this.getAllBlogs()
                const item = {
                    title: 'Blogs',
                    total: blog.length
                }
                this.items.push(item)
            },
            async loadTeam() {
                const team = await this.getAllTeamMembers()
                const item = {
                    title: 'Team Members',
                    total: team.length
                }
                this.items.push(item)
            },
            async loadTestimonials() {
                const testimonials = await this.getAllTestimonials()
                const item = {
                    title: 'Testimonials',
                    total: testimonials.length
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