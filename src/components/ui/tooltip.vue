<template>
  <div class="tooltip" :style="{
    top: top + 'px',
    left: left + 'px',
  }">
    {{ text }}
  </div>
</template>

<script>
import "./tooltip.less"

let component = {
  mounted() {
  },
  props: [
    'top',
    'left',
    'text',
  ],
  data() {
    return {

    }
  }
}


export default component
</script>
