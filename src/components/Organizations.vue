<template>
  <v-card>
    <v-card-title primary-title>
      <h3 class="headline">Organizations ({{ organizationsCount }})</h3>
    </v-card-title>
    <v-divider />
    <v-card-text>
      <v-list two-line>
        <template v-for="organization in organizations">
          <v-list-tile :key="organization.id" @click="">
            <v-list-tile-content>
              <v-list-tile-title v-html="organization.name"></v-list-tile-title>
              <v-list-tile-sub-title v-html="organization.description"></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
      <!-- <li v-for="organization in organizations" :key="organization.id"> -->
        <!-- {{ organization.id }} - {{ organization.name }} -->
      <!-- </li> -->
    </v-card-text>
    <v-card-actions>
      <v-btn flat color='orange' @click="refreshData()">Refresh</v-btn>
      <v-btn flat color='orange' @click="createOrganization()">Create new organization</v-btn>
      <v-btn flat color='red' @click="truncate()">Truncate Data</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'Organizations',
  data: () => {
    return {
      organizations: [],
      organizationsCount: 0
    }
  },
  mounted: async function () {
    let self = this
    setTimeout(function () {
      self.refreshData()
    }, 3000)
    // this.refreshData()
  },
  methods: {
    async createOrganization () {
      let orgHash = await this.$organizations.createOrganization(Math.random(), 'sample organization')
      console.log('Org hash', orgHash)
      this.refreshData()
    },
    async refreshData () {
      this.organizations = await this.$organizations.getOrganisations()
      this.organizationsCount = await this.$organizations.count()
    },
    async truncate () {
      await this.$organizations.truncate()
      this.refreshData()
    }
  }
}
</script>

<style scoped>
</style>
