import Swal from "sweetalert2"

export const useComfirmSwal = async (options = {}) => {
  const {
    title = "sure to save?",
    icon = "warning",
    showCancelButton = true,
    confirmButtonText = "Yes",
  } = options

  const res = await Swal.fire({
    title,
    icon,
    showCancelButton,
    confirmButtonText,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
  })

  return res.isConfirmed
}

export const useResultSwal = (options = {}) => {
  const {
    title = "save success!",
    icon = "success",
    showConfirmButton = false,
    timer = 1500,
  } = options

  Swal.fire({
    title,
    icon,
    showConfirmButton,
    timer,
  })
}
