import { inject } from "vue";

export function useModalConfirmation() {
  const confirm = inject("modalConfirmation");

  if (!confirm) {
    console.warn(
      "Modal confirmation not available. Make sure ModalConfirmation is properly set up in App.vue"
    );
    return {
      actionConfirmation: async () => {
        console.error("Modal confirmation not available");
        return false;
      },
    };
  }

  return {
    actionConfirmation: confirm,
  };
}
