<script setup>
import { ref, computed, nextTick } from "vue";
import { toast } from "vue-sonner";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

import { VisuallyHidden } from "reka-ui";

import { operationsRepository } from "@/repositories";

import Input from "@/components/ui/Input.vue";
import Button from "@/components/ui/Button.vue";
import Select from "@/components/ui/select/Select.vue";
import SelectTrigger from "@/components/ui/select/SelectTrigger.vue";
import SelectContent from "@/components/ui/select/SelectContent.vue";
import SelectItem from "@/components/ui/select/SelectItem.vue";
import SelectValue from "@/components/ui/select/SelectValue.vue";
import { OPERATION_TYPES, OPERATION_TYPES_LABELS } from "@/views/operations/lib/utils";

const operationType = ref(OPERATION_TYPES.ADDITION);
const operand1 = ref("0");
const operand2 = ref("0");
const length = ref("8");

const isLoading = ref(false);
const isOpen = ref(false);

const callback = ref(null);

const needsTwoOperands = computed(() => {
  return [
    OPERATION_TYPES.ADDITION,
    OPERATION_TYPES.SUBTRACTION,
    OPERATION_TYPES.MULTIPLICATION,
    OPERATION_TYPES.DIVISION,
  ].includes(operationType.value);
});

const openDialog = (cb) => {
  clearForm();

  isOpen.value = true;
  return new Promise((resolve) => (callback.value = resolve));
};

const closeDialog = async (data) => {
  isOpen.value = false;
  callback.value(data);
};

const handleSubmit = async () => {
  isLoading.value = true;
  try {
    const payload = getOperationPayload();
    if (!payload) return;

    const { data, error } = await fetchOperationMethod(operationType.value, payload);

    if (error) {
      toast.error(error || "Operation failed");
      return;
    }

    toast.success(
      `Result: ${data.result} | Cost: ${data.cost} | Balance: ${data.remainingBalance}`
    );
    closeDialog(data);
  } finally {
    isLoading.value = false;
  }
};

function clearForm() {
  operationType.value = OPERATION_TYPES.ADDITION;
  operand1.value = "0";
  operand2.value = "0";
  length.value = "8";
}

function getOperationPayload() {
  let payload = null;

  if (operationType.value === OPERATION_TYPES.RANDOM_STRING) {
    const len = parseInt(length.value, 10);
    if (Number.isNaN(len) || len < 1) {
      toast.error("Length must be a positive integer");
      return;
    }
    payload = { length: len };
  } else if (operationType.value === OPERATION_TYPES.SQUARE_ROOT) {
    const op1 = parseFloat(operand1.value);
    if (Number.isNaN(op1)) {
      toast.error("Operand must be a valid number");
      return;
    }
    payload = { operand1: op1 };
  } else {
    const op1 = parseFloat(operand1.value);
    const op2 = parseFloat(operand2.value);
    if (Number.isNaN(op1) || Number.isNaN(op2)) {
      toast.error("Both operands must be valid numbers");
      return;
    }
    payload = { operand1: op1, operand2: op2 };
  }

  return payload;
}

function fetchOperationMethod(operationType, payload) {
  switch (operationType) {
    case OPERATION_TYPES.ADDITION:
      return operationsRepository.addition(payload);
    case OPERATION_TYPES.SUBTRACTION:
      return operationsRepository.subtraction(payload);
    case OPERATION_TYPES.MULTIPLICATION:
      return operationsRepository.multiplication(payload);
    case OPERATION_TYPES.DIVISION:
      return operationsRepository.division(payload);
    case OPERATION_TYPES.SQUARE_ROOT:
      return operationsRepository.squareRoot(payload);
    case OPERATION_TYPES.RANDOM_STRING:
      return operationsRepository.randomString(payload);
  }
}

defineExpose({
  openDialog,
});
</script>

<template>
  <Dialog :open="isOpen" aria-describedby="Operation Summary">
    <DialogContent class="w-[28rem] min-h-[20rem] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>New Operation</DialogTitle>

        <VisuallyHidden asChild>
          <DialogDescription> New Operation Dialog </DialogDescription>
        </VisuallyHidden>

        <DialogClose asChild>
          <Button variant="ghost" class="text-white" @click="closeDialog">
            <img
              src="@/assets/icons/close.svg"
              alt="close"
              class="w-[1.125rem] h-[1.125rem]"
            />
          </Button>
        </DialogClose>
      </DialogHeader>

      <form @submit.prevent="handleSubmit" class="contents">
        <section aria-label="Operation form" class="px-6 py-4 flex flex-col gap-4 text-black">
          <div class="space-y-4">
            <div class="space-y-2">
              <label class="text-sm font-medium">Operation Type</label>
              <Select v-model="operationType">
                <SelectTrigger>
                  <SelectValue placeholder="Select operation" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem
                    v-for="value in Object.values(OPERATION_TYPES)"
                    :key="value"
                    :value="value"
                  >
                    {{ OPERATION_TYPES_LABELS[value] }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div v-if="needsTwoOperands" class="space-y-3">
              <div class="space-y-2">
                <label class="text-sm font-medium">First Number</label>
                <Input type="number" v-model="operand1" placeholder="Enter first number" />
              </div>
              <div class="space-y-2">
                <label class="text-sm font-medium">Second Number</label>
                <Input type="number" v-model="operand2" placeholder="Enter second number" />
              </div>
            </div>

            <div v-else-if="operationType === OPERATION_TYPES.SQUARE_ROOT" class="space-y-2">
              <label class="text-sm font-medium">Number</label>
              <Input type="number" v-model="operand1" placeholder="Enter number" />
            </div>

            <div v-else-if="operationType === OPERATION_TYPES.RANDOM_STRING" class="space-y-2">
              <label class="text-sm font-medium">String Length</label>
              <Input type="number" min="1" v-model="length" placeholder="Enter length" />
            </div>
          </div>
        </section>

        <DialogFooter class="px-6 pb-6">
          <Button
            type="submit"
            aria-label="Run Operation"
            class="h-10 w-full text-sm font-medium"
            variant="confirm"
            :disabled="isLoading"
          >
            <span v-if="!isLoading">Run Operation</span>
            <span v-else>Running...</span>
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
