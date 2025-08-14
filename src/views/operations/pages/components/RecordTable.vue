<script setup>
import { cn } from "@/lib/utils";

import Button from "@/components/ui/Button.vue";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableEmpty,
} from "@/components/ui/table";

import { OPERATION_TYPES_LABELS } from "@/views/operations/lib/utils";

const props = defineProps({
  headers: { type: Array, required: true },
  rows: { type: Array, required: true },
  isLoading: { type: Boolean, default: false },
  page: { type: Number, default: 0 },
  size: { type: Number, default: 10 },
  totalPages: { type: Number, default: 0 },
  class: { type: null, required: false },
});

const emit = defineEmits(["delete", "update:page", "update:size"]);

const handlePrev = () => emit("update:page", Math.max(props.page - 1, 0));
const handleNext = () =>
  emit("update:page", Math.min(props.page + 1, Math.max(props.totalPages, 1) - 1));

const getRowClass = (index) => {
  let classNames = "text-center";
  if (index % 2 === 0) classNames += " bg-off-white";
  else classNames += " bg-gradient-to-l from-blue-light/15 to-blue-medium/15";

  return classNames;
};
</script>

<template>
  <div
    :class="
      cn(
        'bg-white rounded-2xl border border-black/[0.06] p-0 overflow-hidden shadow-sm',
        props.class
      )
    "
  >
    <Table :container-class="'max-h-[39.5rem]'">
      <TableHeader class="sticky top-0">
        <TableRow class="bg-gradient-to-l from-gradient-blue-left to-gradient-blue-right">
          <TableHead
            v-for="header in headers"
            :key="header"
            class="text-center text-gray-medium"
          >
            {{ header }}
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow v-for="(r, index) in rows" :key="r.id" :class="getRowClass(index)">
          <TableCell class="text-black">{{
            OPERATION_TYPES_LABELS[r.operationType]
          }}</TableCell>

          <TableCell class="text-black">{{ r.amount }}</TableCell>

          <TableCell class="text-black">{{ r.userBalance }}</TableCell>

          <TableCell class="truncate max-w-xs text-black/80">
            {{ r.operationResponse }}
          </TableCell>

          <TableCell class="text-black/80">
            {{ new Date(r.createdAt).toLocaleString() }}
          </TableCell>

          <TableCell class="text-right">
            <Button variant="destructive" class="h-9 px-4" @click="() => emit('delete', r.id)">
              Delete
            </Button>
          </TableCell>
        </TableRow>

        <TableEmpty :colspan="6" v-if="!isLoading && rows.length === 0">
          No records found
        </TableEmpty>
      </TableBody>
    </Table>

    <footer
      class="flex items-center justify-between py-4 px-4 border-t border-black/[0.06] bg-white/60"
    >
      <div class="flex items-center gap-2 text-sm text-black/60">
        <span>Rows per page</span>
        <select
          class="border border-black/10 rounded-full px-3 py-1.5 bg-white text-sm"
          :value="size"
          @change="$emit('update:size', parseInt($event.target.value))"
        >
          <option :value="10">10</option>
          <option :value="20">20</option>
          <option :value="50">50</option>
        </select>
      </div>
      <div class="flex items-center gap-2">
        <Button variant="primary" class="h-9 px-4" :disabled="page === 0" @click="handlePrev">
          Prev
        </Button>
        <span class="text-sm text-black/60">
          Page {{ page + 1 }} of {{ totalPages || 1 }}
        </span>
        <Button
          variant="primary"
          class="h-9 px-4"
          :disabled="page + 1 >= (totalPages || 1)"
          @click="handleNext"
        >
          Next
        </Button>
      </div>
    </footer>
  </div>
</template>
