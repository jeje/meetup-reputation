<template>
  <v-card>
    <v-card-title primary-title>
      <div>
        <h3 class="headline">Organizations</h3>
        <div>
          <li v-for="organization in organizations" :key="organization._id">
            {{ organization._id }} - {{ organization.name }}
          </li>
        </div>
        <v-btn fab dark color="indigo" @click="createOrganization()">
          <v-icon dark>add</v-icon>
        </v-btn>
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: 'Organizations',
  asyncComputed: {
    async organizations () {
      return this.$organizations.getOrganisations()
    }
    /*
    organizations: {
      get () {
        return this.$organizations.getOrganisations()
      },
      watch () {
        return this.timeOrgWasCreated
      }
    }
    */
  },
  methods: {
    createOrganization () {
      this.$organizations.createOrganization(Math.random(), 'sample organization')
        .then(() => {
          this.timeOrgWasCreated = new Date()
        })
    }
  }
}
</script>

<style scoped>
</style>
