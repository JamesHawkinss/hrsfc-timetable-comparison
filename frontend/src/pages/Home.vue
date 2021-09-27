<template>
    <div>
        <Header />
        <h1>Home :D</h1>
        <Button @click="test()" :type="'primary'">Text</Button>
    </div>
</template>

<script>
import Header from '../components/partials/Header.vue';
import Button from '../components/Button.vue';

export default {
    components: {
        Header,
        Button
    },
    methods: {
        test() {
            alert('clicked');
        }
    }
}
</script>