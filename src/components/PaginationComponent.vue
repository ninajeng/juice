<script>
export default {
  props: ['pagination'],
};
</script>

<template>
  <nav v-if="pagination.total_pages > 1">
    <ul class="pagination justify-content-center">
        <li class="page-item">
            <a class="page-link"
            href="#"
            :class="{'disabled': !pagination.has_pre}"
            @click.prevent="$emit('setPage', pagination.current_page - 1)">
            <span>&laquo;</span>
            </a>
        </li>
        <li class="page-item" v-for="(page, key) in pagination.total_pages" :key="'page' + key">
            <a class="page-link"
            href="#"
            :class="{'active': pagination.current_page === page}"
            @click.prevent="$emit('setPage', page)">{{ page }}</a>
        </li>
        <li class="page-item">
            <a class="page-link"
            href="#" :class="{'disabled': !pagination.has_next}"
            @click.prevent="$emit('setPage', pagination.current_page + 1)">
            <span>&raquo;</span>
            </a>
        </li>
    </ul>
  </nav>
</template>
