<template>
  <div class="snake-teaser">
    <div class="snake-teaser__placeholder" v-on:click="onStartPlaying">
      <div class="snake-teaser__placeholder__heads">
        <img :src="jakeImage" />
        <img :src="millyImage" />
      </div>
    </div>
    <div class="snake-teaser__snake-container" :class="{'snake-teaser__snake-container--playing': playing}">
      <div v-if="playing">
        <snake />
      </div>
      <div class="snake-teaser__close" v-on:click="onStopPlaying">❌</div>
    </div>
  </div>
</template>

<script>
  import "./snake-teaser.less"
  import {KEYS} from "./utils/keys"
  import snake from "./snake.vue"
  import jakeImage from "images/jake2.png"
  import millyImage from "images/milly2.png"

  let component = {
    mounted: function() {
      window.addEventListener("keydown", this.onKeydown)
    },
    data() {
      return {
        playing: false,
        keypresses: {
          [KEYS.ESC]: this.onStopPlaying,
        },
        jakeImage: jakeImage,
        millyImage: millyImage,
      }
    },
    computed: {},
    methods: {
      onStartPlaying: function() {
        this.playing = true;
      },

      onStopPlaying: function() {
        this.playing = false;
      },

      onKeydown: function(e) {
        let pressedKey = e.keyCode
        let method = this.keypresses[pressedKey]
        if (method) method(e)
      },
    },
    components: {
      snake,
    },
    destroyed: function() {
      window.removeEventListener("keydown", this.onKeydown)
    }
  }

  export default component
</script>
