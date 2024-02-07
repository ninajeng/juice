<script>
import Swal from 'sweetalert2/dist/sweetalert2';

export default {
  methods: {
    show(product) {
      const swalButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-danger m-1',
          cancelButton: 'btn btn-secondary m-1',
        },
        buttonsStyling: false,
      });

      swalButtons.fire({
        title: `刪除 "${product.title}" 產品?`,
        text: '刪除後將無法恢復',
        icon: 'warning',
        confirmButtonText: '刪除',
        showCancelButton: true,
        cancelButtonText: '取消',
      }).then((result) => {
        if (result.isConfirmed) {
          this.$emit('deleteProduct', product.id);
        }
      });
    },
  },
};
</script>

<!-- <script setup>
import Swal from 'sweetalert2/dist/sweetalert2';

function show(product) {  //'show' is declared but its value is never read.
  const swalButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-danger m-1',
      cancelButton: 'btn btn-secondary m-1',
    },
    buttonsStyling: false,
  });

  swalButtons.fire({
    title: `刪除 "${product.title}" 產品?`,
    text: '刪除後將無法恢復',
    icon: 'warning',
    confirmButtonText: '刪除',
    showCancelButton: true,
    cancelButtonText: '取消',
  }).then((result) => {
    if (result.isConfirmed) {
      this.$emit('deleteProduct', product.id);
    }
  });
}
</script> -->

<template></template>
