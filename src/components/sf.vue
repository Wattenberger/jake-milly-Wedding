<template>
  <div class="sf body-section body-section-white">

    <div class="row">
      <div class="col1">
        <h1>Your Trip</h1>
        
      </div>
      <div class="col2">

        <div class="section">
          <h3>Lodging</h3>
          <p>While San Francisco has hundreds of hotels, most are not located near the wedding venue. We’ve decided to forego the typical hotel room block scenario so you can find the lodging options that best suit your needs and budget.</p>
          <p>Note that while being near the venue will make your wedding commute more convenient, if you plan on doing a little San Francisco tourism while you’re here, we recommend staying downtown where you’ll have better access to the sights and transit options. there are transit and taxi/uber options to easily get you to/from the venue.</p>
        </div>

        <div class="section">
          <h3>Things to see</h3>
          <p></p>
          <ul class="marker-list">
            <li>
              <div class="marker">🌲</div>
              <div>
                <h6>Muir Woods</h6>
                <div>Just across the Golden Gate Bridge, Muir Woods is a natural park with ancient California Coastal Redwoods. It’s a beautiful, peaceful place.</div>
                <div class="more-info"><a href="https://www.nps.gov/muwo/index.htm" target="_blank">More info</a></div>
              </div>
            </li>
            <li>
              <div class="marker">⛲</div>
              <div>
                <h6>Golden Gate Park</h6>
                <div>There is so much here! The Japanese Tea Garden, De Young Art Museum, California Academy of Sciences and SF Botanical Gardens are among our favorite places in the park.
                  <div class="more-info"><a href="https://goldengatepark.com/" target="_blank">More info</a></div>
                </div>
              </div>
            </li>
            <li>
              <div class="marker">🍺</div>
              <div>
                <h6>Anchor Steam Brewery</h6>
                <div>They offer two public tours each weekday, by reservation only. We recommend that you call as early as possible to make reservations far in advance so that they can accommodate you on the day of your choice.</div>
                <div class="paragraph">The walking tour of the brewery lasts about 40-45 minutes. Altogether, the tour and the tasting last for about 2 hours, and hearty tastings are available to those who take the tour.</div>
                <div class="more-info"><a href="https://www.anchorbrewing.com/brewery/tours" target="_blank">More info</a></div>
              </div>
            </li>
            <li>
              <div class="marker">🔬</div>
              <div>
                <h6>California Academy of Sciences</h6>
                <div>Spend an afternoon walking around Golden Gate Park and visit this amazing museum.  We encourage you to buy tickets in advance as it’s quite popular and definitely worth seeing while you’re in town.
                  <div class="more-info"><a href="http://www.calacademy.org/plan-your-visit" target="_blank">More info</a></div>
                </div>
              </div>
            </li>
          </ul>
        </div>
          

      </div>
      </div>
  </div>
</template>

<script>
import _ from "lodash"
import "./sf.less"

let component = {
  mounted() {
  },
}


export default component
</script>
