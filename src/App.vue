<template>
  <div id="app">
    <mu-container class="button-wrapper" :fluid="fluid">
        <mu-row>
            <mu-appbar style="width: 100%;" color="primary">
                <mu-button icon slot="left" @click="open = !open">
                    <mu-icon value="menu"></mu-icon>
                </mu-button>
                Title
                <mu-menu slot="right">
                    <mu-button flat>MENU</mu-button>
                    <mu-list slot="content">
                        <mu-list-item button>
                            <mu-list-item-content>
                                <mu-list-item-title>Menu Item 1</mu-list-item-title>
                            </mu-list-item-content>
                        </mu-list-item>
                        <mu-list-item button>
                            <mu-list-item-content>
                                <mu-list-item-title>Menu Item 2</mu-list-item-title>
                            </mu-list-item-content>
                        </mu-list-item>
                    </mu-list>
                </mu-menu>
            </mu-appbar>
        </mu-row>

        <mu-row>
            <mu-carousel @change="change" interval="3000">
                <mu-carousel-item>
                    <img :src="carouselImg1">
                </mu-carousel-item>
                <mu-carousel-item>
                    <img :src="carouselImg2">
                </mu-carousel-item>
                <mu-carousel-item>
                    <img :src="carouselImg4">
                </mu-carousel-item>
            </mu-carousel>
        </mu-row>
        <mu-row>
            <mu-chip class="demo-chip">
                default chip
            </mu-chip>

        </mu-row>
    </mu-container>
    <mu-drawer :open.sync="open" :docked="docked" :right="position === 'right'">
          <mu-list>
              <mu-list-item button>
                  <mu-list-item-title>Menu Item 1</mu-list-item-title>
              </mu-list-item>
              <mu-list-item button>
                  <mu-list-item-title>Menu Item 2</mu-list-item-title>
              </mu-list-item>
              <mu-list-item  @click="open = false" button>
                  <mu-list-item-title>Close</mu-list-item-title>
              </mu-list-item>
          </mu-list>
      </mu-drawer>
  </div>
</template>

<script>
    import carouselImg2 from './assets/images/carousel2.jpg';
    import carouselImg1 from './assets/images/carousel1.jpg';
    import carouselImg4 from './assets/images/carousel4.jpg';

export default {
  name: 'app',
  data () {
    return {
        docked: false,
        open: false,
        position: 'left',
        fluid:true,
        carouselImg1,
        carouselImg2,
        carouselImg4
    }
  },
  methods:{
      change(){

          console.log('a');
      }

  },
  computed:{

  }
}
</script>

<style scoped>
    img{

        height: 200px;

    }
</style>
