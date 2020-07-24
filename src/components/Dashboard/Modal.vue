<template>
  <div>
    <modal
      name="example"
      @before-open="beforeOpen"
      :adaptive="true"
      :shiftY="0.2"
      height="auto"
      :width="500"
      :max-width="maxWidth"
      >Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore perferendis voluptates optio
      hic unde dolore maxime. Placeat corporis nemo dicta officiis deserunt voluptatibus dolorum
      nostrum, pariatur error quos nam sit quia, veritatis est, perferendis cupiditate autem
      repellendus sapiente! Eos facere blanditiis placeat sunt natus unde non sint architecto dicta
      fuga.</modal
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      maxWidth: 0,
    };
  },
  methods: {
    beforeOpen() {
      this.maxWidth = window.innerWidth - 30;
    },
  },
};
</script>
