
<template>
    <header class="header">
        <div class="header-container">
            <span class="header-title">My Element Component</span>
        </div>
    </header>
</template>

<style lang="scss" scoped>
.header {
    z-index: 100;
    opacity: 0.98;
    position: relative;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
    width: 100%;
    height: 80px;
    background-color: #fff;
    transition: all 0.3s;

    &-container {
        margin: 0 40px;

        .header-title {
            margin-left: 5px;
            font-size: 20px;
            color: #628cf5;
        }
    }
}
</style>