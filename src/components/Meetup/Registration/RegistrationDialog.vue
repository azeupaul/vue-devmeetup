<template>
  <v-dialog
    persistent
    v-model="showDialog"
  >
    <v-btn
      color="primary"
      accent
      slot="activator"
    >
      {{ userIsRegistered ? 'Unregister' : 'Register'  }}
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title v-if="userIsRegistered">Unregister from meetup?</v-card-title>
            <v-card-title v-else>Register for meetup?</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              You can always change your decision later on.
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn
                class="red--text darken-1"
                flat
                @click="showDialog = false">
                Close
              </v-btn>
              <v-btn
                flat
                class="green--text darken-1"
                @click="onAgree">
                Confirm
              </v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['meetupId'],
    data () {
      return {
        showDialog: false
      }
    },
    computed: {
      userIsRegistered () {
        return this.$store.getters.user.registeredMeetups.findIndex((meetupId) => {
          return meetupId === this.meetupId
        }) >= 0
      }
    },
    methods: {
      onAgree () {
        if (this.userIsRegistered) {
          this.$store.dispatch('unregisterUserFromMeetup', {
            meetupId: this.meetupId
          })
        } else {
          this.$store.dispatch('registerUserForMeetup', {
            meetupId: this.meetupId
          })
        }
        this.showDialog = false
      }
    }
  }
</script>
