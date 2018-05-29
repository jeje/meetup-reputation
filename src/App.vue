<template>
  <v-app>
    <!--
    <v-navigation-drawer app>
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">Hackathon Casino</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list dense class="pt-0">
        <v-list-tile>
          <v-list-tile-action><v-icon>dashboard</v-icon></v-list-tile-action>
          <v-list-tile-content>Dashboard</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action><v-icon>question_answer</v-icon></v-list-tile-action>
          <v-list-tile-content>About</v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-for="item in items" :key="item.title" @click="">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    -->
    <v-toolbar dark color="primary">
      <v-toolbar-title class="white--text"><i>Reputational</i> Meetups</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- {{ userByAddress(account).displayName }} -->
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view :key="$route.fullPath" />
      </v-container>
    </v-content>
    <v-footer app class="pa-3">
      <v-spacer/>
      <div>&copy; Talan {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style src='vuetify/dist/vuetify.min.css'>
</style>
<style src='material-design-icons-iconfont/dist/material-design-icons.css'>
</style>

<style scoped>
</style>
