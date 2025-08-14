<script setup>
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { ref, reactive } from "vue";

const DEFAULT = {
  TITLE: "Are you absolutely sure?",
  DESCRIPTION: "This action will be performed immediately.",
  ACTION_BUTTONS: [
    {
      label: "Confirm",
      value: true,
    },
  ],
};

const isOpen = ref(false);
const callback = ref(null);

const data = reactive({
  title: "",
  description: "",
  actionButtons: [],
  component: null,
});

const openModal = ({
  title = DEFAULT.TITLE,
  description = DEFAULT.DESCRIPTION,
  actionButtons = DEFAULT.ACTION_BUTTONS,
  component = null,
} = {}) => {
  resetModalData();

  isOpen.value = true;

  data.title = title;
  data.description = description;
  data.actionButtons = actionButtons;
  data.component = component || null;

  return new Promise((resolve) => {
    callback.value = resolve;
  });
};

const closeModal = () => {
  isOpen.value = false;
};

const resetModalData = function () {
  data.title = DEFAULT.TITLE;
  data.description = DEFAULT.DESCRIPTION;
  data.actionButtons = [];
  data.component = null;
  callback.value = null;
};

const handlePerformAction = (value) => {
  callback.value(value);
  closeModal();
};

const handleCancel = () => {
  callback.value(false);
  closeModal();
};

defineExpose({
  openModal,
});
</script>

<template>
  <component
    v-if="data.component"
    :is="data.component"
    :open="isOpen"
    @action="handlePerformAction"
    @cancel="handleCancel"
  />

  <AlertDialog v-else :open="isOpen">
    <AlertDialogContent class="w-[31.25rem]">
      <AlertDialogHeader>
        <AlertDialogTitle>{{ data.title }}</AlertDialogTitle>
      </AlertDialogHeader>

      <AlertDialogDescription>
        {{ data.description }}
      </AlertDialogDescription>

      <AlertDialogFooter>
        <template v-if="data.actionButtons.length > 0">
          <AlertDialogAction
            v-for="(button, index) in data.actionButtons"
            :key="button.label + index"
            :variant="button.variant"
            @click="handlePerformAction(button.value)"
          >
            {{ button.label }}
          </AlertDialogAction>
        </template>

        <AlertDialogCancel @click="handleCancel">Cancel</AlertDialogCancel>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
