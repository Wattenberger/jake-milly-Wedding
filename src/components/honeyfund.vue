<template>
  <div class="honeyfund body-section body-section-white">
    <div class="row">
      <div class="col1">
        <h1>Honeymoon Fund</h1>
      </div>
      <div class="col2">
        <p>After the celebration, we’ll be spending a few days in Tokyo then flying to Thailand for ten days. We treasure experiences over material things, so we won’t have any registries.</p>
        <p>If you insist on contributing to our lives together, we’d love help with planning our honeymoon. Please don’t feel obliged to get us a gift other than celebrating with us.</p>
      </div>
    </div>

    <div class="row honeyfund__options">
      <div class="honeyfund__option" v-for="option in options">
        <h3>{{ option.label }}</h3>
        <h6>{{ option.location }}</h6>
        <div class="honeyfund__option__image"
             v-if="option.image"
             :style="{'background-image': `url(${option.image})`}" />
        <p>{{ option.body }}</p>
        <!-- <div class="honeyfund__option__price"><span class="sup">$</span>{{ option.value }}</div> -->

        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
          <input type="hidden" name="cmd" value="_xclick">
          <input type="hidden" name="business" value="QAW56TL3WEQSL">
          <input type="hidden" name="lc" value="US">
          <input type="hidden" name="item_name" value="2">
          <input type="hidden" name="button_subtype" value="services">
          <input type="hidden" name="no_note" value="0">
          <input type="hidden" name="cn" value="Leave a note for Jake + Milly">
          <input type="hidden" name="no_shipping" value="1">
          <input type="hidden" name="undefined_quantity" value="1">
          <input type="hidden" name="currency_code" value="USD">
          <input type="hidden" name="bn" value="PP-BuyNowBF:btn_buynowCC_LG.gif:NonHosted">
          <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
          <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">

          <input type="hidden" name="amount" :value="`20.00`">
          <input type="hidden" name="item_name" :value="`Jake & Milly ${option.label} Fund - ${option.label}`">
          <button>Donate Towards this</button>
        </form>
      </div>

    </div>
  </div>
</template>

<script>
import "./honeyfund.less"
import {honeyfundOptions} from "./honeyfundOptions"

const options = honeyfundOptions.map(option => {
  if (!option.image) option.image = option.airtableId ? `https://source.unsplash.com/${option.airtableId}` : `https://source.unsplash.com/1600x900/?${option.keyword}`
  return option
})

export default {
  data () {
    return {
      options,
    }
  }
}
</script>
