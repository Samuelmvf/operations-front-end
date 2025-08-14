<script setup>
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const model = defineModel({ type: [String, Number], required: true });

const props = defineProps({
  placeholder: { type: String, required: false },
  options: { type: Array, required: true },
});
</script>

<template>
  <Select v-model="model">
    <SelectTrigger class="w-full">
      <SelectValue :placeholder="props.placeholder" />
    </SelectTrigger>

    <SelectContent>
      <SelectItem v-for="option in options" :key="option" :value="String(option)">
        {{ option }}
      </SelectItem>
    </SelectContent>
  </Select>
</template>
