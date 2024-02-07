<script>
import Swal from 'sweetalert2/dist/sweetalert2';

export default {
  methods: {
    showSuccessAlert(title) {
      Swal.fire({
        title,
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      });
    },
    showErrorAlert(title, method, path) {
      this.isLoading = false;
      Swal.fire({
        icon: 'error',
        title,
        confirmButtonText: '確認',
        timer: 2000,
        timerProgressBar: true,
      }).then(() => {
        if (method && path) {
          this.$router[method](path);
        }
      });
    },
  },
};
</script>

<!-- <script setup>
import Swal from 'sweetalert2/dist/sweetalert2';
// methods
function showSuccessAlert(title) { // 'showSuccessAlert' is declared but its value is never read.
  Swal.fire({
    title,
    icon: 'success',
    showConfirmButton: false,
    timer: 1500,
  });
}
function showErrorAlert(title, method, path) { // 'showErrorAlert' is declared but its value is never read.
  this.isLoading = false;
  Swal.fire({
    icon: 'error',
    title,
    confirmButtonText: '確認',
    timer: 2000,
    timerProgressBar: true,
  }).then(() => {
    if (method && path) {
      this.$router[method](path);
    }
  });
}
</script> -->

<template></template>  <!-- The template requires child element. -->
