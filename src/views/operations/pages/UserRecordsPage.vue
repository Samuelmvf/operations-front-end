<script setup>
import { ref, watch, onMounted, useTemplateRef, reactive, computed } from "vue";

import { toast } from "vue-sonner";

import { recordsRepository } from "@/repositories";

import Input from "@/components/ui/Input.vue";
import Button from "@/components/ui/Button.vue";
import SearchSvg from "@/components/ui/svg/SearchSvg.vue";

import ModalNewOperation from "./components/ModalNewOperation.vue";
import RecordTable from "./components/RecordTable.vue";
import { useModalConfirmation } from "@/composables/useModalConfirmation";

const headers = ["Operation", "Amount", "Balance", "Response", "Date", ""];

const isLoading = ref(false);

const pageableData = reactive({
  data: [],
  search: "",
  page: 0,
  size: 10,
  sort: ["createdAt,desc"],
  totalElements: 0,
  totalPages: 0,
});

const pageableDataChangeListener = computed(() => {
  return [pageableData.page, pageableData.size, pageableData.sort];
});

const { actionConfirmation } = useModalConfirmation();
const modalNewOperationRef = useTemplateRef("modal-new-operation");

const handleOpenNewOperationModal = async () => {
  const callback = await modalNewOperationRef.value.openDialog();

  if (callback) {
    fetchRecords();
  }
};

const fetchRecords = async () => {
  isLoading.value = true;

  const { data, error } = await recordsRepository.getUserRecords({
    search: pageableData.search || undefined,
    page: pageableData.page,
    size: pageableData.size,
    sort: pageableData.sort,
  });

  if (error) {
    toast.error(error || "Failed to load records");
    isLoading.value = false;
    return;
  }

  if (data?.content?.length) {
    pageableData.data = data.content;
    pageableData.totalElements = data.page.totalElements;
    pageableData.totalPages = data.page.totalPages;
  } else {
    pageableData.data = [];
    pageableData.totalElements = 0;
    pageableData.totalPages = 0;
  }

  isLoading.value = false;
};

const handleDelete = async (id) => {
  const callback = await actionConfirmation();
  if (!callback) return;

  const { error } = await recordsRepository.deleteRecord(id);

  if (error) {
    toast.error(error);
  } else {
    if (pageableData.data.length === 1 && pageableData.page > 0) {
      pageableData.page--;
    }

    toast.success("Record deleted successfully");
    fetchRecords();
  }
};

watch(pageableDataChangeListener, fetchRecords);
onMounted(fetchRecords);
</script>

<template>
  <section class="space-y-6 grid grid-rows-[auto_1fr]">
    <ModalNewOperation ref="modal-new-operation" />

    <header class="flex items-center justify-between">
      <h1 class="text-3xl hidden sm:block font-semibold tracking-tight text-black">Records</h1>
      <div class="flex items-center gap-3">
        <div class="relative">
          <Input
            class="pl-10 pr-3 h-10 rounded-full bg-black/[0.03] focus:border-black/20 focus:ring-0"
            placeholder="Search records"
            v-model="pageableData.search"
            @keyup.enter="fetchRecords"
          />

          <SearchSvg />
        </div>

        <Button variant="primary" class="h-10" @click="fetchRecords">Search</Button>

        <Button variant="confirm" class="h-10" @click="handleOpenNewOperationModal">
          New Operation
        </Button>
      </div>
    </header>

    <RecordTable
      :headers="headers"
      :rows="pageableData.data"
      :is-loading="isLoading"
      :page="pageableData.page"
      :size="pageableData.size"
      :total-pages="pageableData.totalPages"
      @delete="handleDelete"
      @update:page="(v) => (pageableData.page = v)"
      @update:size="(v) => (pageableData.size = v)"
    />
  </section>
</template>
