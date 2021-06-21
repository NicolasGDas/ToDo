<template>
    <div class="q-pa-md">
    <q-carousel
        animated
        v-model="slide"
        navigation
        infinite
        :autoplay="autoplay"
        arrows
        transition-prev="slide-right"
        transition-next="slide-left"
        @mouseenter="autoplay = false"
        @mouseleave="autoplay = true"
    >
        <q-carousel-slide name="first" img-src= "../assets/manu.jpg">
        <div class="absolute-bottom custom-caption">
            <div class="text-h2">Manu Ginobili</div>
            <div class="text-subtitle1">"Lo primero que hago en el dia es abrir ToDo"</div>
        </div>
        </q-carousel-slide>
        <q-carousel-slide name="second" img-src="../assets/mesi.jpg">
        <div class="absolute-bottom custom-caption">
            <div class="text-h2">Messi</div>
            <div class="text-subtitle1">"Yo uso ToDo todos los dias"</div>
        </div>
        </q-carousel-slide>
        <q-carousel-slide name="third" img-src="../assets/elon.jpg">
        <div class="absolute-bottom custom-caption">
            <div class="text-h2">Elon Musk</div>
            <div class="text-subtitle1">"People should not invest their life savings in cryptocurrency, to be clear,they shoul invest in ToDo "</div>
        </div>
        </q-carousel-slide>
    </q-carousel>
    </div>
</template>
<script>
export default {
    data () {
        return {
        slide: 1,
        autoplay: true,

        };
    }
};
</script>