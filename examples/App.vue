<template>
    <div
        class="root-box"
        id="app"
    >
        <view-header></view-header>
        <main class="main">
            <view-nav></view-nav>
            <router-view class="view"></router-view>
        </main>
    </div>
</template>

<script>
import ViewHeader from '@c/view-header.vue';
import ViewNav from '@c/view-nav';

export default {
    components: {
        'view-header': ViewHeader,
        'view-nav': ViewNav
    }
};
</script>

<style lang="scss">
@import "@/assets/scss/index.scss";

.root-box {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    .main {
        box-sizing: border-box;
        display: flex;
        flex: 1;
        margin: 0 auto;
        padding-left: 40px;
        width: 100%;
        height: 0;
        background-color: #fff;

        .view {
            box-sizing: border-box;
            flex: 1;
            padding: 32px 48px 48px;
            overflow-y: auto;
        }
    }
}
</style>
