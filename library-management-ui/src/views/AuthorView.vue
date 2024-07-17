<template>
    <div class="authors-container">
      <h2>Authors</h2>
  
      <!-- Form to add a new author -->
      <form @submit.prevent="addAuthor" class="author-form">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="newAuthor.name" class="form-control" required>
        </div>
  
        <div class="form-group">
          <label for="biography">Biography:</label>
          <textarea id="biography" v-model="newAuthor.biography" class="form-control" rows="4" required></textarea>
        </div>
  
        <button type="submit" class="btn btn-primary">Add Author</button>
      </form>
  
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
              <button @click="saveAuthor(author)" class="btn btn-success">
                <i class="fas fa-check"></i>
              </button>
              <button @click="cancelEdit(author)" class="btn btn-secondary">
                <i class="fas fa-times"></i>
              </button>
            </template>
            <template v-else>
              <strong>{{ author.name }}</strong>
              <p class="author-biography">{{ author.biography }}</p>
              <button @click="editAuthor(author)" class="btn btn-info">
                <i class="fas fa-edit"></i>
              </button>
              <button @click="deleteAuthor(author.author_id)" class="btn btn-danger">
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
        }
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
      }
    }
  };
  </script>
  
  <style scoped>
  .authors-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 5px;
  }
  
  .author-form {
    background-color: #fff;
    padding: 20px;
    border: 1px solid #ced4da;
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
  
  .btn {
    padding: 8px 20px;
    font-size: 1rem;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }
  
  .btn-primary {
    background-color: #007bff;
    color: #fff;
  }
  
  .btn-secondary {
    background-color: #6c757d;
    color: #fff;
    margin-right: 10px;
  }
  
  .btn-danger {
    background-color: #dc3545;
    color: #fff;
  }
  
  .btn-success {
    background-color: #28a745;
    color: #fff;
  }
  
  .btn-info {
    background-color: #17a2b8;
    color: #fff;
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
  </style>
  