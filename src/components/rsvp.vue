<template>
  <div class="rsvp body-section">

    <div class="row">
      <div class="col1">
        <h1>RSVP</h1>
      </div>
      <div class="col2">
        <vue-form :state="formstate" @submit.prevent="onSubmit" v-if="!submitted" :class="{loading: loading}">
          <validate tag="label">
            <div class="field">
              <label>Your Name</label>
              <div class="input-addon">
                <input type="text"
                       required
                       v-model="model.name"
                       autocomplete="off" 
                       name="name"
                       v-on:keyup="nameError = null"
                       v-on:keydown.13="lookupName"/>
                <div class="addon">
                <button v-on:click="lookupName">Lookup</button>
                </div>
              </div>
            </div>
            <div class="form-message-error" v-if="nameError">{{ nameError }}</div>
            <div class="form-message-error form-message-error-secondary" v-if="nameError && numberOfTries > 4">If you're having trouble finding yourself, send <a class="button" href="mailto:wattenberger@gmail.com">Milly</a> or <a class="button" href="mailto:jacoby8s@gmail.com">Jake</a> an email.</div>
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
                  v-model="model[`guest${n}`]"
                  v-on:keydown.13="saveRsvp"
                  :name="`guest${n}`" />
                </div>
              </validate>

              <div class="field">
                <label>What songs should we add to the wedding playlist?</label>
                <input type="text"
                v-model="model.song"
                v-on:keydown.13="saveRsvp"
                name="song" />
              </div>

              <div class="field">
                <label>Any notes for the bride & groom?</label>
                <textarea v-model="model.note"
                name="note" />
              </div>
            </div>

            <div class="form-message-error form-message-already-responded" v-if="alreadyResponded">This will override your previous response</div>
            <button type="submit" v-on:click="saveRsvp">RSVP</button>
          </div>
        </vue-form>

        <div v-if="submitted">
          <h3>Thanks for RSVPing</h3>
          <p v-if="model.status">We're excited to see you in August!</p>
          <p v-if="!model.status">We're sad you can't make it, hopefully we can catch up soon!</p>
          <button class="button" v-on:click="submitted = false">Change response</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash"
import moment from "moment"
import "./rsvp.less"
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

const defaultForm = {
  name: "",
  status: true,
  guest1: "",
  guest2: "",
  guest3: "",
  guest4: "",
  guest5: "",
  song: "",
  note: "",
}

let component = {
  data() {
    return {
      formstate: {},
      model: defaultForm,
      id: null,
      guests: 0,
      nameError: null,
      alreadyResponded: false,
      loading: false,
      submitted: false,
      numberOfTries: 0,
    }
  },
  methods: {
    lookupName: function () {
      // if(this.formstate.$invalid) {
      //   // alert user and exit early
      //   return;
      // }
      this.nameError = null
      this.alreadyResponded = false
      this.id = null
      _.extend(this.model, {
        guest1: "",
        guest2: "",
        guest3: "",
        guest4: "",
        guest5: "",
      })
      this.validateName();
      this.numberOfTries++
    },

    onSubmit: function() {
      // this[this.id ? "saveRsvp" : "validateName"]()
    },

    validateName: function() {
      let ctrl = this

      this.loading = true
      const name = this.model.name.toLowerCase().trim()
      const guestParams = _.extend(params, {
        fields: ["Guest", "People Invited", "Names", "rsvp"],
        filterByFormula: `LOWER(Guest) = "${name}"`,
      })

      fetch(`${API_ROOT}?${expandParams(params)}`, {
        method: "GET",
      }).then(res => {
        this.loading = false

        if (res.records && res.records.length) {
          if (res.records.length > 1) {
            this.tooManyNames(ctrl)
            return
          }

          this.populateForm(ctrl, res.records[0])
        } else {
          
          guestParams.filterByFormula = `SEARCH('${name}', LOWER(Names))`
          fetch(`${API_ROOT}?${expandParams(params)}`, {
            method: "GET",
          }).then(res => {
            if (res.records && res.records.length) {
              if (res.records.length > 1) {
                this.tooManyNames(ctrl)
                return
              }

              this.populateForm(ctrl, res.records[0])
            } else {
              ctrl.nameError = "Try the name on your envelope"
              ctrl.guests = 0
              return
            }

          })
        }

      })
    },

    tooManyNames: (ctrl) => {
      ctrl.nameError = "There's more than one guest with that name, could you be more specific?"
      ctrl.guests = 0
    },

    populateForm: (ctrl, record) => {
      ctrl.id = record.id
      ctrl.guests = record.fields["People Invited"]
      if (record.fields["rsvp"]) ctrl.alreadyResponded = true

      var names = record.fields["Names"].split(",");
      if (names.length > 1) {
        const searchedNameIdx = _.findIndex(names, name => _.toLower(name).indexOf(_.toLower(ctrl.model.name)) != -1)
        if (searchedNameIdx != -1) {
          names.unshift(names[searchedNameIdx])
          names.splice(searchedNameIdx + 1, 1)
        }
      }

      _.each(names, (name, i) => {
        ctrl.model[i ? `guest${i}` : "name"] = name
      })
    },

    saveRsvp: function() {
      let ctrl = this
      if (!this.id) return

      this.loading = true
      let fields = {
        rsvp: this.model.status ? "yes" : "no",
        'rsvp-name': this.model.name,
        guest1: this.model.guest1,
        guest2: this.model.guest2,
        guest3: this.model.guest3,
        guest4: this.model.guest4,
        guest5: this.model.guest5,
        song: this.model.song,
        "rsvp-note": this.model.note,
        "rsvp-date": moment().format("YYYY-MM-DD")
      }
      const url = `${API_ROOT}/${this.id}?${expandParams(params)}`
      fetch(url, {
        method: "PATCH",
        body: JSON.stringify({fields}),
      }).then(res => {
        this.loading = false
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
