<template>
  <v-dialog
    persistent
    max-width="350px"
    v-model="showDialog"
  >
    <v-btn
      fab
      accent
      slot="activator"
    >
      <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit meetup</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                required
                v-model="title"
              ></v-text-field>
              <v-text-field
                name="description"
                label="Description"
                id="description"
                required
                multiLine
                v-model="description"
              ></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn flat class="blue--text darken-1" @click="showDialog = false">Close</v-btn>
              <v-btn flat class="blue--text darken-1" @click="onSaveChanges">Edit</v-btn>
            </v-card-actions>
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
        title: this.meetup.title,
        description: this.meetup.description
      }
    },
    methods: {
      onSaveChanges () {
        if (this.title.trim() === '' || this.description.trim() === '') {
          return
        }
        this.$store.dispatch('updateMeetup', {
          id: this.meetup.id,
          title: this.title,
          description: this.description
        })
        this.showDialog = false
      }
    }
  }
</script>
