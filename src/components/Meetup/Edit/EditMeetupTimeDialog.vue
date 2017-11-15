<template>
  <v-dialog
    persistent
    max-width="350px"
    v-model="showDialog"
  >
    <v-btn
      accent
      slot="activator"
    >
      Edit Time
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit meetup time</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-time-picker
                v-model="editableTime"
                style="width: 100%"
                actions
                format="24hr">
                <template scope="{save, cancel}">
                  <v-btn
                    class="blue--text darken-1"
                    flat
                    @click="showDialog = false">
                    Close
                  </v-btn>
                  <v-btn flat @click="onSaveChanges">Save</v-btn>
                </template>
              </v-time-picker>
            </v-card-text>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['meetup'],
    data () {
      return {
        showDialog: false,
        editableTime: null
      }
    },
    methods: {
      onSaveChanges () {
        const newDate = new Date(this.meetup.date)
        const hours = this.editableTime.match(/^(\d+)/)[1]
        const minutes = this.editableTime.match(/:(\d+)/)[1]
        newDate.setHours(hours)
        newDate.setMinutes(minutes)
        this.$store.dispatch('updateMeetup', {
          id: this.meetup.id,
          date: newDate
        })
        this.showDialog = false
      }
    },
    created () {
      this.editableTime = new Date(this.meetup.date).toTimeString()
    }
  }
</script>
