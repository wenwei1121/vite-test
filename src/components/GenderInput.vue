<script setup>
    import { reactive } from 'vue';

    defineProps(["genderValue"])
    defineEmits(["update:genderValue"])
    
    // table user gender input
    const genderInfo = reactive([
        {
            genderText: "female",
            genderValue: 0
        },
        {
            genderText: "male",
            genderValue: 1
        }
    ])
  
  </script>
  
  <template>
    <div class="field">
        <div class="control">
            <label
                class="radio mr-2 is-size-5"
                v-for="genderItem of genderInfo"
                :key="genderItem.genderText"
            >
                <input
                    class="mr-1"
                    type="radio"
                    :value="genderItem.genderValue"
                    v-model="genderValue"
                    @input="$emit('update:genderValue', $event.target.value * 1)"
                >{{ genderItem.genderText }}
            </label>
        </div>
    </div>
  </template>
  
  <style></style>