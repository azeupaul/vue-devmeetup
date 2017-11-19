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
      Edit Date
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit meetup date</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-date-picker v-model="editableDate" style="width: 100%" actions>
                <template slot-scope="{save, cancel}">
                  <v-btn
                    class="blue--text darken-1"
                    flat
                    @click="showDialog = false">
                    Close
                  </v-btn>
                  <v-btn flat @click="onSaveChanges">Save</v-btn>
                </template>
              </v-date-picker>
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
        editableDate: null
      }
    },
    methods: {
      onSaveChanges () {
        const newDate = new Date(this.meetup.date)
        const newDay = new Date(this.editableDate).getUTCDate()
        const newMonth = new Date(this.editableDate).getUTCMonth()
        const newYear = new Date(this.editableDate).getUTCFullYear()
        newDate.setUTCDate(newDay)
        newDate.setUTCMonth(newMonth)
        newDate.setUTCFullYear(newYear)
        console.log(newDate)
        this.$store.dispatch('updateMeetup', {
          id: this.meetup.id,
          date: newDate
        })
        this.showDialog = false
      }
    },
    created () {
      this.editableDate = new Date(this.meetup.date)
    }
  }
</script>
