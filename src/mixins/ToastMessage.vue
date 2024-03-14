<script>
import Swal from 'sweetalert2/dist/sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showCloseButton: true,
  showConfirmButton: false,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
  background: '#f5f5f5',
  customClass: {
    closeButton: 'link-gray',
  },
  buttonsStyling: false,
});

export default {
  methods: {
    toastShow(type, title, timer = 1500) {
      Toast.fire({
        title,
        icon: type,
        timer,
      });
    },
  },
};
</script>
