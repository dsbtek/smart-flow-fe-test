<template>
<router-view />
</template>

<script>
export default {
    name: 'App',

    components: {
        //
    },

    data: () => ({
        //
    }),
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,400;0,600;0,800;1,200;1,400;1,600;1,800&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Montserrat;
}

#allowedBtn {
    background-color: #171756;
    color: lavender;
}

#notAllowedBtn {
    background-color: lavender;
    color: lightgrey;
    cursor: default;
}

#app {
    height: 100%;
    width: 100%;
    background-color: white;
}

#bg {
    background-color: #171756;
    color: lavender;
}

#bg-dark {
    background-color: #0a0a3e;
    color: lavender;
}

#bg-light {
    background-color: lavender;
    color: #0a0a3e;
}

#text-weight-thin {
    font-weight: 200;
}

#text-weight-normal {
    font-weight: 400;
}

#text-weight-bold {
    font-weight: 600;
}

#text-weight-x-bold {
    font-weight: 800;
}
</style>
