// OnStart
document.addEventListener(`DOMContentLoaded`, async () => {
   // Todo : 
   // 1. Shows Data of 'inbox' from Supabase
});

// OnTap Send Invoice
const buttonInvoice = document.getElementById(`button-invoice`);
buttonInvoice.addEventListener(`click`, async () => {
   const inputEmail = document.getElementById(`email`).value
   const inputFullname = document.getElementById(`fullName`).value
   const inputCustomerId = document.getElementById(`customerId`).value
   const inputPaymentMethod = document.getElementById(`paymentMethod`).value
   const inputService = document.getElementById(`serviceName`).value
   const inputPaymentAmount = document.getElementById(`amount`).value
   const inputInvoiceDetail = document.getElementById(`formFile`).files[0]
   const inputNotes = document.getElementById(`notes`).value

   if (
      !inputEmail || !inputFullname ||
      !inputCustomerId || !inputPaymentMethod ||
      !inputService || !inputPaymentAmount ||
      !inputInvoiceDetail || !inputNotes
   ) {
      return showError(`Fill the Blanks!`)
   }

   const formData = new FormData()
   formData.append(`email`, inputEmail)
   formData.append(`fullName`, inputFullname)
   formData.append(`customerId`, inputCustomerId)
   formData.append(`paymentMethod`, inputPaymentMethod)
   formData.append(`serviceName`, inputService)
   formData.append(`amount`, inputPaymentAmount)
   formData.append(`file`, inputInvoiceDetail)
   formData.append(`notes`, inputNotes)

   setLoading(true)
   const response = await fetch(`/service/send-invoice`, {
      method: `POST`,
      body: formData
   })

   if(!response.ok) {
      setLoading(false)
      const errorMessage = await response.text()
      return showError(errorMessage)
   }
   
   setLoading(false)
   await location.reload()
});

// Additional Functions ========================================================================

function showError(message) {
   const errorBoxMessage = document.getElementById(`alert-wrapper`);
   errorBoxMessage.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
           ${message}
           <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
       </div>
   `;
}

function setLoading(isLoading) {
   const btnsForm = document.getElementById(`wrapper-buttons`)
   const loading = document.getElementById(`loading-modal`);

   if (isLoading) {
      btnsForm.style.display = "none";
      loading.style.display = "block";
   } else {
      btnsForm.style.display = "block";
      loading.style.display = "none";
   }
}