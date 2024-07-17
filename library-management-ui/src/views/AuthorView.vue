<template>
  <div class="authors-container">
    <h2>Authors</h2>

    <!-- Button to trigger the modal -->
    <div class="buttonn-container">
      <!-- Button to trigger the modal -->
      <button type="button" class="button-23" @click="showModal = true">
        Add Author
      </button>
    </div>

    <!-- Modal for adding a new author -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h3>Add New Author</h3>
        <form @submit.prevent="addAuthor" class="author-form">
          <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="newAuthor.name" class="form-control" required>
          </div>

          <div class="form-group">
            <label for="biography">Biography:</label>
            <textarea id="biography" v-model="newAuthor.biography" class="form-control" rows="4" required></textarea>
          </div>

          <div class="form-actions">
            <button type="submit" class="button-23">Add Author</button>
            <button type="button" class="button-23" @click="closeModal">Cancel</button>
          </div>
        </form>
      </div>
    </div>

    <!-- List of authors -->
    <ul class="author-list">
      <li v-for="author in authors" :key="author.author_id" class="author-item">
        <div class="author-info">
          <template v-if="author.editMode">
            <div class="form-group">
              <label for="edit-name">Name:</label>
              <input type="text" id="edit-name" v-model="author.name" class="form-control">
            </div>
            <div class="form-group">
              <label for="edit-biography">Biography:</label>
              <textarea id="edit-biography" v-model="author.biography" class="form-control" rows="4"></textarea>
            </div>
            <button @click="saveAuthor(author)" class="button-23">
              <i class="fas fa-check"></i>
            </button>
            <button @click="cancelEdit(author)" class="button-23">
              <i class="fas fa-times"></i>
            </button>
          </template>
          <template v-else>
            <strong>{{ author.name }}</strong>
            <p class="author-biography">{{ author.biography }}</p>
            <button @click="editAuthor(author)" class="button-23">
              <i class="fas fa-edit"></i>
            </button>
            <button @click="deleteAuthor(author.author_id)" class="button-23">
              <i class="fas fa-trash"></i>
            </button>
          </template>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import apiClient from '../services/api';

export default {
  data() {
    return {
      authors: [],
      newAuthor: {
        name: '',
        biography: ''
      },
      showModal: false // New data property to control the modal visibility
    };
  },
  async created() {
    await this.fetchAuthors();
  },
  methods: {
    async fetchAuthors() {
      try {
        const response = await apiClient.get('/authors');
        this.authors = response.data.map(author => ({
          ...author,
          editMode: false // Initialize editMode property
        }));
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    },
    async addAuthor() {
      try {
        const response = await apiClient.post('/authors', this.newAuthor);
        console.log('New author added:', response.data);

        // Clear the form fields after successful addition
        this.newAuthor.name = '';
        this.newAuthor.biography = '';
        
        // Close the modal
        this.showModal = false;

        // Fetch authors again to update the list
        await this.fetchAuthors();
      } catch (error) {
        console.error('Error adding author:', error);
      }
    },
    editAuthor(author) {
      // Set editMode to true for the selected author
      author.editMode = true;
    },
    async saveAuthor(author) {
      try {
        const { name, biography } = author;
        const response = await apiClient.put(`/authors/${author.author_id}`, { name, biography });
        console.log('Author updated:', response.data);

        // Reset editMode to false after successful update
        author.editMode = false;

        // Fetch authors again to update the list
        await this.fetchAuthors();
      } catch (error) {
        console.error('Error updating author:', error);
      }
    },
    cancelEdit(author) {
      // Reset editMode to false to cancel editing
      author.editMode = false;
    },
    async deleteAuthor(authorId) {
      try {
        const response = await apiClient.delete(`/authors/${authorId}`);
        console.log('Author deleted:', response.data.message);

        // Fetch authors again to update the list
        await this.fetchAuthors();
      } catch (error) {
        console.error('Error deleting author:', error);
      }
    },
    closeModal() {
      // Reset newAuthor fields and hide the modal
      this.newAuthor.name = '';
      this.newAuthor.biography = '';
      this.showModal = false;
    }
  }
};
</script>

<style scoped>
.authors-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #dee2e6;
  border-radius: 5px;
}

.buttonn-container{
  margin-left: 855px;
}

.author-form {
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
  width: 100%;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
}

.button-23 {
  background-color: #FFFFFF;
  border: 1px solid #00008B;
  border-radius: 8px;
  box-sizing: border-box;
  color: #222222;
  cursor: pointer;
  display: inline-block;
  font-family: 'Circular', -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  margin: 0;
  outline: none;
  padding: 13px 23px;
  text-align: center;
  text-decoration: none;
  touch-action: manipulation;
  transition: box-shadow .2s, -ms-transform .1s, -webkit-transform .1s, transform .1s;
  user-select: none;
  -webkit-user-select: none;
  width: auto;
}

.button-23:focus-visible {
  box-shadow: #222222 0 0 0 2px, rgba(255, 255, 255, 0.8) 0 0 0 4px;
  transition: box-shadow .2s;
}

.button-23:active {
  background-color: #F7F7F7;
  border-color: #00008B;
  transform: scale(.96);
}

.button-disabled {
  border-color: #00008B;
  color: #DDDDDD;
  cursor: not-allowed;
  opacity: 1;
}

.author-list {
  list-style-type: none;
  padding: 0;
}

.author-item {
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 4px;
  margin-bottom: 10px;
  padding: 15px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
}

.author-info {
  grid-column: 1 / span 1;
}

.author-actions {
  grid-column: 2 / span 1;
  align-self: center;
  justify-self: end;
}

.author-biography {
  margin-top: 5px;
  color: #6c757d;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 500px;
}

.modal-content h3 {
  margin-top: 0;
}
</style>
