<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large to="/meetups" class="info">Explore meetups</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large to="/meetup/create" class="info">Organize meetup</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2">
      <v-flex xs12>
        <v-carousel style="cursor: pointer">
          <v-carousel-item
            v-for="meetup in meetups"
            :src="meetup.imageUrl"
            :key="meetup.id"
            @click="onLoadMeetup(meetup.id)"
          >
            <div class="title">{{ meetup.title }} </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2">
      <v-flex xs12 class="text-xs-center">
        <p>Join our awesome meetups!</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    data () {
      return {
        meetups: [
          {
            id: 'meetup-new-york',
            title: 'Meetup in New York',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg'
          },
          {
            id: 'meetup-paris',
            title: 'Meetup in Paris',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/97/01_vue_Paris_depuis_Notre-Dame.jpg'
          }
        ]
      }
    },
    methods: {
      onLoadMeetup (id) {
        this.$router.push('/meetups/' + id)
      }
    }
  }
</script>
<style scoped>
  .title{
    position: absolute;
    bottom: 50px;
    background: rgba(0,0,0,0.5);
    color: white;
    padding: 20px;
    font-size: 2em;
  }
</style>
