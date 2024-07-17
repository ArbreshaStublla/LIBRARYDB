<template>
    <div class="loans-container">
      <h2>Loans</h2>
      
      <!-- Form for adding or editing a loan -->
      <form v-if="!editingLoan" @submit.prevent="addLoan">
        <h3>Add Loan</h3>
        <label for="bookId">Book ID:</label>
        <input type="number" id="bookId" v-model="newLoan.book_id" required>
        
        <label for="userId">User ID:</label>
        <input type="number" id="userId" v-model="newLoan.user_id" required>
        
        <label for="loanDate">Loan Date:</label>
        <input type="date" id="loanDate" v-model="newLoan.loan_date" required>
        
        <label for="returnDate">Return Date:</label>
        <input type="date" id="returnDate" v-model="newLoan.return_date">
        
        <button type="submit">Add Loan</button>
      </form>
      <form v-else @submit.prevent="updateLoan">
        <h3>Edit Loan</h3>
        <label for="editBookId">Book ID:</label>
        <input type="number" id="editBookId" v-model="editedLoan.book_id" required>
        
        <label for="editUserId">User ID:</label>
        <input type="number" id="editUserId" v-model="editedLoan.user_id" required>
        
        <label for="editLoanDate">Loan Date:</label>
        <input type="date" id="editLoanDate" v-model="editedLoan.loan_date" required>
        
        <label for="editReturnDate">Return Date:</label>
        <input type="date" id="editReturnDate" v-model="editedLoan.return_date">
        
        <button type="submit">Update Loan</button>
        <button type="button" @click="cancelEdit">Cancel</button>
      </form>
  
      <ul>
        <li v-for="loan in loans" :key="loan.loan_id" class="loan-item">
          <h3>Loan ID: {{ loan.loan_id }}</h3>
          <p><strong>Book ID:</strong> {{ loan.book_id }}</p>
          <p><strong>User ID:</strong> {{ loan.user_id }}</p>
          <p><strong>Loan Date:</strong> {{ loan.loan_date }}</p>
          <p v-if="loan.return_date"><strong>Return Date:</strong> {{ loan.return_date }}</p>
          <button @click="editLoan(loan)">Edit</button>
          <button @click="deleteLoan(loan.loan_id)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        loans: [],
        newLoan: {
          book_id: '',
          user_id: '',
          loan_date: '',
          return_date: ''
        },
        editingLoan: null,
        editedLoan: {
          loan_id: null,
          book_id: '',
          user_id: '',
          loan_date: '',
          return_date: ''
        }
      };
    },
    created() {
      this.fetchLoans();
    },
    methods: {
      async fetchLoans() {
        try {
          const response = await fetch('http://localhost:3000/loans'); // Replace with your API endpoint
          this.loans = await response.json();
        } catch (error) {
          console.error('Error fetching loans:', error);
        }
      },
      async addLoan() {
        try {
          const response = await fetch('http://localhost:3000/loans', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              book_id: this.newLoan.book_id,
              user_id: this.newLoan.user_id,
              loan_date: this.newLoan.loan_date,
              return_date: this.newLoan.return_date
            })
          });
  
          if (response.ok) {
            const result = await response.json();
            this.loans.push({
              loan_id: result.loan_id,
              book_id: result.book_id,
              user_id: result.user_id,
              loan_date: result.loan_date,
              return_date: result.return_date
            });
            this.newLoan.book_id = '';
            this.newLoan.user_id = '';
            this.newLoan.loan_date = '';
            this.newLoan.return_date = '';
            console.log('Loan added successfully');
          } else {
            console.error('Failed to add loan');
          }
        } catch (error) {
          console.error('Error adding loan:', error);
        }
      },
      async editLoan(loan) {
        this.editingLoan = loan.loan_id;
        this.editedLoan.loan_id = loan.loan_id;
        this.editedLoan.book_id = loan.book_id;
        this.editedLoan.user_id = loan.user_id;
        this.editedLoan.loan_date = loan.loan_date;
        this.editedLoan.return_date = loan.return_date;
      },
      async updateLoan() {
        try {
          const response = await fetch(`http://localhost:3000/loans/${this.editedLoan.loan_id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              book_id: this.editedLoan.book_id,
              user_id: this.editedLoan.user_id,
              loan_date: this.editedLoan.loan_date,
              return_date: this.editedLoan.return_date
            })
          });
  
          if (response.ok) {
            const updatedLoan = {
              loan_id: this.editedLoan.loan_id,
              book_id: this.editedLoan.book_id,
              user_id: this.editedLoan.user_id,
              loan_date: this.editedLoan.loan_date,
              return_date: this.editedLoan.return_date
            };
            const index = this.loans.findIndex(loan => loan.loan_id === updatedLoan.loan_id);
            if (index !== -1) {
              this.loans.splice(index, 1, updatedLoan);
            }
            this.cancelEdit();
            console.log('Loan updated successfully');
          } else {
            console.error('Failed to update loan');
          }
        } catch (error) {
          console.error('Error updating loan:', error);
        }
      },
      async deleteLoan(loanId) {
        try {
          const response = await fetch(`http://localhost:3000/loans/${loanId}`, {
            method: 'DELETE'
          });
          if (response.ok) {
            // Remove the deleted loan from the UI
            this.loans = this.loans.filter(loan => loan.loan_id !== loanId);
            console.log('Loan deleted successfully');
          } else {
            console.error('Failed to delete loan');
          }
        } catch (error) {
          console.error('Error deleting loan:', error);
        }
      },
      cancelEdit() {
        this.editingLoan = null;
        this.editedLoan.loan_id = null;
        this.editedLoan.book_id = '';
        this.editedLoan.user_id = '';
        this.editedLoan.loan_date = '';
        this.editedLoan.return_date = '';
      }
    }
  };
  </script>
  
  <style>
  .loans-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .loan-item {
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
  }
  
  .loan-item h3 {
    margin: 0;
    font-size: 1.2rem;
  }
  
  .loan-item p {
    margin-top: 5px;
    color: #666;
  }
  
  .loan-item button {
    margin-top: 10px;
    padding: 5px 10px;
    margin-right: 5px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
  
  .loan-item button:hover {
    background-color: #0056b3;
  }
  
  .loan-item button:focus {
    outline: none;
  }
  
  form {
    margin-bottom: 20px;
  }
  
  form h3 {
    margin-top: 0;
  }
  
  form label {
    display: block;
    margin-bottom: 5px;
  }
  
  form input[type="number"],
  form input[type="date"] {
    width: 100%;
    padding: 8px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 3px;
    margin-bottom: 10px;
  }
  
  form button[type="submit"],
  form button[type="button"] {
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
  
  form button[type="submit"]:hover,
  form button[type="button"]:hover {
    background-color: #0056b3;
  }
  
  form button[type="submit"]:focus,
  form button[type="button"]:focus {
    outline: none;
  }
  </style>
  