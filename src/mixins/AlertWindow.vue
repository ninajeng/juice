<script>
import Swal from 'sweetalert2/dist/sweetalert2';

const swalButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-primary',
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
    init(router) {
      this.$router = router;
    },
    show({ type, title, router = {} }) {
      this[`show${type}`](title, router);
    },
    showSuccess(title) {
      swalButtons.fire({
        title,
        confirmButtonText: '確認',
        icon: 'success',
        timer: 1500,
        timerProgressBar: true,
      });
    },
  },
};
</script>
