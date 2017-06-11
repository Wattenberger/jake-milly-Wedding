<template>
  <div class="rsvp body-section">

    <div class="row">
      <div class="col1">
        <h1>RSVP</h1>
      </div>
      <div class="col2">
        <vue-form :state="formstate" @submit.prevent="onSubmit" v-if="!submitted">
          <validate tag="label">
            <div class="field">
              <label>Your Name</label>
              <div class="input-addon">
                <input v-model="model.name"
                       required
                       name="name"
                       v-on:keyup="wrongName = false"
                       type="text">
                <div class="addon">
                <button v-on:click="lookupName" v-if="!id">Lookup</button>
                </div>
              </div>
            </div>
            <div class="form-message-error" v-if="wrongName">Try the name on your envelope</div>
          </validate>


          <div v-if="id">
            <h3>We have a spot reserved for you<span v-if="guests == 1">!</span>
              <span v-if="guests > 1">and
                <span v-if="guests == 2">a guest!</span>
                <span v-if="guests > 2" >{{ guests - 1 }} guests!</span>
              </span>
            </h3>

            <div class="field">
              <div class="toggle">
                <button class="button"
                        :class="{'button--selected': model.status}"
                        v-on:click="model.status = true">I'll be there</button>
                <button class="button"
                        :class="{'button--selected': !model.status}"
                        v-on:click="model.status = false">I can't make it</button>
              </div>
            </div>

            <div v-if="model.status">
              <validate tag="label">
                <div class="field" v-if="guests > 1" v-for="n in guests - 1">
                  <label>Guest<span v-if="guests > 2"> {{ n }}</span> Name</label>
                  <input type="text"
                         v-model="model[`guest${n}`]">
                </div>
              </validate>

              <div class="field">
                <label>What song should we dance to?</label>
                <input type="text"
                       v-model="model.song">
              </div>
            </div>

            <button type="submit" v-on:click="saveRsvp">RSVP</button>
          </div>
        </vue-form>

        <div v-if="submitted">
          <h3>Thanks for RSVPing</h3>
          <p v-if="model.status">We're excited to see you in August!</p>
          <p v-if="!model.status">We're sad you can't make it, hopefully we can catch up soon!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash"
import "./venue.less"
import fetch from "./utils/fetch"
import VueForm from "vue-form"

const API_ROOT = "https://api.airtable.com/v0/appUE0k5U8GX5MTEh/Guests"
const airtableDateTimeFormat = "YYYY-MM-DD HH:mm:SS"
import {AIRTABLE_API_KEY} from "config/config"

const params = {
  api_key: AIRTABLE_API_KEY,
}
const expandParams = params => Object
    .keys(params)
    .map(key => {
      const val = params[key]
      return _.isArray(val) ?
               val.map(v => `${key}[]=${v}`).join("&") :
               `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    })
    .join('&')
  ;

let component = {
  data() {
    return {
      formstate: {},
      model: {
        name: "",
        status: true,
        guest1: "",
        guest2: "",
        guest3: "",
        guest4: "",
        guest5: "",
        song: "",
      },
      id: null,
      guests: 0,
      wrongName: false,
      submitted: false,
    }
  },
  methods: {
    lookupName: function () {
      // if(this.formstate.$invalid) {
      //   // alert user and exit early
      //   return;
      // }
      console.log(this.formstate)
      this.wrongName = false
      this.validateName();
    },
    onSubmit: function () {
      if(this.formstate.$invalid) {
        // alert user and exit early
        return;
      }
      console.log(this.formstate)
    },

    validateName: function() {
      let ctrl = this

      const guestParams = _.extend(params, {
        fields: ["Guest", "People Invited"],
        filterByFormula: `Guest = "${this.model.name}"`,
      })

      fetch(`${API_ROOT}?${expandParams(params)}`, {
        method: "GET",
      }).then(res => {
        console.log(res)
        if (!res.records ||
            !res.records.length) {
          ctrl.wrongName = true
          ctrl.guests = 0
          return
        }

        ctrl.id = res.records[0].id
        ctrl.guests = res.records[0].fields["People Invited"]
      })
    },

    saveRsvp: function() {
      let ctrl = this
      if (!this.id) return

      let fields = {
        rsvp: this.model.status ? "yes" : "no",
        guest1: this.model.guest1,
        guest2: this.model.guest2,
        guest3: this.model.guest3,
        guest4: this.model.guest4,
        guest5: this.model.guest5,
        song: this.model.song
      }
      const url = `${API_ROOT}/${this.id}?${expandParams(params)}`
      fetch(url, {
        method: "PATCH",
        body: JSON.stringify({fields}),
      }).then(res => {
        ctrl.submitted = true
      })
    },
  },
  mixins: [VueForm],
  mounted() {
  },
}


export default component
</script>
