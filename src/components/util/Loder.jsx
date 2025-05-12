import { Spinner } from "flowbite-react";

export function Loder() {
  return (
    <div className="flex justify-center items-center fixed inset-0  z-50">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-65 "></div>
      <Spinner aria-label="Loading..." size="xl" />
    </div>
  );
}
