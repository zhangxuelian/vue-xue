<template>
    <div class="demo-wrap">
        <p>指令测试</p>
            图片加载<img  alt="/" v-xImg="{src:'',err: defaultImg}">
            <div v-xClickOutside="clickEvt">clickOutside指令</div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            defaultImg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAsUlEQVQ4T2NkoDJgpLJ5DKMGUh6iWMOwZ/6ufwwMBMP3X0miGzO6E7AaWD91FQ8vl8BnfO79zC3F3him84soA0GKeubvrGBgYGzHYWhmSaLbDGxyeJNNz/xdbxkYGITQND4rSXSTxuV6gumwZ/6u/8iaSxLd8OohaGDf3F0m/5gYTkMM/a9Zkuh+A1/YEjQQEp679jIwMH4qSXQNJJSwiDKQkCHI8qMGkhJa2NUO/jAEANm4JRWmrrgRAAAAAElFTkSuQmCC'
        }
    },
    methods:{
        clickEvt(){
            console.log(12121)
        }
    }
}
</script>