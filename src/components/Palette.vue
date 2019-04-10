<template>
  <div class="palette pdg-">
    <div class="flex align-items-center mrgb-">
      <h2 class="palette__title mrgv0">{{ palette.name }}</h2>
      <ul v-if="mode === 'edit'" class="palette__options list-inline">
        <li>
          <div class="flex align-items-center">
            <div class="mrgr--">Hue</div>
            <Slider
              v-model.number="palette.h"
              :min="0"
              :max="360"
              class="slider--hue"
            />
          </div>
        </li>
        <li>
          <div class="flex align-items-center">
            <div class="mrgr--">Saturation</div>
            <Slider v-model.number="palette.s" :min="0" :max="100" />
          </div>
        </li>
      </ul>
      <button
        v-if="mode === 'edit'"
        type="button"
        class="btn btn--secondary btn--bare"
        @click="$emit('remove')"
      >
        <Icon id="bin" :scale="0.75" class="mrgr--" />
        Remove palette
      </button>
    </div>
    <ColorsList :palette.sync="palette" :mode="mode" />
  </div>
</template>

<script>
import ColorsList from '@/components/ColorsList';
import Slider from '@/components/Slider';

export default {
  components: {
    ColorsList,
    Slider,
  },

  props: {
    palette: {
      type: Object,
      required: true,
    },
    mode: {
      type: String,
      required: true,
    },
  },

  watch: {
    'palette.s'() {
      this.palette.colors = this.palette.colors.map(color => {
        color.s = this.palette.s;
        return color;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.palette {
  background-color: white;
  border-radius: $border-radius-default;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.palette__title {
  text-transform: capitalize;
}

.palette__options {
  margin-left: auto;
  margin-right: auto;
}
</style>
