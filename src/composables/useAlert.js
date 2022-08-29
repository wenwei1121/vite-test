import Swal from 'sweetalert2'

export const comfirmSwal = async (title, icon) => {

    const res = await Swal.fire({
        title: title,
        icon: icon,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    })

    return res.isConfirmed
}

export const resultSwal = (msg, icon) => {

    Swal.fire({
        title: msg,
        icon: icon,
        showConfirmButton: false,
        timer: 1500
    })

}