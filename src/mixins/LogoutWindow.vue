<script>
import Swal from 'sweetalert2/dist/sweetalert2';

const swalConfirmAlert = Swal.mixin({
  icon: 'warning',
  confirmButtonText: '登出',
  showCancelButton: true,
  cancelButtonText: '取消',
  customClass: {
    confirmButton: 'btn btn-primary m-1',
    cancelButton: 'btn m-1',
    title: 'lh-base',
  },
  buttonsStyling: false,
});

export default {
  data() {
    return {
      $router: null,
    };
  },
  methods: {
    async showLogoutConfirm() {
      const userRes = await swalConfirmAlert.fire({
        title: '是否要登出系統?',
      });
      if (!userRes.isConfirmed) {
        return;
      }
      this.logout();
    },
  },
};
</script>
