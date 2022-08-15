import { ref } from 'vue'
import Swal from 'sweetalert2'

export const comfirmSwal = async (title, icon) => {
    // const comfirmResult = ref(false)

    const res = await Swal.fire({
        title: title,
        icon: icon,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    })

    // comfirmResult.value = res.isConfirmed
    return res.isConfirmed
}