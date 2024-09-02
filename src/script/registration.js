// document.addEventListener("DOMContentLoaded", () => {
//     const form = document.querySelector("form");

//     const uploadError = document.getElementById("uploadError");
//     const identification = document.getElementById("identification");
//     const identificationError = document.getElementById("identificationError");

//     if (identification) {
//         identification.addEventListener("change", () => {
//             if (identification.value === "") {
//                 identificationError?.classList.remove("hidden");
//             } else {
//                 identificationError?.classList.add("hidden");
//             }
//         });
//     }

//     form?.addEventListener("submit", async (event) => {
//         event.preventDefault();

//         const requiredFields = ["fullName", "phoneNumber", "email", "birthDate", "address", "occupation"];
//         let allFieldsFilled = true;

//         requiredFields.forEach((fieldId) => {
//             const field = document.getElementById(fieldId);
//             if (field && !field.value.trim()) {
//                 field.classList.add("border-red-500");
//                 allFieldsFilled = false;
//             } else if (field) {
//                 field.classList.remove("border-red-500");
//             }
//         });

//         if (!allFieldsFilled) {
//             alert("Please fill in all required fields.");
//             return;
//         }

//         // const profileUpload = document.getElementById("profileUpload");
//         // if (profileUpload && profileUpload.value === "") {
//         //     uploadError?.classList.remove("hidden");
//         //     return;
//         // }

//         const formData = new FormData(form);

//         // Adding additional data manually
//         formData.append('gender', document.getElementById('gender')?.value || '');
//         formData.append('guardianPhoneNumber', document.getElementById('guardianPhoneNumber')?.value || '');
//         formData.append('guardianName', document.getElementById('guardianName')?.value || '');
//         formData.append('medicalInfo[height]', document.getElementById('height')?.value || '');
//         formData.append('medicalInfo[weight]', document.getElementById('weight')?.value || '');
//         formData.append('medicalInfo[bloodType]', document.getElementById('bloodType')?.value || '');
//         formData.append('medicalInfo[allergies]', document.getElementById('allergies')?.value || '');
//         formData.append('medicalInfo[existingConditions]', document.getElementById('existingConditions')?.value || '');
//         formData.append('identification[idNumber]', document.getElementById('idNumber')?.value || '');
//         formData.append('consent[healthCondition]', document.getElementById('consentHealth')?.checked || false);
//         formData.append('consent[dataUsage]', document.getElementById('consentData')?.checked || false);
//         formData.append('consent[privacyAgreement]', document.getElementById('consentPrivacy')?.checked || false);

//         // uploadError?.classList.add("hidden");

//         try {
//             const response = await axios.post('https://healthcare-backend-tdsu.onrender.com/api/auth/signup', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });


//             if (response.status === 200) {
//                 alert('Signup successful!');
//                 window.location.href = '../application.html';
//             } else {
//                 alert(`Error: ${response.data.error || 'An error occurred during signup.'}`);
//             }
//         } catch (error) {
//             console.error('Error during form submission:', error);
//             alert('An error occurred during signup. Please try again.');
//         }
//     });
// });










document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    // Error elements
    const identificationError = document.getElementById("identificationError");

    // Add event listener to identification dropdown
    const identification = document.getElementById("identification");
    if (identification) {
        identification.addEventListener("change", () => {
            if (identification.value === "") {
                identificationError?.classList.remove("hidden");
            } else {
                identificationError?.classList.add("hidden");
            }
        });
    }

    form?.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Required fields
        const requiredFields = ["fullName", "phoneNumber", "email", "birthDate", "address", "occupation"];
        let allFieldsFilled = true;

        // Validate required fields
        requiredFields.forEach((fieldId) => {
            const field = document.getElementById(fieldId);
            if (field && !field.value.trim()) {
                field.classList.add("border-red-500");
                allFieldsFilled = false;
            } else if (field) {
                field.classList.remove("border-red-500");
            }
        });

        if (!allFieldsFilled) {
            alert("Please fill in all required fields.");
            return;
        }

        // Collect form data
        const formData = new FormData();
        formData.append("fullName", document.getElementById("fullName").value);
        formData.append("phoneNumber", document.getElementById("phoneNumber").value);
        formData.append("email", document.getElementById("email").value);
        formData.append("birthDate", document.getElementById("birthDate").value);
        formData.append("sex", document.querySelector('input[name="sex"]:checked').value);
        formData.append("address", document.getElementById("address").value);
        formData.append("occupation", document.getElementById("occupation").value);
        formData.append("emergencyContact", document.getElementById("emergencyContact").value);
        formData.append("emergencyPhone", document.getElementById("emergencyPhone").value);
        formData.append("insuranceProvider", document.getElementById("insuranceprovider").value);
        formData.append("insurancePolicy", document.getElementById("insurancepolicy").value);
        formData.append("allergies", document.getElementById("allergies").value);
        formData.append("currentMedications", document.getElementById("currentmedications").value);
        formData.append("medicalHistory", document.getElementById("medicalhistory").value);
        formData.append("pastMedicalHistory", document.getElementById("pastmedicalhistory").value);
        formData.append("identification", identification.value);
        formData.append("additionalInfo", document.getElementById("additionalInfo").value);

        // Terms and conditions validation
        const termsAccepted = document.querySelectorAll('input[type="checkbox"]:checked').length === 3;
        if (!termsAccepted) {
            alert("You must accept all terms and conditions.");
            return;
        }

        try {
            const response = await fetch('https://healthcare-backend-tdsu.onrender.com/api/auth/signup', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert("Form submitted successfully!");
                // Redirect or take other actions as needed
                window.location.href = '../application.html';
            } else {
                alert("Failed to submit the form.");
            }
        } catch (error) {
            console.error("Error submitting the form:", error);
            alert("An error occurred while submitting the form.");
        }
    });
});
