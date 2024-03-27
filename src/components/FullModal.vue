<template>

<BModal v-model="isOpen" :fullscreen="true" :hideFooter="true" :hideHeader="hideHeader">
  <div
          class="modal-body d-flex justify-content-center align-self-center"
          style="width: 100%"
          :style="width !== null ? 'max-width: 900px;' : 'max-width: 1000px;'"
        >
          <div style="width: 100%">
            <slot />
          </div>
        </div>
</BModal>
 
</template>


<script ts>
export default {
  name: 'MyFullDialog',
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    hideHeader: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: '1000px',
    },
  },
  data(props) {
    return {
      isOpen: props.dialog,
    };
  },
};
</script>

<style>
.modal-body {
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 50%; Adjust the width as per your requirements */
  max-height: 90vh; /* Optionally, set a max-height if needed */
}
.modal-body .el-input {
  width: 500px;
  height: 50px;
}
</style>
