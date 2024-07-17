<template>
  <v-app>
    <v-card>
      <v-layout>
        <!-- Vuetify Navigation Drawer -->
        <v-navigation-drawer
          expand-on-hover
          rail
          color="#E1DCC5" 
        >
        <v-list>
          <v-list-item
            prepend-avatar="https://static.vecteezy.com/system/resources/thumbnails/019/900/152/small_2x/old-book-watercolor-illustration-png.png " 
            title="LibraMax"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>


          <!-- Main Navigation Links -->
          <v-list dense nav>
            <v-list-item
              v-for="(link, index) in navLinks"
              :key="index"
              :to="link.to"
              link
            >
              <v-list-item-icon>
                <v-icon>{{ link.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ link.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>

        <!-- Main Content -->
        <v-main>
          <v-container>
            <!-- Top Toolbar -->
            <v-app-bar app color="#E1DCC5">
              <v-spacer></v-spacer>
              <div class="avatar" @click="toggleMenu" style="display: flex; align-items: center; cursor: pointer;">
                <img src="https://randomuser.me/api/portraits/women/85.jpg" alt="Avatar" style="width: 38px; height: 38px; border-radius: 50%;">
                <v-icon>mdi-menu-down</v-icon>
              </div>
              <v-divider v-show="showLine"></v-divider>
            </v-app-bar>

            <!-- Your existing navigation links -->
            <router-view/>
          </v-container>
        </v-main>
      </v-layout>
    </v-card>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      navLinks: [
        { title: 'Author', to: '/' },
        { title: 'Categories', to: '/categories' },
        { title: 'Books', to: '/books' },
        { title: 'Loan', to: '/loans' },
        { title: 'Publishers', to: '/publishers' },
        { title: 'Users', to: '/users' }
      ],
      showLine: false // Add this line
    };
  },
  methods: {
    toggleMenu() {
      // Toggle the visibility of the divider or any other menu action
      this.showLine = !this.showLine;
    }
  }
};
</script>

<style scoped>
* {
  font-family: 'cursive', cursive;
}

.custom-avatar {
  width: 100px; /* Adjust the size as needed */
  height: 100px; /* Adjust the size as needed */
}

.main {
  display: flex;
  align-items: center;
  height: 64px;
  justify-content: end;
  position: relative;
}
</style>
