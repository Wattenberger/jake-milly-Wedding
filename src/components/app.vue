<template>
  <div class="app">
    <div class="title">
      <img class="img" :src="image" alt="" />
      <h1>Jake & Milly</h1>
      <h6>8.26.2017 - Stern Grove, San Francisco</h6>
      <countdown />
    </div>
    <div class="content">
      <p>
        More information coming soon.
      </p>
      <!-- <data-viz-or-story /> -->
      <!-- <questions /> -->
      <!-- <places-to-stay /> -->
      <!-- <wedding-party /> -->
      <!-- <event-schedule /> -->
      <!-- <things-to-do-around-town /> -->
    </div>
  </div>
</template>

<script>
import jakemilly from "./../images/jakemilly.png"
import questions from "./questions.vue"
import countdown from "./countdown.vue"

export default {
  data () {
    return {
      image: jakemilly
    }
  },
  components: {
    questions,
    countdown
  }
}
</script>

<style>
</style>
