<template>
  <div class="stern-grove-map" v-on:mouseout="onMouseOut">
    <a href="https://www.google.com/maps/place/Sigmund+Stern+Recreation+Grove/@37.7353053,-122.4784022,17z/data=!3m1!4b1!4m5!3m4!1s0x808f7d97b7fb79ed:0xeb71ced4799b1a41!8m2!3d37.7353053!4d-122.4762135" target="_blank">
      <tooltip v-if="tooltipText" :text="tooltipText" :top="tooltipTop" :left="tooltipLeft" />
      <svg class="map" x="0px" y="0px"
           viewBox="0 0 1920 1015" style="enable-background:new 0 0 1920 1015;" xml:space="preserve">
        <path v-on:mousemove="onPlaceMouseOver('Pine Lake Park', $event)" class="park" d="M1768.4,801l-298.1,8.8l-357.5-121.3l-11.3,37.5c0,0-79.3-20-141.5,10s-107.3,28.8-107.3,28.8l-6.3-28.8
          c0,0-45,3.8-78.8,7.5S634,729.8,595.3,729.8s-165-10-191.3-33.8s-20-68.8-20-68.8l-80-140c0,0,26.3-31.3,48.8-41.3s45-10,45-10
          l25,21.3l-7.5,22.5c0,0,38.8,43.8,51.3,57.5s22.5,40,95,42.5s140,11.3,195,22.5s115-40,115-40L859,321l195-10l12.5,175
          c0,0,32.5-3.8,63.8,12.5s45,22.5,63.8,22.5s560-29.4,560-29.4L1768.4,801z"/>
        <path v-for="path in paths"
              v-on:mousemove="path.className == 'street' ? onStreetMouseOver(path, $event) : onPathMouseOver"
              :class="{selected: path.className == 'street' && tooltipText == path.name, [path.className]: true}"
              :d="path.d"
        />
        <line v-for="line in lines"
              v-on:mousemove="line.className == 'street' ? onStreetMouseOver(line, $event) : onPathMouseOver"
              :class="{selected: line.className == 'street' && tooltipText == line.name, [line.className]: true}"
              :x1="line.x1"
              :y1="line.y1"
              :x2="line.x2"
              :y2="line.y2"
        />
        <path v-on:mousemove="onPathMouseOver" class="path" d="M308.1,494.4c0,0,3.4-5.9,67.1,21.6s75,85,153.8,95s89.7,19.7,95.9,32.2"/>
        <path v-on:mousemove="onPlaceMouseOver('Pine Lake', $event)" class="lake" d="M365.3,536.5c23.1,2.3,38.8-5.7,50,18.1c11.3,23.8,65.8,65.1,105.8,66.2c40,1.1,97,8.8,77,42.5
          s-34,2.1-59,14.9c-25,12.8-77,24.52-105-14.9S397,588,383,574S345.5,534.6,365.3,536.5z"/>
          <rect v-on:mousemove="onPlaceMouseOver('Main Parking', $event)" class="parking" x="1082.6" y="580.3" transform="matrix(0.9613 0.2756 -0.2756 0.9613 208.719 -289.2393)" width="102" height="35.6"/>
        
          <rect v-on:mousemove="onPlaceMouseOver('Small Parking Lot', $event)" class="parking" x="1386.1" y="691.6" transform="matrix(0.9487 0.3162 -0.3162 0.9487 293.0439 -407.6565)" width="33" height="15"/>
        <g class="clubhouse-icon">
          <path v-on:mousemove="onPlaceMouseOver('Trocadero Clubhouse', $event)" class="clubhouse" d="M1525.5,607.9c0,10.6-15.2,34.2-21.5,43.6c-1.3,2-4.2,2-5.6,0c-6.4-9.5-21.5-33-21.5-43.6
          c0-13.4,10.9-24.3,24.3-24.3C1514.6,583.6,1525.5,594.5,1525.5,607.9z"/>
          <g class="icon">
            <path d="M1506.7,587.1c-0.4-0.8-1.1-1.2-2-1.1c-1,0.1-2.2,0.9-2.3,2.4c-0.3,2.4,2.1,4.4,2.2,4.5s0.2,0.1,0.4,0.1h0.1
              c0.1,0,3.1-0.4,4.4-2.5c0.8-1.3,0.4-2.7-0.5-3.3C1508.3,586.7,1507.4,586.6,1506.7,587.1z M1508.5,590c-0.8,1.4-2.7,1.8-3.3,1.9
              c-0.5-0.5-1.8-1.9-1.6-3.5c0.1-1,0.8-1.5,1.3-1.5h0.1c0.5,0,0.9,0.4,1,1c0.1,0.2,0.2,0.3,0.4,0.4c0.2,0.1,0.4,0,0.5-0.1
              c0.5-0.5,1.1-0.5,1.5-0.2C1508.7,588.4,1509,589.2,1508.5,590z"/>
            <path d="M1517,607.8c-0.6-0.8-2-1.3-3.3-0.6c-2.2,1.1-2.6,4.2-2.6,4.3c0,0.2,0,0.3,0.1,0.4c0.1,0.1,1.9,2.3,4.2,2.3
              c0.1,0,0.2,0,0.2,0c1.5-0.1,2.4-1.2,2.5-2.2c0.1-0.8-0.3-1.5-1-2C1517.5,609.3,1517.5,608.5,1517,607.8z M1517.2,611.9
              c-0.1,0.6-0.6,1.2-1.5,1.3c-1.6,0.1-3-1.3-3.5-1.8c0.2-0.7,0.6-2.5,2.1-3.3c0.9-0.5,1.6-0.2,2,0.3c0.3,0.5,0.3,1-0.3,1.5
              c-0.2,0.2-0.2,0.3-0.2,0.5c0,0.2,0.2,0.3,0.4,0.4C1516.9,610.9,1517.2,611.4,1517.2,611.9z"/>
            <path d="M1523.7,601.9c0.5-0.9,0.5-1.9-0.1-2.7c-0.7-1-2.3-1.5-3.8-0.7c-2.6,1.3-3.1,4.9-3.1,5s0,0.3,0.1,0.4
              c0.1,0.1,2.3,2.7,5,2.7c0.1,0,0.2,0,0.3,0c1.8-0.1,2.8-1.3,2.9-2.5C1525.1,603.2,1524.5,602.4,1523.7,601.9z M1523.9,604.1
              c-0.1,0.7-0.7,1.5-2,1.6c-2,0.1-3.8-1.6-4.3-2.2c0.2-0.7,0.8-3.1,2.5-4.1c1.1-0.6,2.1-0.2,2.5,0.4c0.4,0.6,0.3,1.3-0.3,1.9
              c-0.2,0.2-0.2,0.3-0.2,0.5s0.2,0.3,0.4,0.4C1523.6,602.8,1524,603.4,1523.9,604.1z"/>
            <path d="M1492.9,625.2c0.4,0,0.8-0.2,1.1-0.5l11-11c1.1-1.1,3.1-4,3.8-6.5c0.9-2.9,2.3-5.4,4.2-7.3l1-1
              c0.2,0.1,0.4,0.1,0.6,0.1c0.4,0,0.8-0.2,1.1-0.5c0.6-0.6,0.6-1.5,0-2.1l-2.9-2.9c-0.6-0.6-1.5-0.6-2.1,0
              c-0.5,0.5-0.6,1.2-0.3,1.8l-0.9,0.9c-1,1-2.1,1.9-3.4,2.5c-0.1,0-0.2,0.1-0.2,0.1c-1.2,0.6-2.4,1.1-3.8,1.5
              c-2.4,0.6-5.4,2.5-6.6,3.8l-11.1,11c-0.6,0.7-0.6,1.7,0.1,2.4l7.2,7.2C1492,625,1492.5,625.2,1492.9,625.2z M1511.4,594.2
              c0.1-0.1,0.2-0.2,0.3-0.2s0.3,0.1,0.3,0.2l2.9,2.9c0.2,0.2,0.2,0.5,0,0.7s-0.5,0.2-0.7,0l-2.9-2.9
              C1511.2,594.6,1511.2,594.3,1511.4,594.2z M1510.3,596.8l0.8-0.8l2.2,2.2l-0.9,0.9c-1,1-1.8,2.1-2.5,3.3l-3.9,0.8l0.8-3.7
              C1508.1,598.8,1509.2,597.9,1510.3,596.8z M1485.1,615.8l11.1-11c1-1,3.9-2.9,6.2-3.6c1.1-0.3,2.2-0.7,3.1-1.1l-0.8,3.7
              c-0.1,0.2,0,0.4,0.2,0.5c0.1,0.1,0.2,0.2,0.4,0.2c0.1,0,0.1,0,0.1,0l3.8-0.8c-0.5,1-0.9,2.1-1.3,3.3c-0.7,2.3-2.5,5.1-3.6,6.1
              l-11.1,11c-0.2,0.2-0.6,0.2-0.9-0.1l-7.2-7.2C1484.9,616.5,1484.9,616.1,1485.1,615.8z"/>
            <path d="M1493.6,620.9c0.2,0,0.3-0.1,0.4-0.2l8-8c0.2-0.2,0.2-0.5,0-0.7c-0.2-0.2-0.5-0.2-0.7,0l-8,8
              c-0.2,0.2-0.2,0.5,0,0.7C1493.3,620.9,1493.5,620.9,1493.6,620.9z"/>
            <path d="M1524.2,584c-0.8-0.8-2.1-0.7-2.7-0.1l-2.1,2.1c-0.1,0.1-0.2,0.2-0.2,0.4c0,1.1,0.7,3.1,3.5,3.5h0.1
              c0.2,0,0.3-0.1,0.4-0.2l2.1-2.1c0.3-0.3,0.5-0.8,0.6-1.2c0.1-0.5-0.2-1-0.5-1.4L1524.2,584z M1524.7,586.4c0,0.2-0.1,0.5-0.3,0.6
              l-1.9,1.9c-1.9-0.4-2.2-1.7-2.3-2.3l1.9-1.9c0.2-0.2,0.9-0.3,1.3,0.1l1,1C1524.7,586,1524.7,586.2,1524.7,586.4z"/>
            <path d="M1518.5,589.9l-3,3c-0.2,0.2-0.2,0.5,0,0.7c0.1,0.1,0.3,0.2,0.4,0.2s0.3-0.1,0.4-0.2l3-3
              c0.2-0.2,0.2-0.5,0-0.7C1519,589.7,1518.7,589.7,1518.5,589.9z"/>
            <path d="M1516.2,587.1c-0.3-0.1-0.6,0-0.7,0.3l-1.9,3.8c-0.1,0.3,0,0.6,0.3,0.7c0.1,0.1,0.2,0.1,0.2,0.1
              c0.2,0,0.4-0.1,0.5-0.3l1.9-3.8C1516.6,587.5,1516.5,587.2,1516.2,587.1z"/>
            <path d="M1517.2,595c0.1,0.2,0.3,0.4,0.5,0.4c0.1,0,0.1,0,0.2-0.1l4-1.3c0.3-0.1,0.4-0.4,0.3-0.7
              c-0.1-0.3-0.4-0.4-0.7-0.3l-4,1.3C1517.3,594.4,1517.2,594.7,1517.2,595z"/>
          </g>
        </g>
      </svg>
    </a>
  </div>

</template>

<script>
import _ from "lodash"
import "./stern-grove-map.less"
import tooltip from "./ui/tooltip.vue"

const lines = [
  {name: '20th St', className: "street", x1: 1641, y1: 54, x2: 1666.1, y2: 490.1},
  {name: '21st St', className: "street", x1: 1541, y1: 60, x2: 1566, y2: 495.1},
  {name: '22nd St', className: "street", x1: 1441, y1: 66, x2: 1466, y2: 500.6},
  {name: '23rd St', className: "street", x1: 1343, y1: 73, x2: 1365.5, y2: 505.2},
  {name: '24th St', className: "street", x1: 1241, y1: 78, x2: 1267, y2: 511.7},
  {name: '26th St', className: "street", x1: 1044, y1: 89, x2: 1073, y2: 481.9},
  {name: '27th St', className: "street", x1: 942.3, y1: 93, x2: 955, y2: 311.9},
  {name: '28th St', className: "street", x1: 843, y1: 98, x2: 862, y2: 459},
  {name: '29th St', className: "street", x1: 742, y1: 105, x2: 755.2, y2: 324},
  {name: '32nd St', className: "street", x1: 443, y1: 123, x2: 454.9, y2: 341.3},
  {name: '33rd St', className: "street", x1: 342, y1: 123, x2: 362.3, y2: 435.9},
  {name: '34th St', className: "street", x1: 243, y1: 134, x2: 280, y2: 878},
  {name: '35th St', className: "street", x1: 143, y1: 139, x2: 185, y2: 889},
  {name: 'Escondido Ave', className: "street", x1: 276.8, y1: 814.1, x2: 531, y2: 800},
  {name: '123', className: "street", x1: 1325.4, y1: 800, x2: 1325.4, y2: 825.9},
  {name: 'Gabilan Way', className: "street", x1: 1186.2, y1: 753.3, x2: 1191.1, y2: 832.7},
  {name: 'Paraiso Pl', className: "street", x1: 1109, y1: 731, x2: 1113.1, y2: 836.7},
  {name: 'Goleta Ave', className: "street", x1: 1021.4, y1: 725.3, x2: 1021.4, y2: 841.5},
  {name: 'Palos Pl', className: "street", x1: 862, y1: 769.9, x2: 866.1, y2: 849.9},
  {name: 'El Miraso Pl', className: "street", x1: 765, y1: 780, x2: 770, y2: 855.2},
  {name: '20th Ave', className: "street", x1: 1684, y1: 809.9, x2: 1693, y2: 975},
  {name: '21st Ave', className: "street", x1: 1603, y1: 813, x2: 1608, y2: 975},
  {name: '22nd Ave', className: "street", x1: 1517.2, y1: 817.6, x2: 1523, y2: 981},
  {name: '23rd Ave', className: "street", x1: 1395, y1: 986, x2: 1387, y2: 823.1},
  {name: '24th Ave', className: "street", x1: 1303.9, y1: 827, x2: 1311, y2: 986},
  {name: '25th Ave', className: "street", x1: 1221.1, y1: 831.1, x2: 1231, y2: 986},
  {name: '26th Ave', className: "street", x1: 1141, y1: 836.7, x2: 1148, y2: 986},
  {name: 'Inverness Dr', className: "street", x1: 1058.5, y1: 836.7, x2: 1065, y2: 981},
  {name: 'Forest View Dr', className: "street", x1: 978, y1: 843.9, x2: 983, y2: 965},
  {name: 'Meadowbrook Dr', className: "street", x1: 892, y1: 848.5, x2: 901.4, y2: 986},
  {name: 'Sylvan Dr', className: "street", x1: 810, y1: 853, x2: 818, y2: 975},
  {name: 'Middlefield Dr', className: "street", x1: 730, y1: 857.5, x2: 735, y2: 975},
  {name: 'Riverton Dr', className: "street", x1: 647, y1: 862.1, x2: 655.2, y2: 965},
  {name: 'Springfield Dr', className: "street", x1: 564, y1: 866.8, x2: 572, y2: 975},
  {name: 'Everglade Dr', className: "street", x1: 484, y1: 871.4, x2: 491, y2: 981},
  {name: 'Havenside Dr', className: "street", x1: 404.3, y1: 875.9, x2: 411, y2: 986},
  {name: 'Clearfield Dr', className: "street", x1: 261.5, y1: 884.2, x2: 257, y2: 997},
  {name: 'Vicente St', className: "street", x1: 1849.5, y1: 261.1, x2: 153.1, y2: 358.6},
  {name: '19th Ave', className: "street", x1: 1741.5, y1: 0, x2: 1795.3, y2: 1009.8},
  {class: "path", x1: 1753, y1: 497.6, x2: 1741.5, y2: 514.8},
  {class: "path", x1: 1734, y1: 529.8, x2: 1716.8, y2: 523.6},
]

const paths = [
  {name: 'Easement', className: "street", d: "M228,738.2l6,87.8c0,0-2,16-24,16s-27.6,0-27.6,0"},
  {name: 'Constanso Way', className: "street", d: "M544,760c0,0-1,20.1-20,54.1c-19,33.9-20.9,56.2-20.9,56.2"},
  {name: 'Yorba St', className: "street", d: "M143,793c0,0,29-10,60-40s57.5-9,94.8-15s73.3-32,73.3-32"},
  {name: 'Crestlake Dr', className: "street", d: "M286.6,510.7c0,0-4.1,8.3,11.1,32.3s37.3,39.7,44.3,87.4c7,47.6,13,71.6,49,87.6s84,46,140,42s100,0,146,11 s95,12,134,5s94.5-5.4,131.3-26.5C979.2,728.4,1039,715,1109,731s280.9,91.8,280.9,91.8"},
  {name: '25th St', className: "street", d: "M1141,83l21,353c0,0-3,16,20,14s23-2,23-2"},
  {name: 'Wawona St', className: "street", d: "M129.1,554.7c34.5-17.6,97.5-41.9,118.5-44c21-2.1,39,0,39,0s9-32.1,43.5-57.6s69-24,69-24s47.9,34.5,62.2,57 S499.1,551,612,547s140,52.8,207,13.4S841,536,929,513s127-38,177-28s54,35,111,30s550.3-30.1,550.3-30.1"},
  {name: 'Vale Ave', className: "street", d: "M1099,594c0,0-32,25-50,62s-75,34-94,59s-11,42-11,42l4,85"},
  {name: '30th St', className: "street", d: "M643,111l12,218.8c0,0,3,22.2-12,42.2s-18.1,57.1-18.1,57.1l7,117.8"},
  {name: '31st St', className: "street", d: "M544,117l11,218.5l9-0.5c0,0-14,45-15,71s-5,63-5,63"},
  {name: 'Escolta Way', className: "street", d: "M627.3,469H554c0,0-18,4-38.2-18C491,424,495,419,455,423s-50.7,9.9-50.7,9.9"},
  {name: 'Lakeshore Plaza', className: "street", d: "M18.1,898.6c0,0,1610-96.6,1766.5-88.8"},
  {className: "path", d: "M308.1,494.4c0,0,3.4-5.9,67.1,21.6s75,85,153.8,95s89.7,19.7,95.9,32.2"},
  {className: "path", d: "M1094,593.5c0,0-53.8-37.5-118.8,18.8s-93.8,86.3-170,92.5s-88.8-12.5-117.5-11.3s-58.8,3.8-72.5-22"},
  {className: "path", d: "M1473.6,671.7c0,0-7.1-3.2-14.6,9.3s-16.3,6.3-5-11.3s0-18.8,0-18.8s-41.3-11.3-70-26.3s-70-13.8-83.8-11"},
  {className: "path", d: "M1566.5,504.9c0,0-7.5,27.4,7.5,38.6s41.5,12.2,41.5,12.2"},
  {className: "path", d: "M1752,777.3c0,0-34.3-33.8-71.8-30s-67.5-42.5-101.3-31.3s-78.8,0-85-28.4c-6.3-28.4,22.5-37.8,35-46"},
  {className: "path", d: "M1627.8,554.7c0,0,7.5,77.6,52.5,86.3s71.3,16.9,68.8,46.6c-2.5,29.7-17.9,96.3,35.6,122.2"},
  {className: "path", d: "M1703.7,529.8c0,0,10.5,15.2,30.3,0c19.8-15.2,3.8-25-8.8-15s-13.6,20.8-13.6,20.8"},
  {className: "path", d: "M1493.1,648.5c0,0-10.3-1.4-20.4,12.5s20.4,17.2,20.4,17.2"},
  {className: "path", d: "M1493.1,641c0,0-15.7-9.7-22.4-3.6c-6.7,6.1-16.7,13.6-16.7,13.6"},
]

let component = {
  mounted() {
  },
  data() {
    return {
      lines,
      paths,
      tooltipTop: null,
      tooltipLeft: null,
      tooltipText: null,
      debouncedRemoveTooltip: null,
    }
  },
  methods: {
    onMouseMove: function(e) {
      this.tooltipLeft = e.pageX
      this.tooltipTop = e.pageY
    },
    onMouseOut: function(e) {
      _.debounce(this.removeTooltip, 1500)()
    },
    removeTooltip: function() {
      this.tooltipText = null;
    },
    onStreetMouseOver: function(path, e) {
      this.tooltipLeft = e.pageX
      this.tooltipTop = e.pageY
      this.tooltipText = path.name
      if (this.debouncedRemoveTooltip) this.debouncedRemoveTooltip.cancel()
    },
    onPathMouseOver: function() {},
    onPlaceMouseOver: function(name, e) {
      this.tooltipLeft = e.pageX
      this.tooltipTop = e.pageY
      this.tooltipText = name
      if (this.debouncedRemoveTooltip) this.debouncedRemoveTooltip.cancel()
    },
  },
  components: {
    tooltip,
  }
}


export default component
</script>
