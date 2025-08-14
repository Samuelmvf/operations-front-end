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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Button from "@/components/ui/Button.vue";
</script>

<template>
  <div class="p-8 space-y-4">
    <h2 class="text-xl font-bold">Alert Dialog Examples</h2>

    <!-- Example 1: Confirmation Dialog -->
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="destructive">Delete Item</Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogDescription>
          Are you sure you want to delete this item? This action cannot be undone.
        </AlertDialogDescription>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    <!-- Example 2: Success Dialog -->
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="confirm">Save Changes</Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Success!</AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogDescription>
          Your changes have been saved successfully.
        </AlertDialogDescription>

        <AlertDialogFooter>
          <AlertDialogAction variant="confirm">OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>
