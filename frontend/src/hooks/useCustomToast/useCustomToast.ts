import { useToast } from "@chakra-ui/react";

type useCustomToastType = {
  title?: string | undefined;
  status?: "info" | "warning" | "success" | "error" | "loading" | undefined;
};

function useCustomToast() {
  const toast = useToast();

  return (props: useCustomToastType) => {
    toast({
      title: props?.title,
      duration: 5000,
      status: props?.status,
      position: "top",
      isClosable: true,
    });
  };
}

export default useCustomToast;
