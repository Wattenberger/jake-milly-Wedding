<template>
  <div class="venue body-section">

    <div class="row">
      <div class="col1">
        <h1>the Wedding</h1>
      </div>
      <div class="col2">
        <div class="section">
          <h3>Venue</h3>
          <div>
            <a href="https://www.google.com/maps/place/Trocadero+Clubhouse/@37.7357041,-122.4800544,17z/data=!4m12!1m6!3m5!1s0x808f7d97b7fb79ed:0xeb71ced4799b1a41!2sSigmund+Stern+Recreation+Grove!8m2!3d37.7353053!4d-122.4762135!3m4!1s0x0:0xe93215d73ebc37b5!8m2!3d37.7361638!4d-122.478177" target="_blank">Stern Grove</a>
            <div>Wawona St</div>
            <div>San Francisco, CA 94132</div>
          </div>
        </div>

        <div class="section">
          <h3>Weather</h3>
          <p>It should be overcast and in the 60s or 70s <a href="https://darksky.net/details/37.7361,-122.4786/2016-8-26/us12/en" target="_blank">Last year</a>. We will be outside at least part of the time, so please bring an extra layer to keep cozy!</p>
        </div>

        <div class="section">
          <h3>Schedule</h3>
          <ul class="marker-list">
            <li>
              <div class="marker">3<span class="sub">PM</span></div>
              <div><h6>Cocktails & hors d’oeuvres</h6></div>
            </li>
            <li>
              <div class="marker">4<span class="sub">PM</span></div>
              <div><h6>the Ceremony</h6></div>
            </li>
            <li>
              <div class="marker">5<span class="sub">PM</span></div>
              <div><h6>Photos & open bar</h6></div>
            </li>
            <li>
              <div class="marker">6<span class="sub">PM</span></div>
              <div><h6>Dinner & dancing</h6></div>
            </li>
            <!-- <li>
              <div class="marker">10<span class="sub">PM</span></div>
              <div>
                <h6>Breakdown</h6>
                <div>We’ll be moving to a karaoke bar, join us if you can!</div>
              </div>
            </li> -->
          </ul>
        </div>
      </div>
    </div>

    <div class="body-section-escaped">
      <stern-grove-map />
    </div>

    <div class="row">
      <div class="col1"></div>
      <div class="col2">

        <div class="section">
          <h3>Getting there</h3>
          <ul class="marker-list">
            <li>
              <div class="marker">🚗</div>
              <div>
                <h6>Driving</h6>
                <div>Look up directions on <a href="https://www.google.com/maps/place/Trocadero+Clubhouse/@37.7357041,-122.4800544,17z/data=!4m12!1m6!3m5!1s0x808f7d97b7fb79ed:0xeb71ced4799b1a41!2sSigmund+Stern+Recreation+Grove!8m2!3d37.7353053!4d-122.4762135!3m4!1s0x0:0xe93215d73ebc37b5!8m2!3d37.7361638!4d-122.478177" target="_blank">Google Maps</a> and parking information below.</div>
              </div>
            </li>
            <li>
              <div class="marker">🚃</div>
              <div>
                <h6>Public Transportation</h6>
                <div>Take the MUNI KT or M line outbound to West Portal/Sloat/St Francis Station. Note that the K and M lines run underground through downtown and at street level near the venue. From there it’s an 8-10 minute walk to the venue. It’s a rather steep walk down the drive to the venue, so keep that in mind when planning your trip.</div>
              </div>
            </li>
          </ul>
        </div>

        <div class="section">
          <h3>Parking</h3>
          <p>There will be parking in the park, but it will be limited so take an Uber or a cab if you can.</p>
          <ul class="marker-list">
            <li>
              <div class="marker">1</div>
              <div>The best parking lot is past the main entrance to Stern Grove. Continue westbound on Sloat for about 0.5 mile to Vale Avenue and turn right. This road leads to Stern Grove’s West Meadow parking lot (directions). Once you park your car, walk east past the West Meadow, past the Amphitheatre and you’ll see the Trocadero Clubhouse to your left (there will also be signs). There are no hills but it is a 5 min. walk.</div>
            </li>
            <li>
              <div class="marker">2</div>
              <div>There is a much smaller parking lot in front of the Trocadero Clubhouse that is available if guests need more access. Send us an <a href="mailto:hi@jakemilly.com">email</a> in advance if you’ll need closer parking.</div>
            </li>
            <li>
              <div class="marker">3</div>
              <div>Parking on Sloat Blvd is also an option. You can park your car here and enter Stern Grove on the corner of 19th Ave and Sloat Blvd on foot and walk down the hill. Please hide your valuables if you choose this option.</div>
            </li>
          </ul>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash"
import "./venue.less"
import sternGroveMap from "./stern-grove-map.vue"

let component = {
  mounted() {
  },
  data() {
    return {
    }
  },
  components: {
    sternGroveMap
  }
}


export default component
</script>
