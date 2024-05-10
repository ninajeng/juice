<script>
import Swal from 'sweetalert2/dist/sweetalert2';

export default {
  methods: {
    async deleteConfirm(type, name, item) {
      const swalButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-danger m-1',
          cancelButton: 'btn m-1',
        },
        buttonsStyling: false,
      });
      const userRes = await swalButtons.fire({
        title: `刪除 "${item.title || item.name}" ${name}?`,
        text: '刪除後將無法恢復',
        icon: 'warning',
        confirmButtonText: '刪除',
        showCancelButton: true,
        cancelButtonText: '取消',
      });
      if (userRes.isConfirmed) {
        this[`delete${type}`](item.id);
      }
    },
  },
};
</script>
